import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import {actions as listActions, selectors as listSelectors} from 'raket-react/business/list';
import { actions as myActions, selectors as mySelectors } from 'business/day-report'

import DayReportComponent from '../components/day-report'

class DayReport extends Component {
  componentWillMount() {
    this.props.actions.fetchRequest({
      query: {
        since: '2017-09-01',
        until: '2017-09-10'
      },
      params: {
        storeId: 1
      }
    });
  }

  componentWillUnmount() {
    this.props.actions.clear()
    this.props.actions.clearList()
  }

  render() {
    const title = 'Day Report'
    return (
      <DocumentTitle title={title}>
        <DayReportComponent {...this.props}/>
      </DocumentTitle>
    )
  }
}

DayReport.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DayReport)
