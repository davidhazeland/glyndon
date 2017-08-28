import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import {actions as listActions, selectors as listSelectors} from 'raket-react/business/list';
import { actions as myActions, selectors as mySelectors } from 'business/report'

import ReportComponent from '../components/report'

class Report extends Component {
  componentWillMount() {
    this.props.actions.fetchRequest({
      params: {
        storeId: this.props.storeId
      }
    });
  }

  componentWillUnmount() {
    this.props.actions.clear()
    this.props.actions.clearList()
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

function mapStateToProps(state, ownProps) {
  const {storeId} = ownProps.match.params

  return {
    storeId,
    List: listSelectors.get(state),
    ...mySelectors.get(state)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = {
    clearList: listActions.clear,
    ...myActions
  }
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Report)
