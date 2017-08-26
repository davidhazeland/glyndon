import 'semantic-ui-css/semantic.min.css'
require('styles/index.css')

import React from 'react'
import { Route } from 'react-router'

import Header from '../containers/header'
import { Container } from 'semantic-ui-react'

import {component as Authentication} from '../../authentication'
import {component as Welcome} from '../../welcome'
import {component as Analytics} from '../../analytics'
import {component as Report} from '../../report'

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
      </Container>
    </div>
  )
}

App.propTypes = {}

export default App
