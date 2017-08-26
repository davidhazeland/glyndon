import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import {actions as myActions} from '..'
import {actions as notificationActions, selectors as notifSelectors} from 'raket-react/business/notification'

import AuthenticationComponent from '../components/authentication'

class Authentication extends Component {
  componentWillUnmount() {
    this.props.actions.clear()
    this.props.actions.clearNotification()
  }

  render() {
    const title = 'Authentication'
    return (
    <DocumentTitle title={title}>
      <AuthenticationComponent {...this.props}/>
    </DocumentTitle>
    )
  }
}

Authentication.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    Notification: notifSelectors.get(state)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = {
    ...myActions,
    clearNotification: notificationActions.clear
  }
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
