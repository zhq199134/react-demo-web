import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { adminRouter } from './routes'
import { Frame } from './components'
const menus = adminRouter.filter(s => s.isNav === true)
//定义高阶组件
// const testHOC = Wappedcomponent => {
//   return class HOCComponent extends Component {
//     render() {
//       return (
//         <Fragment>
//           <Wappedcomponent />
//           <div>这是高阶组件里的信息</div>
//         </Fragment>
//       );
//     }
//   };
// };
// @testHOC
@connect(state => ({
  isLogin: state.user.isLogin,
  role: state.user.role
}))
class App extends Component {
  render() {
    return this.props.isLogin ? (
      <Frame menus={menus}>
        <Switch>
          {adminRouter.map(route => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                exact={route.exact}
                render={routeProps => {
                  const hasPermission = route.roles.includes(this.props.role)
               
                  return hasPermission? <route.component {...routeProps} />:<Redirect to="/admin/noauth"/>
                }}
              />
            )
          })}
          <Redirect to={adminRouter[0].pathname} from="/admin" exact />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    ) : (
      <Redirect to="/login" />
    )
  }
}

export default App
