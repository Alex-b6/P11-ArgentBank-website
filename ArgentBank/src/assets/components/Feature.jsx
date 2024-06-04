// src/components/Feature.js

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/feature.scss';

const Feature = ({ imgSrc, imgAlt, title, children }) => {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{children}</p>
    </div>
  );
};

Feature.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Feature;
