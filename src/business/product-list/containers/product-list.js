import React, {
  Component,
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DocumentTitle from 'react-document-title'

import { actions as myActions, selectors as mySelectors } from 'business/product-list'
import { actions as listActions, selectors as listSelectors } from 'raket-react/business/list'
import { actions as initialActions, selectors as initialSelectors } from 'raket-react/business/initial'

import ProductListComponent from '../components/product-list'

class ProductList extends Component {
  componentWillMount() {
    this.props.actions.fetchRequest({
      params: {
        storeId: this.props.storeId
      }
    })
  }

  componentWillUnmount() {
    this.props.actions.clear()
    this.props.actions.clearInitial()
    this.props.actions.clearList()
  }

  render() {
    const title = 'Product List'
    return (
      <DocumentTitle title={title}>
        <ProductListComponent {...this.props}/>
      </DocumentTitle>
    )
  }
}

ProductList.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const {storeId} = ownProps.match.params

  return {
    storeId,
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
