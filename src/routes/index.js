import {
  Login,
  ArticleList,
  ArticleEdit,
  Dashboard,
  Settings,
  NotFound
} from "../views";

export const mainRouter = [
  {
    pathname: "/login",
    component: Login
  },
  {
    pathname: "/404",
    component: NotFound
  }
];
export const adminRouter = [
  {
    pathname: "/admin/dashboard",
    component: Dashboard
  },
  {
    pathname: "/admin/settings",
    component: Settings
  },
  {
    pathname: "/admin/artical",
    component: ArticleList,
    exact: true
  },
  {
    pathname: "/admin/artical/edit/:id",
    component: ArticleEdit
  }
];
