import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import { actions as myActions, selectors as mySelectors } from 'business/store-list'
import { actions as listActions, selectors as listSelectors } from 'raket-react/business/list'
import { actions as initialActions, selectors as initialSelectors } from 'raket-react/business/initial'

import StoreListComponent from '../components/store-list'

class StoreList extends Component {
  componentWillMount() {
    this.props.actions.fetchRequest()
  }

  componentWillUnmount() {
    this.props.actions.clear()
    this.props.actions.clearInitial()
    this.props.actions.clearList()
  }

  render() {
    const title = 'Store List'
    return (
      <DocumentTitle title={title}>
        <StoreListComponent {...this.props}/>
      </DocumentTitle>
    )
  }
}

StoreList.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    List: listSelectors.get(state),
    Initial: initialSelectors.get({
    })(state),
    ...mySelectors.get(state)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = {
    clearList: listActions.clear,
    clearInitial: initialActions.clear,
    ...myActions
  }
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(StoreList)
