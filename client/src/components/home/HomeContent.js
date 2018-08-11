import React, { Component } from 'react';
import profile_pic1 from '../img/kevin_profile.jpg';
import profile_pic2 from '../img/linruo_profile.jpg';
import profile_pic3 from '../img/sean_profile.jpg';

class HomeContent extends Component {


  render() {
    return (
      <div className="homeContent">
        <section className="content">

          <div className="container container2">
            <div className="row">
              <div className="card col-lg-4 col-centered card1">
                <div className="mx-auto m-4 text-justify">
                    <h3>Step 1</h3>
                    <h4>Create your account <i className="fa fa-sign-in" style={{ fontSize: '27px' }}></i></h4>
                    <p>Sign up for an wripple account now! A verification email will be sent to you shortly after you have signed up for an account.
                  </p>
                </div>
              </div>
              <div className="card col-lg-4 col-centered card1">
                <div className="mx-auto m-4 text-justify">
                  <h3>Step 2</h3>
                  <h4>Fill in your profile <i className="fa fa-drivers-license-o" style={{ fontSize: '27px' }}></i></h4>
                  <p className="text-justify">Now, you may fill in your profile by clicking the My Profile option under the dropdown menu of the profile icon on the navigation bar. To let people know more about you, it is recommended to fill in all the details required.
                  </p>
                </div>
              </div>
              <div className="card col-lg-4 col-centered card1">
                <div className="mx-auto m-4 text-justify">
                  <h3>Step 3</h3>
                  <h4>Start your project <i className="fa fa-folder-open" style={{ fontSize: '27px' }}></i></h4>
                  <p>You are all set! You can click 'Create new project' under the dropdown menu to start your own project and wait for people to apply for your project! You can also click on the Projects option on your navigation bar to explore more projects available. Further more you can recruit partners for external competitions or your own projects!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div>
            <div className="row">
              <div className="col-md-6 col1 img3">
              </div>
              <div className="col-md-6 col1">
                <h2>Coorperation made easy</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget bibendum dui, ac iaculis tortor. Cras eu dolor
                  urna. Maecenas sit amet tortor lectus. Pellentesque ac tincidunt neque. Duis vitae convallis neque. Aliquam erat
                  volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer laoreet a nulla eu elementum.
                  Nullam iaculis tempor turpis, at semper diam hendrerit sit amet. Fusce euismod cursus elit non condimentum. Nam
                  ultrices leo nec lacus mattis, et lobortis nunc euismod. Morbi aliquet risus magna, sed pulvinar elit porta vitae.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget bibendum dui, ac iaculis tortor. Cras eu dolor
                  urna. Maecenas sit amet tortor lectus. Pellentesque ac tincidunt neque. Duis vitae convallis neque. Aliquam erat
                  volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer laoreet a nulla eu elementum.
                  Nullam iaculis tempor turpis, at semper diam hendrerit sit amet. Fusce euismod cursus elit non condimentum. Nam
                  ultrices leo nec lacus mattis, et lobortis nunc euismod. Morbi aliquet risus magna, sed pulvinar elit porta vitae.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="row">
          <div className="col container3">
            <h3>Join our community and view millions of projects!</h3>
            <h5 style={{ fontWeight: '100' }}>You may be one step closer to make your dreams come true!</h5>
          </div>
        </section>
        <section className="text-center">
          <div className="alumini-msg">
            <h3>Listen to what our reputable users say :)</h3>
            <h5 style={{ fontWeight: '100' }}>You might also have many friends here!</h5>
          </div>
          <div className="container container4">
            <div className="row">
              <div className="card col-lg-4 col-centered card2">
                <div className="mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={profile_pic1} style={{ boxShadow: '0 4px 4px 0 #adb5bd' }} alt="profile" />
                  <h4>Kevin Chan</h4>
                  <h5>Team Member 1</h5>
                  <p>Single and available, a sporty Computer Science Student who likes to play squash. He is also familiar with Angular and weird stuff.
                  </p>
                </div>
              </div>
              <div className="card col-lg-4 col-centered card2">
                <div className="mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={profile_pic3} style={{ boxShadow: '0 4px 4px 0 #adb5bd' }} alt="profile" />
                  <h4>Sean Ng</h4>
                  <h5>Our Boss</h5>
                  <p>The man from Business who gave the team this great idea to start this web application. He has many other great ideas too.
                  </p>
                </div>
              </div>
              <div className="card col-lg-4 col-centered card2">
                <div className="mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={profile_pic2} style={{ boxShadow: '0 4px 4px 0 #adb5bd' }} alt="profile" />
                  <h4>Lin Ruo</h4>
                  <h5>Team Member 2</h5>
                  <p>Cool and calm, a not-so-sporty Computer Engineering student who likes niche sports. She has a female cat called Michael.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about-section">
          <div className="row">
            <div className="col-md-8">
              <h1>About wripple, about us.</h1>
              <h4>Meet the creators behind wripple</h4><br />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget bibendum dui, ac iaculis tortor. Cras eu dolor
                urna. Maecenas sit amet tortor lectus. Pellentesque ac tincidunt neque. Duis vitae convallis neque. Aliquam erat
                volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer laoreet a nulla eu elementum. Nullam
                iaculis tempor turpis, at semper diam hendrerit sit amet. Fusce euismod cursus elit non condimentum. Nam ultrices
                leo nec lacus mattis, et lobortis nunc euismod. Morbi aliquet risus magna,</p>
              <p>
                <a href="www.facebook.com"><i className="fa fa-facebook home-icon"></i></a>
                <a href="www.facebook.com"><i className="fa fa-twitter home-icon"></i></a>
                <a href="www.facebook.com"><i className="fa fa-google home-icon"></i></a>
                <a href="www.facebook.com"><i className="fa fa-linkedin home-icon"></i></a>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomeContent;
