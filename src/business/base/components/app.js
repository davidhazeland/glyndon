import 'semantic-ui-css/semantic.min.css'
require('styles/index.css')

import React from 'react'
import { Route } from 'react-router'

import Header from '../containers/header'
import { Container } from 'semantic-ui-react'

import {component as Authentication} from 'business/authentication'
import {component as Welcome} from 'business/welcome'
import {component as Analytics} from 'business/analytics'
import {component as Report} from 'business/report'
import {component as StoreList} from 'business/store-list'

import restricted from '../containers/restricted'

const App = (props) => {
  return (
    <div className="App">
      <Header path={props.path}/>
      <Container style={{marginTop: 25}}>
        <Route path="/authentication" component={Authentication}/>

        <Route path="/" exact component={restricted(Welcome)}/>
        <Route path="/analytics/:storeId" component={restricted(Analytics)}/>
        <Route path="/report/:storeId" component={restricted(Report)}/>
        <Route exact path="/stores" component={restricted(StoreList)}/>
      </Container>
    </div>
  )
}

App.propTypes = {}

export default App
