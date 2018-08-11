import React, { Component } from 'react';

class Info extends Component {
  render() {
    return (
      <div>
        <p style={{fontSize:'30px'}}>Contact Us</p>
            <hr/>
            <br/>
            <p>Address: NUS School of Computing, COM1, 117417</p>
            <p>Email: xxxx@comp.nus.edu</p>
            <p>Tel: 9123 4567</p>
            <p>
                <a href="https://github.com/linnnruoo/Orbital2018"><i className="fa fa-github contact-icon" style={{fontSize:'34px'}}></i></a>
                <a href="www.facebook.com"><i className="fa fa-facebook-official contact-icon" style={{fontSize:'34px'}}></i></a>
                <a href="www.twitter.com"><i className="fa fa-twitter contact-icon" style={{fontSize:'34px'}}></i></a>
                <a href="www.google.com"><i className="fa fa-google-plus-official contact-icon" style={{fontSize:'34px'}}></i></a>
                <a href="www.linkedin.com"><i className="fa fa-linkedin-square contact-icon" style={{fontSize:'34px'}}></i></a>
            </p>
            <hr/>
            <iframe title="address" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8002383643975!2d103.77194771523132!3d1.2943796621105543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1aff4a5ca177%3A0xc1d4df430ca477b8!2sCOM2!5e0!3m2!1sen!2ssg!4v1527309852340"
                width="600" height="450" frameBorder="0" style={{border:'0', width:'100%', height:'50%'}}></iframe>
            <hr/>
      </div>
    );
  }
}

export default Info;


