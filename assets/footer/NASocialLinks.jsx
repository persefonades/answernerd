import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { Button } from '@blueprintjs/core'

import './NASocialLinks.scss'

export default class NASocialLinks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { socialList } = this.props
    return (
      <>
        <div className="social-links-container">
          <div className="container p-2">
            <h2 className="text-white text-center d-block">Connect with us</h2>
            <div className="button-container">
              {socialList.map((e, i) => (
                <Button
                  className={'social-link ' + e.className}
                  minimal={true}
                  icon={e.icon}
                  key={i}
                  text={e.title}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

NASocialLinks.propTypes = {
  socialList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.string | PropTypes.element,
      className: PropTypes.string,
    }),
  ).isRequired,
}

NASocialLinks.defaultProps = {
  socialList: [
    {
      title: 'Facebook',
      icon: (
        <span className="bp3-icon bp3-icon-standard">
          <FaFacebookSquare />
        </span>
      ),
      className: 'bg-fb',
    },
    {
      title: 'Twitter',
      icon: (
        <span className="bp3-icon bp3-icon-standard">
          <FaTwitterSquare />
        </span>
      ),
      className: 'bg-tw',
    },
  ],
}
