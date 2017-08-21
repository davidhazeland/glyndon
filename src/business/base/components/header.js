import React from 'react'

import { Menu } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="Header">
      <Menu pointing secondary>
        <Menu.Item name='home' as={Link} to="/"/>
        <Menu.Menu position='right'>
          <Menu.Item name='logout' />
        </Menu.Menu>
      </Menu>
    </div>
  )
}

Header.propTypes = {

}

Header.displayName = 'Header'

export default Header
