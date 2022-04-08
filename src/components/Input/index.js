import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

export default function Input({ label, id, onChange, type, error, value, required, className, ...props }) {
  const classInput = ['input'];
  if (className) {
    classInput.push(className);
  }
  
  if (error) {
    classInput.push('input--error');
  }

  let elementInput = (
    <input
        type={type}
        id={id}
        onChange={onChange}
        required={required}
        className={classInput.join(' ')}
        value={value}
        {...props}
      />
  )

  if (type === 'textarea') {
    classInput.push('input--large');
    elementInput = (
      <textarea
        id={id}
        className={classInput.join(' ')}
        onChange={onChange}
        value={value}
        required={required}
        {...props}
      />
    )
  }

  return (
    <>
      {label && <label htmlFor={id}>{label}{required && <span>*</span>}</label>}
      
      {elementInput}

      {error && <span className="input-group__error">{error}</span>}
    </>
  )
}
Input.defaultProps = {
  label: null,
  type: 'text',
  error: null,
  required: false,
  className: '',
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};