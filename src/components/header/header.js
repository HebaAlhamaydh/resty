import React from 'react';
import './header.scss';
function Header () {
 
    return (
      <header>
        <h1>RESTy</h1>
        <nav>
          <a href="/"> Home </a>
          <a href="/"> History</a>
          <a href="/"> Help</a>
        </nav>
      </header>
    );
 
}

export default Header;