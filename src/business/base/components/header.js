import React from 'react'

import { Menu } from 'semantic-ui-react'

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
        <Menu.Item name='home' />
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
