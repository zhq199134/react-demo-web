import Loadable from 'react-loadable'
//这是一个简易的react-loadable的原理
// import Loadable from "./loadable";
import { Loading } from '../components'
//下面是懒加载路由
const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
})
const ArticleList = Loadable({
  loader: () => import('./Article'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/Edit'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loading
})
const Notifications = Loadable({
  loader: () => import('./Notifications'),
  loading: Loading
})
const NoAuth = Loadable({
  loader: () => import('./NoAuth'),
  loading: Loading
})
export {
  ArticleList,
  ArticleEdit,
  Login,
  Dashboard,
  NotFound,
  Settings,
  Notifications,
  NoAuth
}
