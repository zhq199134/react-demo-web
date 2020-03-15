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
  NotFound,
  Notifications,
  NoAuth
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
    isNav: true,
    roles: ['001', '002', '003']
  },
  {
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章列表',
    isNav: true,
    icon: <UnorderedListOutlined />,
    exact: true,
    roles: ['001', '002']
  },
  {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑',
    icon: <EditOutlined />,
    roles: ['001', '002']
  },
  {
    pathname: '/admin/notifications',
    component: Notifications,
    title: '文章编辑',
    icon: <EditOutlined />,
    roles: ['001', '002', '003']
  },
  {
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon: <SettingOutlined />,
    isNav: true,
    roles: ['001']
  },
  {
    pathname: '/admin/noauth',
    component: NoAuth,
    title: '无权限',
    icon: <SettingOutlined />,
    roles: ['001', '002', '003']
  }
]
