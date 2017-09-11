import React from 'react'

import { Link } from 'react-router-dom'
import { Loader, Button, Dropdown, Grid } from 'semantic-ui-react'

import Order from './analytics-order'
import Profit from './analytics-profit'
import Advert from './analytics-advert'

import LastOrders from './analytics-last-orders'
import OrderChart from './analytics-order-chart'

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

    orders,
    products,
    revenue,

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
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="right">
              <Link to={`/report/${storeId}`}>
                <Button basic size="mini">Report</Button>
              </Link>
              <Link to={`/stores/${storeId}/day-report`}>
                <Button basic size="mini">Orders by Day</Button>
              </Link>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <OrderChart orders={orders} revenue={revenue}/>
              </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Order {...props}/>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
                <Profit {...props}/>
              </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
                <Advert {...props}/>
              </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <LastOrders orders={orders} products={products}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
    </div>
  )
}

Analytics.propTypes = {

}

Analytics.displayName = 'Analytics'

export default Analytics
