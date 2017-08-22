import React from 'react'

import { Grid, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="Welcome">
      <h3 className="ui center aligned header">
        Welcome to Glyndon
      </h3>

      <Grid centered>
        <Grid.Column computer="4" mobile="8">
          <Link to="/analytics/RMQrzVJo9C">
            <Card
              header='David Hazeland'
              meta='CommerceHQ'
              description='https/davidhazeland.com/'
            />
          </Link>
        </Grid.Column>
        <Grid.Column computer="4" mobile="8">
          <Link to="/analytics/GYniQV6lRB">
            <Card
              header='Infinit Store'
              meta='CommerceHQ'
              description='https://infinitstore.com/'
            />
          </Link>
        </Grid.Column>
      </Grid>
    </div>
  )
}

Welcome.propTypes = {

}

Welcome.displayName = 'Welcome'

export default Welcome
