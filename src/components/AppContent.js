import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
// import routes from '../routes'
import { adminRoutes, companyRoutes } from '../routes'
import { useSelector } from 'react-redux'

const AppContent = () => {
  const isAdmin = useSelector((state) => state.user.user.currentUser?.admin)

  const routes = isAdmin ? adminRoutes : companyRoutes

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to={isAdmin ? '/companies' : 'employees-list'} />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
