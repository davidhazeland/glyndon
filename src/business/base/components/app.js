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
import {component as StoreEdit} from 'business/store-edit'
import {component as StoreAdd} from 'business/store-add'

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
        <Route exact path="/stores/:id/edit" component={restricted(StoreEdit)}/>
        <Route exact path="/stores/add" component={restricted(StoreAdd)}/>
      </Container>
    </div>
  )
}

App.propTypes = {}

export default App
