import React from 'react'

import Order from './analytics-order'
import Profit from './analytics-profit'

const Analytics = (props) => {
  return (
    <div className="Analytics">
      <Order {...props}/>
      <Profit {...props}/>
    </div>
  )
}

Analytics.propTypes = {

}

Analytics.displayName = 'Analytics'

export default Analytics
