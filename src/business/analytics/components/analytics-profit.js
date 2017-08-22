import React from 'react'

import { Message, Segment, Grid, Statistic } from 'semantic-ui-react'
import { dollar, percent } from 'utils/format'

const AnalyticsProfit = (props) => {
  const {
    spend,
    revenue,
    cost
  } = props

  const profit = revenue-(spend+cost)

  return (
    <div className="AnalyticsProfit" style={{marginTop: 20}}>
      <Message
        attached
        header='Finance'
      />
      <Segment className='attached fluid'>
        <Grid columns={5} divided textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Statistic size='tiny' color='orange'>
                <Statistic.Label>Fulfillment</Statistic.Label>
                <Statistic.Value>{dollar(cost)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny' color='orange'>
                <Statistic.Label>Spent</Statistic.Label>
                <Statistic.Value>{dollar(spend)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny' color='blue'>
                <Statistic.Label>Revenue</Statistic.Label>
                <Statistic.Value>{dollar(revenue)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny' color={profit >= 0 ? 'green' : 'red'}>
                <Statistic.Label>Profit</Statistic.Label>
                <Statistic.Value>{dollar(profit)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny' color={profit >= 0 ? 'green' : 'red'}>
                <Statistic.Label>ROI</Statistic.Label>
                <Statistic.Value>{percent(profit/spend)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  )
}

AnalyticsProfit.propTypes = {

}

AnalyticsProfit.displayName = 'AnalyticsProfit'

export default AnalyticsProfit
