import React from 'react'
import _ from 'lodash'
import moment from 'moment'

import { Header, Grid, Table, Loader } from 'semantic-ui-react'

import { Bar as BarChart } from 'react-chartjs-2'

import { dollar } from 'utils/format'

const getDayName = number => {
  return moment().day(number).format('dddd')
}

const DayReport = (props) => {
  const {
    List: {
      data,
      isFetching
    }
  } = props

  const ordersByDay = _.groupBy(data, o => {
    return moment(o.datetime).day()
  })

  const dataByDay = _.map(ordersByDay, orders => {
    const amount = orders.reduce((total, order) => {
      return total + order.total
    }, 0)

    const count = orders.length

    return {
      amount,
      count,
      aov: amount/count
    }
  })

  const countByDay = {
    labels: _.map(dataByDay, (value, key) => getDayName(key)),
    datasets: [{
        data: _.map(dataByDay, (value, key) => value.count),
        borderWidth: 1
    }]
  }

  const amountByDay = {
    labels: _.map(dataByDay, (value, key) => getDayName(key)),
    datasets: [{
        data: _.map(dataByDay, (value, key) => value.amount),
        borderWidth: 1
    }]
  }

  const aovByDay = {
    labels: _.map(dataByDay, (value, key) => getDayName(key)),
    datasets: [{
        data: _.map(dataByDay, (value, key) => value.aov),
        borderWidth: 1
    }]
  }

  return (
    <div className="DayReport">
      <Header as="h3">Orders By Day</Header>

      <Loader active={isFetching}/>

      {!isFetching &&
        <Grid>
          <Grid.Row>
            <Grid.Column computer="8" mobile="16">
              <Header as="h4" textAlign="center">Orders</Header>
              <BarChart data={countByDay} options={{
                  responsive: true,
                  legend: {
                    display: false
                  }
                }}/>
            </Grid.Column>
            <Grid.Column computer="8" mobile="16">
              <Header as="h4" textAlign="center">Amount</Header>
              <BarChart data={amountByDay} options={{
                  responsive: true,
                  legend: {
                    display: false
                  },
                  tooltips: {
                    callbacks: {
                      label: (item) => {
                        return dollar(item.yLabel)
                      }
                    }
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                            callback: function(value) {
                                return dollar(value);
                            }
                          }
                      }]
                  }
                }}/>
            </Grid.Column>
            <Grid.Column computer="8" mobile="16">
              <Header as="h4" textAlign="center">AOV</Header>
              <BarChart data={aovByDay} options={{
                  responsive: true,
                  legend: {
                    display: false
                  },
                  tooltips: {
                    callbacks: {
                      label: (item) => {
                        return dollar(item.yLabel)
                      }
                    }
                  },
                  scales: {
                      yAxes: [{
                          ticks: {
                              callback: function(value) {
                                  return dollar(value);
                              }
                          }
                      }]
                  }
                }}/>
            </Grid.Column>
            <Grid.Column computer="8" mobile="16">

            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Table>
              <Table.Header>
                <Table.HeaderCell>Day</Table.HeaderCell>
                <Table.HeaderCell>Orders</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>AOV</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {_.map(dataByDay, (item, day) => {
                  return (
                    <Table.Row key={day}>
                      <Table.Cell>{getDayName(day)}</Table.Cell>
                      <Table.Cell>{item.count}</Table.Cell>
                      <Table.Cell>{dollar(item.amount)}</Table.Cell>
                      <Table.Cell>{dollar(item.aov)}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      }
    </div>
  )
}

DayReport.propTypes = {

}

DayReport.displayName = 'DayReport'

export default DayReport
