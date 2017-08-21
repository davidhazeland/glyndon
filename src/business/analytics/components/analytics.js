import React from 'react'

import Order from './analytics-order'
import Profit from './analytics-profit'

import { Loader } from 'semantic-ui-react'

const Analytics = (props) => {
  const { pure } = props
  return (
    <div className="Analytics" style={{height: 270, position: 'relative'}}>
      <Loader active={pure}/>

      {!pure &&
        <div>
          <Order {...props}/>
          <Profit {...props}/>
        </div>
      }
    </div>
  )
}

Analytics.propTypes = {

}

Analytics.displayName = 'Analytics'

export default Analytics
