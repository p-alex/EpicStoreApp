import React from 'react';
import MainNavigation from '../containers/MainNavigation/MainNavigation';
import StoreNavSearch from '../components/StoreNavSearch/StoreNavSearch';

const Layout = props => {
  return (
    <React.Fragment>
      <MainNavigation />
      <div className="container">
        <StoreNavSearch />
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default Layout;
