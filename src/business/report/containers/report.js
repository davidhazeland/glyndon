import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import { actions as myActions, selectors as mySelectors } from 'business/report'

import ReportComponent from '../components/report'

class Report extends Component {
  componentWillUnmount() {
    this.props.actions.clear()
  }

  render() {
    const title = 'Report'
    return (
      <DocumentTitle title={title}>
        <ReportComponent {...this.props}/>
      </DocumentTitle>
    )
  }
}

Report.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Report)
