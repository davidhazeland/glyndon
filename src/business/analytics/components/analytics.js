import React from 'react'

import Order from './analytics-order'
import Profit from './analytics-profit'

import { Link } from 'react-router-dom'
import { Loader, Button } from 'semantic-ui-react'

const Analytics = (props) => {
  const { storeId, pure } = props
  return (
    <div className="Analytics" style={{height: 270, position: 'relative'}}>
      <Loader active={pure}/>

      {!pure &&
        <div>
          <Link to={`/report/${storeId}`}>
            <Button basic size="mini" style={{marginBottom: 10}}>Report</Button>
          </Link>

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
