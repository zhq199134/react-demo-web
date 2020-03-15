import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { mainRouter } from './routes'

import { ConfigProvider } from 'antd'
import App from './App'

import zhCN from 'antd/es/locale/zh_CN'

import './index.less'
render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route
            path="/admin"
            //   render={routerProps => {
            //     //TODO:权限认证 需要登录才能访问admin
            //     return store.getState().user.isLogin ? (
            //       <App {...routerProps}></App>
            //     ) : (
            //       <Redirect to="/login" />
            //     )
            //   }
            // }
            component={App}
          ></Route>
          {mainRouter.map(route => {
            return (
              <Route
                key={route.pathname}
                path={route.pathname}
                component={route.component}
              ></Route>
            )
          })}
          <Redirect to="/admin" from="/" exact></Redirect>
          <Redirect to="/404"></Redirect>
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
