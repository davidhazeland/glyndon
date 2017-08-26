import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HeaderComponent from '../components/header'

import {actions as logoutActions} from 'business/logout'

class Header extends Component {
  render() {
    return (
      <HeaderComponent {...this.props}/>
    )
  }
}

Header.propTypes = { actions: PropTypes.object.isRequired }
function mapStateToProps(state, ownProps) {
  return {

  }
}
function mapDispatchToProps(dispatch) {
  const actions = {
    logoutRequest: logoutActions.logoutRequest
  }
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
