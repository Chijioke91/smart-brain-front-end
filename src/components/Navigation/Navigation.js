import React, { Fragment } from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  const guestLinks = (
    <Fragment>
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className="f3 link dim underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    </Fragment>
  );

  const authLinks = (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        onClick={() => onRouteChange('signout')}
        className="f3 link dim underline pa3 pointer"
      >
        Sign Out
      </p>
    </nav>
  );

  return isSignedIn ? authLinks : guestLinks;
};

export default Navigation;
