import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.string
}

const Subtitle = ({ children }) => (
  <h2 className='j-subtitle'>{ children }</h2>
)

Subtitle.propTypes = propTypes

export default Subtitle
