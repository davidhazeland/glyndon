import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import { actions as myActions, selectors as mySelectors } from 'business/ad-account-add'

import AdAccountAddComponent from '../components/ad-account-add'

class AdAccountAdd extends Component {
  componentWillUnmount() {
    this.props.actions.clear()
  }

  render() {
    const title = 'AdAccount Add'
    return (
      <DocumentTitle title={title}>
        <AdAccountAddComponent {...this.props}/>
      </DocumentTitle>
    )
  }
}

AdAccountAdd.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    ...mySelectors.get(state)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = {
    ...myActions
  }
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdAccountAdd)
