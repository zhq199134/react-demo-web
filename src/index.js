import React from "react";
import { render } from "react-dom";
import App from "./App";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import "./index.less";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { mainRouter } from "./routes";
render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route
          path="/admin"
          render={routerProps => {
            //TODO:权限认证 需要登录才能访问admin
            return <App {...routerProps}></App>;
          }}
        ></Route>
        {mainRouter.map(route => {
          return (
            <Route
              key={route.pathname}
              path={route.pathname}
              component={route.component}
            ></Route>
          );
        })}
        <Redirect to="/admin" from="/" exact></Redirect>
        <Redirect to="/404"></Redirect>
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById("root")
);
