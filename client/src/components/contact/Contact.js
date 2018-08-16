import React, { Component } from 'react';
import '../css/contact.css';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

class Contact extends Component {
  render() {
    return (
      <div>
        <div className="container contact-container">
            <div className="row custom-row">
                <div className="col-md-6 col-lg-6 mb-lg-3 col1">
                    <ContactInfo />
                </div>
                <div className="col-md-6 col-lg-6 mb-lg-3 col2">
                    <ContactForm />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Contact;
