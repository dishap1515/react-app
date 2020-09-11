import React from 'react';
import Hole from './Hole';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import './App.css';

const HolesList = ({ items, onMoleClick }) => (
  <div className="holes-list" >
    {
      items.map(({ isActive }, i) =>
        <Hole
          key={i}
          id={i}
          isActive={isActive}
          onMoleClick={onMoleClick}
        />
      )
    }
  </div>
);

HolesList.defaultProps = {
  items: []
};

HolesList.propTypes = {
  items: PropTypes.array.isRequired,
  onMoleClick: PropTypes.func.isRequired
};

export default HolesList;