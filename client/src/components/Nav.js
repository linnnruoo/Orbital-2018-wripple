import React, { Component } from 'react';
import './css/nav.css'
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import logo from './img/icon_transparent.png'


class Nav extends Component {

  constructor() {
    super();
    this.state = {
      menuState: false,
      expandMobileMenu: false
    }

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  //scrolling effect
  //dont know how to make the nav bar opaque in rest of the pages
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const nav_scroll = document.getElementById('nav');

    if (window.scrollY > 100) {
      //nav_scroll.classList.remove('nav-bar-onTop');
      nav_scroll.classList.add("nav-bar-collapse");
    } else {
      nav_scroll.classList.remove("nav-bar-collapse");
      //nav_scroll.classList.add('nav-bar-onTop');
    }
  }
  // end of scrolling

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    // Redirect page to home page upon logout
  }

  showMenu(e) {
    e.preventDefault();
    console.log("clicked");
    this.setState({ menuState: true }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }

  closeMenu() {
    this.setState({ menuState: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    })
  }

  toggleMobileMenu = () => {
    this.setState({ openMobileMenu: !this.state.openMobileMenu }, () => {
      if (this.state.openMobileMenu) {
        document.addEventListener('click', this.toggleMobileMenu)
      } else {
        document.removeEventListener('click', this.toggleMobileMenu)
      }
    })
  }



  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav nav-pills ml-auto">
        <li className="nav-item mr-2">
          <Link to="/createnewproject" className="nav-link menu"><i className="fas fa-plus pr-2"></i>New</Link>
        </li>
        <li className="nav-item mr-2">
          <Link to="/search" className="nav-link menu"><i className="fas fa-search pr-2"></i>Search</Link>
        </li>
        <li className="nav-item mr-2">
          <Link to="/my_dashboard" className="nav-link menu"><i className="fas fa-tachometer-alt pr-2"></i>Dashboard</Link>
        </li>
        <li className="nav-item mr-2">
          <Link to="/myprofile" className="nav-link menu"><i className="fas fa-user pr-2"></i>Profile</Link>
        </li>
        {this.state.openMobileMenu ?
          <div className='drops'>

            <li className="nav-item mr-2">
              <Link to='/about' className="nav-link menu">About</Link>
            </li>
            <li className="nav-item mr-2">
              <Link to='/contact' className="nav-link menu">Contact us</Link>
            </li>
            <li className="nav-item mr-2">
              <Link to='/link' className="nav-link menu" onClick={this.onLogoutClick}>Logout</Link>
            </li>
          </div>
          :
          <li className="nav-item">
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" onClick={this.showMenu}></button>
            <div className={`dropdown-menu dropdown-menu-right ${this.state.menuState ? 'show' : ''}`}>
              <NavLink exact to='/about' className="dropdown-item">About</NavLink>
              <NavLink exact to='/contact' className="dropdown-item">Contact us</NavLink>
              <div className="dropdown-divider"></div>
              <NavLink to='/link' className="dropdown-item" onClick={this.onLogoutClick}>Logout</NavLink>
            </div>
          </div>
        </li>
          }
        
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav nav-pills ml-auto">
        <li className="nav-item mr-2">
          <Link to="/search" className="nav-link menu"><i className="fas fa-search pr-2"></i>Search Projects</Link>
        </li>
        <li className="nav-item mr-2">
          <Link to="/about" className="nav-link menu">About</Link>
        </li>
        <li className="nav-item mr-2">
          <Link to="/contact" className="nav-link menu">Contact</Link>
        </li>
        <div className="vl mr-2"></div>
        <li className="nav-item mr-2">
          <Link to="/signup" className="nav-link menu">Sign up</Link>
        </li>
        <li className="nav-item mr-2">
          <Link to="/login" className="nav-link menu">Log in</Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top" id="nav">
          <Link to="/" className="navbar-brand text-light">
            <img src={logo} alt="" style={{ height: '30px', width: '40px' }} />
            <span style={{ display: 'inline-block' }} className=''>ripple</span>
          </Link>

          <button className="navbar-toggler text-light" type='button' onClick={this.toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>

          <div className={`collapse navbar-collapse ${this.state.openMobileMenu ? 'show' : ''}`}>
            {isAuthenticated ? authLinks : guestLinks}
          </div>


        </nav>
      </div>
    );
  }
}

Nav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Nav);
