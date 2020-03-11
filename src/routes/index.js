import React from 'react'
import {
  DashboardOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  EditOutlined
} from '@ant-design/icons'
import {
  Login,
  ArticleList,
  ArticleEdit,
  Dashboard,
  Settings,
  NotFound
} from '../views'
export const mainRouter = [
  {
    pathname: '/login',
    component: Login
  },
  {
    pathname: '/404',
    component: NotFound
  }
]
export const adminRouter = [
  {
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    icon: <DashboardOutlined />,
    isNav: true
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章列表',
    isNav: true,
    icon: <UnorderedListOutlined />,
    exact: true
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑',
    icon: <EditOutlined />
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon: <SettingOutlined />,
    isNav: true
  }
]
