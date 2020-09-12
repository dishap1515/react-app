import React from 'react';
import PropTypes from 'prop-types';
import mole from '../images/mole.svg';
import classnames from 'classnames';
import './App.css';

const Hole = ({ id, isActive, onMoleClick }) => {

    const handleClick = e => {
    if (!e.isTrusted) return;
    onMoleClick(id);
  };

  const classes = classnames('hole', `hole${id}`, { 'up': isActive });
  return (
    <div className={classes}>
      <div
        className="hole__mole"
        style={{ backgroundImage: `url(${mole})` }}
        onClick={handleClick}
        />
    </div>
  );
};

Hole.propTypes = {
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default Hole; 