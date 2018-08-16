import React, { Component } from 'react';
import '../css/home.css';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
         this.props.history.push('/my_dashboard');
    }
  }
  
  render() {
    return (
      <div className='Home'>
        <HomeHeader />
        <HomeContent />
      </div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Home);