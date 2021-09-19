import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NANavbar.scss'
import {
  Alignment,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
} from '@blueprintjs/core'
import { FaUserPlus } from 'react-icons/fa'

export default class NANavbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      userMenu,
      notifyMenu,
      isUserMenu,
      isNotifyMenu,
      handleOpen,
      handleClose,
    } = this.props
    return (
      <Navbar className="navbar-menu">
        <Navbar.Group align={Alignment.LEFT}>
          <Button
            className="logo-btn"
            minimal={true}
            fill={true}
            icon={<img src="/images/icon.png" width={40} height={40} />}
            text={<h2 className="logo-text">Nerdy Answer</h2>}
            onClick={() => {
              window.location.href = '/'
            }}
          />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Navbar.Divider />
          <div className="navbar-menu-dropdown-container">
            <Button
              className="bp3-minimal"
              icon="user"
              onClick={() => {
                if (isUserMenu) handleClose('isUserMenu')
                else handleOpen('isUserMenu')
              }}
            />
            {isUserMenu && userMenu}
          </div>
          <div className="navbar-menu-dropdown-container">
            <Button
              className="bp3-minimal"
              icon="notifications"
              onClick={() => {
                if (isNotifyMenu) handleClose('isNotifyMenu')
                else handleOpen('isNotifyMenu')
              }}
            />
            {isNotifyMenu && notifyMenu}
          </div>
        </Navbar.Group>
      </Navbar>
    )
  }
}

NANavbar.propTypes = {
  userMenu: PropTypes.object,
  notifyMenu: PropTypes.object,
  isUserMenu: PropTypes.bool,
  isNotifyMenu: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
}

NANavbar.defaultProps = {
  userMenu: (
    <Menu className="navbar-menu-dropdown">
      <MenuItem
        icon={
          <span className="bp3-icon bp3-icon-standard">
            <FaUserPlus />
          </span>
        }
        onClick={() => {
          console.log('Open Register Form')
        }}
        text="Register"
      />
    </Menu>
  ),
  notifyMenu: (
    <Menu className="navbar-menu-dropdown">
      <MenuItem
        icon={
          <span className="bp3-icon bp3-icon-standard">
            <FaUserPlus />
          </span>
        }
        onClick={() => {
          console.log('Open Register Form')
        }}
        text="Register"
      />
    </Menu>
  ),
}
