import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { isAuthorized } from 'services/auth'

export default BaseComponent => {
    class Restricted extends Component {
        componentWillMount() {
            this.checkAuthentication(this.props)
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.location !== this.props.location) {
                this.checkAuthentication(nextProps)
            }
        }
        checkAuthentication(params) {
            const { history } = params
            if (!isAuthorized()) {
              history.replace({ pathname: '/authentication' })
            }
        }
        render() {
            return <BaseComponent {...this.props} />
        }
    }
    return withRouter(Restricted)
}
