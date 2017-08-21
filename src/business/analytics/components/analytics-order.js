import React from 'react'

import { Message, Segment, Grid, Statistic } from 'semantic-ui-react'
import { dollar } from 'utils/format'

const AnalyticsOrder = (props) => {
  const {
    spend,
    revenue,
    orderCount
  } = props

  return (
    <div className="AnalyticsOrder">
      <Message
        attached
        header='Order'
      />
      <Segment className='attached fluid'>
        <Grid columns={3} divided textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Statistic size='tiny'>
                <Statistic.Label>Today</Statistic.Label>
                <Statistic.Value>{orderCount}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny'>
                <Statistic.Label>AOV</Statistic.Label>
                <Statistic.Value>{dollar(revenue/orderCount)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic size='tiny'>
                <Statistic.Label>CPA</Statistic.Label>
                <Statistic.Value>{dollar(spend/orderCount)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  )
}

AnalyticsOrder.propTypes = {

}

AnalyticsOrder.displayName = 'AnalyticsOrder'

export default AnalyticsOrder
