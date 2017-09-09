import React from 'react'

import _ from 'lodash'
import moment from 'moment-timezone'

const timezone = 'America/Los_Angeles'

import { Grid } from 'semantic-ui-react'
import { Bar as BarChart, Pie as PieChart } from 'react-chartjs-2'

import { decimal } from 'utils/format'

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

const bestCountries = ['US', 'AU', 'CA', 'UK', 'GB']

const mapTotalValue = (orders, key) => {
  const totalOrder = orders.reduce((total, order) => {
    return total + order.total
  }, 0)
  return {
    name: key,
    value: decimal(totalOrder)
  }
}

const AnalyticsOrderChart = (props) => {
  const { orders } = props

  const ordersByHour = _.groupBy(orders, order => {
    return moment(order.orderDate, 'X').tz(timezone).startOf('hour').format('ha')
  })

  const totalOrderByHour = _.map({
    ...defaultByHour,
    ...ordersByHour
  }, mapTotalValue)

  const ordersByCountries = _.groupBy(orders, order => {
    const country = order.shippingCountry
    return bestCountries.includes(country) ? country : 'Other'
  })

  const totalOrderByCountries = _.sortBy(_.map(ordersByCountries, mapTotalValue), o => {
    return -1 * parseFloat(o.value, 10)
  })

  const data =  {
      labels: _.map(totalOrderByHour, x => x.name),
      datasets: [{
          data: _.map(totalOrderByHour, x => x.value),
          borderWidth: 1
      }]
  }

  const dataByCountries = {
    datasets: [{
      data: _.map(totalOrderByCountries, x => x.value),
      backgroundColor: [
        '#5DA5DA',
        '#F17CB0',
        '#60BD68',
        '#B276B2',
        '#FAA43A',
        '#DECF3F'
      ]
    }],
    labels: _.map(totalOrderByCountries, x => x.name)
  }

  return (
    <div className="AnalyticsOrderChart" style={{marginBottom: 20}}>
      <Grid>
        <Grid.Column computer="8" mobile="16">
          <BarChart data={data} options={{
              responsive: true,
              legend: {
                display: false
              }
            }}/>
        </Grid.Column>
        <Grid.Column computer="8" mobile="16">
          <PieChart data={dataByCountries} options={{
              responsive: true,
              legend: {
                position: 'bottom'
              }
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
