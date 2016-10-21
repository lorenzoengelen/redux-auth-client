import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show link to sign out
      return (
        <li className='nav-item'>
          <Link className='nav-link' to='/signout'>Sign out</Link>
        </li>
      );
    } else {
      // show link to sign in and sign up
      return [
        <li className='nav-item'>
          <Link className='nav-link' to='/signin'>Sign in</Link>
        </li>,
        <li className='nav-item'>
          <Link className='nav-link' to='/signup'>Sign up</Link>
        </li>
      ];
    }
  };

  render() {
    return (
      <nav className='navbar navbar-light'>
        <Link to='/' className='navbar-brand'>redux-auth</Link>
        <ul className='nav navbar-nav'>
          {this.renderLinks()} 
        </ul>
      </nav>
    );
  };
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(Header);