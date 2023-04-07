import React from 'react';

const ResponseMessage = ({ message }) => {
  return (
    <div className="response-message">
      <p>{message}</p>
    </div>
  );
}

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
}

export { ResponseMessage, ErrorMessage };
