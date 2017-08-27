import React from 'react'

import { Grid, Segment, Message, Statistic, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { dollar, percent, decimal } from 'utils/format'

import { StoreList } from 'constants'

const Welcome = (props) => {
  const {
    analytics,
    pure
  } = props

  return (
    <div className="Welcome" style={{height: 370, position: 'relative'}}>
      <h3 className="ui center aligned header">
        Welcome to Glyndon
      </h3>

      <Loader active={pure}/>

      {!pure && analytics.map((analytic, i) => {
        const {id, orderCount, revenue, cost, spend} = analytic
        const profit = revenue - (cost + spend)
        const roi = profit/spend

        return (
          <Link to={`/analytics/${id}`} key={i} style={{marginTop: 25, display: 'block'}}>
            <Message
              attached
              header={StoreList[id]}
            />
            <Segment className='attached fluid'>
              <Grid doubling textAlign="center" relaxed columns="6">
                <Grid.Row>
                  <Grid.Column>
                    <Statistic size='tiny'>
                      <Statistic.Label>Orders</Statistic.Label>
                      <Statistic.Value>{orderCount}</Statistic.Value>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column>
                    <Statistic size='tiny' color='blue'>
                      <Statistic.Label>Revenue</Statistic.Label>
                      <Statistic.Value>{dollar(revenue)}</Statistic.Value>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column>
                    <Statistic size='tiny' color='orange'>
                      <Statistic.Label>Ad Spend</Statistic.Label>
                      <Statistic.Value>{dollar(spend)}</Statistic.Value>
                    </Statistic>
                  </Grid.Column>
                  <Grid.Column>
                    <Statistic size='tiny'>
                      <Statistic.Label>ROAS</Statistic.Label>
                      <Statistic.Value>{decimal(revenue/spend)}</Statistic.Value>
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
                      <Statistic.Value>{percent(roi)}</Statistic.Value>
                    </Statistic>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Link>
        )
      })}
    </div>
  )
}

Welcome.propTypes = {

}

Welcome.displayName = 'Welcome'

export default Welcome
