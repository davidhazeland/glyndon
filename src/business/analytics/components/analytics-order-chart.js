import React from 'react'

import _ from 'lodash'
import moment from 'moment-timezone'

const timezone = 'America/Los_Angeles'

import { Grid } from 'semantic-ui-react'
const Chart = require('d3-react-squared').Main

const defaultByHour = {
  '12am': [],
  '1am': [],
  '2am': [],
  '3am': [],
  '4am': [],
  '5am': [],
  '6am': [],
  '7am': [],
  '8am': [],
  '9am': [],
  '10am': [],
  '11am': [],
  '12pm': [],
  '1pm': [],
  '2pm': [],
  '3pm': [],
  '4pm': [],
  '5pm': [],
  '6pm': [],
  '7pm': [],
  '8pm': [],
  '9pm': [],
  '10pm': [],
  '11pm': []
}

const AnalyticsOrderChart = (props) => {
  const { orders } = props

  const ordersByHour = _.groupBy(orders, order => {
    return moment(order.orderDate, 'X').tz(timezone).startOf('hour').format('ha')
  })

  const data = _.map({
    ...defaultByHour,
    ...ordersByHour
  }, (orders, hour) => {
    return {
      id: hour,
      value: orders.reduce((total, order) => {
        return total + order.total
      }, 0)
    }
  })

  return (
    <div className="AnalyticsOrderChart" style={{height: 200}}>
      <Grid columns="2">
        <Grid.Column>
          <Chart typeType="bar" highlight={false} data={data} params={{
              aspectRatio: 0.3
            }}/>
        </Grid.Column>
      </Grid>
    </div>
  )
}

AnalyticsOrderChart.propTypes = {

}

AnalyticsOrderChart.displayName = 'AnalyticsOrderChart'

export default AnalyticsOrderChart
