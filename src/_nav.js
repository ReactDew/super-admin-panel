import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilChartPie } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // Admin Array
  [
    // {
    //   component: CNavItem,
    //   name: 'Dashboard',
    //   to: '/dashboard',
    //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    //   badge: {
    //     color: 'info',
    //     text: 'NEW',
    //   },
    // },
    {
      component: CNavTitle,
      name: 'Admin Pages',
    },
    {
      component: CNavItem,
      name: 'Companies',
      to: '/companies',
      icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Contract Templates',
      to: '/contract-templates',
      icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Jobs',
      to: '/job-list',
      icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
  ],

  // Company Array
  [
    {
      component: CNavTitle,
      name: 'Company Pages',
    },
    {
      component: CNavItem,
      name: 'Employess',
      to: '/employees-list',
      icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Company settings',
      to: '/company-settings',
      icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Jobs',
      to: '/company-jobs',
      icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
  ],
]

export default _nav
