import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NALoginForm.scss'
import {
  Button,
  Checkbox,
  Classes,
  Icon,
  InputGroup,
  Intent,
  Label,
} from '@blueprintjs/core'
import { Tooltip2 } from '@blueprintjs/popover2'
import { FaLock, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa'

export default class NALoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      remember: false,
      showPassword: false,
    }
    this.togglePassword = this.togglePassword.bind(this)
  }

  togglePassword() {
    const { showPassword } = this.state
    this.setState({
      ...this.state,
      showPassword: !showPassword,
    })
  }

  modelField(event, fieldName) {
    this.setState({
      ...this.state,
      [fieldName]: event.target.value,
    })
  }

  modelRemember(event) {
    this.setState({
      ...this.state,
      remember: event.target.checked,
    })
  }

  render() {
    const { showPassword, username, password, remember } = this.state
    const {
      title,
      yes,
      no,
      usernameField,
      passwordField,
      rememberField,
      onClose,
      ...otherProps
    } = this.props

    const toggleBtn = (
      <Tooltip2 content={`${showPassword ? 'Hide' : 'Show'} Password`}>
        <Button minimal={true} onClick={this.togglePassword}>
          <span className="bp3-icon bp3-icon-standard">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </Button>
      </Tooltip2>
    )

    return (
      <form className="loginForm" method="post" action={window.$variables.route['user_login']} {...otherProps}>
        <div className={Classes.DIALOG_HEADER + ' formHeader'}>
          <h1 className={Classes.HEADING}>{title}</h1>
          <Button
            minimal={true}
            className={Classes.DIALOG_CLOSE_BUTTON}
            onClick={() => {
              onClose()
            }}
          >
            <FaTimes />
          </Button>
        </div>
        <div className={Classes.DIALOG_BODY + ' formBody'}>
          <input
            type="hidden"
            name="_csrf_token"
            value={window.$variables.csrf['authenticate']}
          />
          <Label htmlFor="username">
            {usernameField.title}
            <InputGroup
              name="username"
              autocomplete="username"
              placeholder={usernameField.placeholder}
              leftElement={usernameField.leftIcon}
              value={username}
              onChange={(event) => {
                this.modelField(event, 'username')
              }}
              required
              />
          </Label>
          <Label htmlFor="password">
            {passwordField.title}
            <InputGroup
              name="password"
              autocomplete="current-password"
              placeholder={passwordField.placeholder}
              type={showPassword ? 'text' : 'password'}
              leftElement={passwordField.leftIcon}
              rightElement={toggleBtn}
              value={password}
              onChange={(event) => {
                this.modelField(event, 'password')
              }}
              required
            />
          </Label>
          <Checkbox
            name="_remember_me"
            checked={remember}
            label={rememberField.title}
            onChange={(event) => {
              this.modelRemember(event)
            }}
          />
        </div>
        <div className={Classes.DIALOG_FOOTER + ' formFooter'}>
          {yes.display && (
            <Button
              type="submit"
              icon={yes.icon}
              intent={yes.intent}
              text={yes.title}
            />
          )}
          {no.display && (
            <Button icon={no.icon} intent={no.intent} text={no.title} />
          )}
        </div>
      </form>
    )
  }
}

const fieldPropTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  leftIcon: PropTypes.string | PropTypes.object,
}

NALoginForm.propTypes = {
  title: PropTypes.string,
  yes: PropTypes.object,
  no: PropTypes.object,
  usernameField: PropTypes.shape(fieldPropTypes),
  passwordField: PropTypes.shape(fieldPropTypes),
  rememberField: PropTypes.object,
  onClose: PropTypes.func,
}

NALoginForm.defaultProps = {
  title: 'Login Form',
  yes: {
    title: 'Signin',
    icon: 'log-in',
    intent: Intent.SUCCESS,
    display: true,
  },
  no: { title: 'Cancel', icon: '', intent: Intent.NONE, display: false },
  usernameField: {
    title: 'Username',
    placeholder: 'Enter your username...',
    leftIcon: <Icon icon="user" />,
  },
  passwordField: {
    title: 'Password',
    placeholder: 'Enter your password...',
    leftIcon: (
      <span className="bp3-icon bp3-icon-standard">
        <FaLock />
      </span>
    ),
  },
  rememberField: {
    title: 'Remember me',
    enabled: false,
  },
  onClose: function () {},
}
