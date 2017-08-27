import React from 'react'

import { Message, Segment, Grid, Statistic } from 'semantic-ui-react'
import { dollar, percent } from 'utils/format'

const AnalyticsAdvert = (props) => {
  const {
    adInsights
  } = props

  const adInsight = adInsights[0] || {}

  return (
    <div className="AnalyticsAdvert">
      <Message
        attached
        header='Advert'
      />
      <Segment className='attached fluid'>
        <Grid divided textAlign="center" relaxed>
          <Grid.Row>
            <Grid.Column computer="4" mobile="8">
              <Statistic size='tiny'>
                <Statistic.Label>Link Clicks</Statistic.Label>
                <Statistic.Value>{adInsight.linkClicks}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column computer="4" mobile="8">
              <Statistic size='tiny'>
                <Statistic.Label>CPC</Statistic.Label>
                <Statistic.Value>{dollar(adInsight.cpc)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column computer="4" mobile="8">
              <Statistic size='tiny'>
                <Statistic.Label>CTR</Statistic.Label>
                <Statistic.Value>{percent(adInsight.ctr/100)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
            <Grid.Column computer="4" mobile="8">
              <Statistic size='tiny'>
                <Statistic.Label>CPM</Statistic.Label>
                <Statistic.Value>{dollar(adInsight.cpm)}</Statistic.Value>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  )
}

AnalyticsAdvert.propTypes = {

}

AnalyticsAdvert.displayName = 'AnalyticsAdvert'

export default AnalyticsAdvert
