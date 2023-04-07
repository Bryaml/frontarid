import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="container">
      {currentUser ? (
        <div>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.nombres}</strong> Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.token}
          </p>
          <p>
            <strong>ID:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Rol:</strong> {currentUser.rol}
          </p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please log in to see your profile.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
