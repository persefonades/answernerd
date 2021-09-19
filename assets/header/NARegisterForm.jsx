import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NARegisterForm.scss'
import {
  Button,
  Checkbox,
  Classes,
  Icon,
  InputGroup,
  Intent,
  Label,
} from '@blueprintjs/core'
import { DateInput } from '@blueprintjs/datetime'
import { Tooltip2 } from '@blueprintjs/popover2'
import {
  FaUserPlus,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaTimes,
} from 'react-icons/fa'
import { AiFillMail } from 'react-icons/ai'
import moment from 'moment'

export default class NARegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      username: '',
      password: '',
      rpassword: '',
      dateOfBirth: moment().subtract(16, 'years').toDate(),
      email: '',
      agree: false,
      showPassword: false,
      showDatePicker: false,
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

  modelField(value, fieldName) {
    this.setState({
      ...this.state,
      [fieldName]: value,
    })
  }

  modelAgree(event) {
    this.setState({
      ...this.state,
      agree: event.target.checked,
    })
  }

  render() {
    const {
      showPassword,
      fullname,
      username,
      email,
      password,
      rpassword,
      dateOfBirth,
      agree,
    } = this.state
    const {
      title,
      yes,
      no,
      fullnameField,
      usernameField,
      emailField,
      passwordField,
      rpasswordField,
      dateOfBirthField,
      agreeField,
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
      <form
        className="registerForm"
        method="post"
        action={window.$variables.routes['user_register']}
        {...otherProps}
      >
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
            name="registration_form[_token]"
            value={window.$variables.csrf['user_register']}
          />
          <Label htmlFor="registration_form_fullName">
            {fullnameField.title}
            <InputGroup
              name="registration_form[fullName]"
              placeholder={fullnameField.placeholder}
              leftElement={fullnameField.leftIcon}
              value={fullname}
              onChange={(event) => {
                this.modelField(event.target.value, 'fullname')
              }}
            />
          </Label>

          <Label htmlFor="registration_form_username">
            {usernameField.title}
            <InputGroup
              name="registration_form[username]"
              placeholder={usernameField.placeholder}
              leftElement={usernameField.leftIcon}
              value={username}
              onChange={(event) => {
                this.modelField(event.target.value, 'username')
              }}
              required
            />
          </Label>

          <Label htmlFor="registration_form_dateOfBirth">
            {dateOfBirthField.title}
            <DateInput
              formatDate={(date) => moment(date).format('YYYY-MM-DD')}
              onChange={(date) => {
                this.modelField(
                  moment(date).format('YYYY-MM-DD'),
                  'dateOfBirth',
                )
              }}
              name="registration_form_dateOfBirth"
              closeOnSelection={true}
              minDate={moment().subtract(116, 'years').toDate()}
              maxDate={moment().subtract(16, 'years').toDate()}
              parseDate={(str) => moment(str, 'YYYY-MM-DD').toDate()}
              placeholder={dateOfBirthField.placeholder}
              value={moment(dateOfBirth, 'YYYY-MM-DD').toDate()}
              inputProps={{ leftElement: dateOfBirthField.leftIcon }}
            />
            <input
              type="hidden"
              value={moment(dateOfBirth).format('D')}
              name="registration_form[dateOfBirth][day]"
            />
            <input
              type="hidden"
              value={moment(dateOfBirth).format('M')}
              name="registration_form[dateOfBirth][month]"
            />
            <input
              type="hidden"
              value={moment(dateOfBirth).format('YYYY')}
              name="registration_form[dateOfBirth][year]"
            />
          </Label>

          <Label htmlFor="registration_form_email">
            {emailField.title}
            <InputGroup
              name="registration_form[email]"
              placeholder={emailField.placeholder}
              leftElement={emailField.leftIcon}
              value={email}
              onChange={(event) => {
                this.modelField(event.target.value, 'email')
              }}
              required
            />
          </Label>

          <Label htmlFor="registration_form_password_first">
            {passwordField.title}
            <InputGroup
              name="registration_form[password][first]"
              placeholder={passwordField.placeholder}
              type={showPassword ? 'text' : 'password'}
              leftElement={passwordField.leftIcon}
              rightElement={toggleBtn}
              value={password}
              onChange={(event) => {
                this.modelField(event.target.value, 'password')
              }}
              required
            />
          </Label>

          <Label htmlFor="registration_form_password_second">
            {rpasswordField.title}
            <InputGroup
              name="registration_form[password][second]"
              placeholder={rpasswordField.placeholder}
              type={showPassword ? 'text' : 'password'}
              leftElement={rpasswordField.leftIcon}
              rightElement={toggleBtn}
              value={rpassword}
              onChange={(event) => {
                this.modelField(event.target.value, 'rpassword')
              }}
              required
            />
          </Label>

          <Checkbox
            name="registration_form[agreeTerms]"
            checked={agree}
            label={agreeField.title}
            onChange={(event) => {
              this.modelAgree(event)
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
  leftIcon: PropTypes.string | PropTypes.element,
}

NARegisterForm.propTypes = {
  title: PropTypes.string,
  yes: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string | PropTypes.element,
    intent: PropTypes.string,
    display: PropTypes.bool,
  }),
  no: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string | PropTypes.element,
    intent: PropTypes.string,
    display: PropTypes.bool,
  }),
  fullnameField: PropTypes.shape(fieldPropTypes),
  usernameField: PropTypes.shape(fieldPropTypes),
  emailField: PropTypes.shape(fieldPropTypes),
  dateOfBirthField: PropTypes.shape(fieldPropTypes),
  passwordField: PropTypes.shape(fieldPropTypes),
  rpasswordField: PropTypes.shape(fieldPropTypes),
  agreeField: PropTypes.object,
  onClose: PropTypes.func,
}
NARegisterForm.defaultProps = {
  title: 'Register Form',
  yes: {
    title: 'Register',
    icon: <FaUserPlus />,
    intent: Intent.SUCCESS,
    display: true,
  },
  no: { title: 'Cancel', icon: '', intent: Intent.NONE, display: false },
  fullnameField: {
    title: 'Full name',
    placeholder: 'Enter your fullname...',
    leftIcon: (
      <span className="bp3-icon bp3-icon-standard">
        <FaUser />
      </span>
    ),
  },
  emailField: {
    title: 'Email',
    placeholder: 'Enter your email...',
    leftIcon: (
      <span className="bp3-icon bp3-icon-standard">
        <AiFillMail />
      </span>
    ),
  },
  dateOfBirthField: {
    title: 'Date of Birth',
    placeholder: 'Enter your date of birth...',
    leftIcon: <Icon icon="calendar" />,
  },
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
  rpasswordField: {
    title: 'Repeat Password',
    placeholder: 'Confirm your password...',
    leftIcon: (
      <span className="bp3-icon bp3-icon-standard">
        <FaLock />
      </span>
    ),
  },
  agreeField: {
    title: (
      <>
        Agree to the terms | <a href="/">Terms & Conditions</a>
      </>
    ),
    enabled: false,
  },
  onClose: function () {},
}
