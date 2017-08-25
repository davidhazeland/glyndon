import React from 'react'

import Order from './analytics-order'
import Profit from './analytics-profit'

import { Link } from 'react-router-dom'
import { Loader, Button, Dropdown } from 'semantic-ui-react'

const timeOptions = [
  {
    key: 'today',
    value: 'today',
    text: 'Today'
  },
  {
    key: 'yesterday',
    value: 'yesterday',
    text: 'Yesterday'
  }
]

const Analytics = (props) => {
  const {
    storeId,
    pure,

    actions: {
      changeFilter
    }
  } = props

  const handleTimeChange = (e, data) => {
    changeFilter({
      date: data.value
    })
  }

  return (
    <div className="Analytics" style={{height: 270, position: 'relative'}}>
      <Dropdown placeholder='Time' defaultValue="today" selection options={timeOptions} onChange={handleTimeChange}/>

      <Loader active={pure}/>

      {!pure &&
        <div>
          <Link to={`/report/${storeId}`} style={{margin: '10px 0', float: 'right'}}>
            <Button basic size="mini">Report</Button>
          </Link>

          <div style={{clear: 'both'}}>
            <Order {...props}/>
            <Profit {...props}/>
          </div>
        </div>
      }
    </div>
  )
}

Analytics.propTypes = {

}

Analytics.displayName = 'Analytics'

export default Analytics
