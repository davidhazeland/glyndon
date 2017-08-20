require('styles/index.css')

import React from 'react'
import { Route } from 'react-router'

import Header from '../containers/header'
import { Container } from 'semantic-ui-react'

import {component as Welcome} from '../../welcome'

const App = (props) => {
  return (
    <div className="App">
      <Header path={props.path}/>
      <Container>
        <Route path="/" component={Welcome}/>
      </Container>
    </div>
  )
}

App.propTypes = {}

export default App
