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

import moment from 'moment'

import { StoreIdList } from 'constants'

class DayReport extends Component {
  componentWillMount() {
    this.props.actions.fetchRequest({
      query: {
        since: moment().day(-7).format('YYYY-MM-DD'),
        until: moment().format('YYYY-MM-DD')
      },
      params: {
        storeId: StoreIdList[this.props.storeId]
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
