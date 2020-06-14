import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import CreatedPoint from './pages/CreatedPoint'


const Routes = () => {
  return(
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
      <Route component={CreatedPoint} path="/created-point" />

      

     
    </BrowserRouter>
  )
}

export default Routes