import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import {actions as myActions} from '..'
import {actions as notificationActions} from 'raket-react/business/notification'

import WelcomeComponent from '../components/welcome'

class Welcome extends Component {
  componentWillUnmount() {
    this.props.actions.clear()
    this.props.actions.clearNotification()
  }

  render() {
    const title = 'Welcome'
    return (
    <DocumentTitle title={title}>
      <WelcomeComponent {...this.props}/>
    </DocumentTitle>
    )
  }
}

Welcome.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps() {
  return {

  }
}
function mapDispatchToProps(dispatch) {
  const actions = {
    ...myActions,
    clearNotification: notificationActions.clear
  }
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
