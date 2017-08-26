import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import { actions as myActions, selectors as mySelectors } from 'business/store-add'

import StoreAddComponent from '../components/store-add'

class StoreAdd extends Component {
  componentWillUnmount() {
    this.props.actions.clear()
  }

  render() {
    const title = 'Store Add'
    return (
      <DocumentTitle title={title}>
        <StoreAddComponent {...this.props}/>
      </DocumentTitle>
    )
  }
}

StoreAdd.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(StoreAdd)
