import React from 'react'

import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { isAuthorized } from 'services/auth'

const Header = (props) => {
  const {
    path,
    actions: {
      logoutRequest
    }
  } = props

  function handleLogout() {
    logoutRequest()
  }

  console.log(path);

  return (
    <div className="Header" style={{marginBottom: 20}}>
      <Menu pointing secondary>
        <Menu.Item name='dashboard' as={Link} to="/" active={path === '/' || path.includes('analytics')} />
        <Menu.Item name='store' as={Link} to="/stores" active={path.includes('stores')}/>
        <Menu.Item name='avert account' as={Link} to="/ad-accounts" active={path.includes('ad-accounts')}/>
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
