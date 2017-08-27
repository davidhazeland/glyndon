import React from 'react'

import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { isAuthorized } from 'services/auth'

const Header = (props) => {
  const {
    actions: {
      logoutRequest
    }
  } = props

  function handleLogout() {
    logoutRequest()
  }

  return (
    <div className="Header" style={{marginBottom: 20}}>
      <Menu pointing secondary>
        <Menu.Item name='home' as={Link} to="/"  />
        <Menu.Item name='store' as={Link} to="/stores" />
        <Menu.Item name='avert account' as={Link} to="/ad-accounts" />
        <Menu.Menu position='right'>
          {isAuthorized() && <Menu.Item name='logout' onClick={handleLogout}/>}
        </Menu.Menu>
      </Menu>
    </div>
  )
}

Header.propTypes = {

}

Header.displayName = 'Header'

export default Header
