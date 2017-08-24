import 'semantic-ui-css/semantic.min.css'
require('styles/index.css')

import React from 'react'
import { Route } from 'react-router'

import Header from '../containers/header'
import { Container } from 'semantic-ui-react'

import {component as Welcome} from '../../welcome'
import {component as Analytics} from '../../analytics'
import {component as Report} from '../../report'

const App = (props) => {
  return (
    <div className="App">
      <Header path={props.path}/>
      <Container style={{marginTop: 25}}>
        <Route path="/" exact component={Welcome}/>
        <Route path="/analytics/:storeId" component={Analytics}/>
        <Route path="/report/:storeId" component={Report}/>
      </Container>
    </div>
  )
}

App.propTypes = {}

export default App
