import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import { actions as myActions, selectors as mySelectors } from 'business/analytics'

import AnalyticsComponent from '../components/analytics'

class Analytics extends Component {
  componentWillMount() {
    this.props.actions.startRealtimeAnalytics({
      storeId: this.props.storeId
    })
  }

  componentWillUnmount() {
    this.props.actions.clear()
  }

  render() {
    const title = 'Analytics'
    return (
      <DocumentTitle title={title}>
        <AnalyticsComponent {...this.props}/>
      </DocumentTitle>
    )
  }
}

Analytics.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {storeId} = ownProps.match.params

  return {
    storeId,
    ...mySelectors.get(state)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = {
    ...myActions
  }
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
