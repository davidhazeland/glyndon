import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import { actions as myActions, selectors as mySelectors } from 'business/store-edit'
import {actions as itemActions} from 'raket-react/business/item'
import {actions as initialActions, selectors as initialSelectors} from 'raket-react/business/initial'

import StoreEditComponent from '../components/store-edit'

class StoreEdit extends Component {
  componentWillMount() {
    this.props.actions.initialize({
      id: this.props.id
    })
  }

  componentWillUnmount() {
    this.props.actions.clear()
    this.props.actions.clearItem()
    this.props.actions.clearInitial()
  }

  render() {
    const title = 'Store Edit'
    return (
      <DocumentTitle title={title}>
        <StoreEditComponent {...this.props}/>
      </DocumentTitle>
    )
  }
}

StoreEdit.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {id} = ownProps.match.params
  return {
    id,
    Initial: initialSelectors.get({
      roleList: []
    })(state),
    ...mySelectors.get(state)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = {
    clearInitial: initialActions.clear,
    clearItem: itemActions.clear,
    ...myActions
  }
  return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(StoreEdit)
