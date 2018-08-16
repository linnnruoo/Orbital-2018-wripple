import React, { Component } from 'react';
import ParticlesDisplay from './ParticlesDisplay';
import { Link } from 'react-router-dom';
import Typed from 'react-typed'

class HomeHeader extends Component {
  render() {
    return (
      <div>
        <header className="masthead text-white text-center">
          <div className="top">
            <div className="container text my-auto">
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <h2 className="display-3">wripple</h2>
                  <h4>Find a <Typed strings={[
                    'graphic designer',
                    'videographer',
                    'photographer',
                    'entrepreneur',
                    'engineer',
                    'programmer'
                  ]} typeSpeed={40} backSpeed={50} loop></Typed>
                  </h4>
                </div>
                <div className="col-lg-8 mx-auto">
                  <p className='px-5'>An online platform for students with different skills to connect and collaborate.<br />Find people based on skill
                                    sets and bring your project ideas to reality!</p>
                  <Link to="/about"><div className="btn btn-info button1">Find out more</div></Link>
                  <Link to="/signup"><div className="btn btn-success button2">Sign up now &raquo;</div></Link>
                </div>
              </div>
            </div>
            <ParticlesDisplay />
          </div>
        </header>
      </div>
    );
  }
}

export default HomeHeader;