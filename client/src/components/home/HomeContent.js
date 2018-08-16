import React, { Component } from 'react';
import profile_pic1 from '../img/kevin_profile.jpg';
import profile_pic2 from '../img/linruo_profile.jpg';
import programmer from '../img/ilya-pavlov-87438-unsplash.jpg';
import engineer from '../img/aaron-barnaby-135630-unsplash.jpg';
import photographer from '../img/jeshoots-com-219059-unsplash.jpg';
import videographer from '../img/photo-1533246956710-a9f4a2670e87.jpg';
import graphic_designer from '../img/kelly-sikkema-291518-unsplash.jpg';
import entrepreneur from '../img/rawpixel-250087-unsplash.jpg';

class HomeContent extends Component {

  render() {
    return (
      <div className="homeContent">
        <section className="content" style={{backgroundColor: "white"}}>

          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-user-plus text-primary mb-3 sr-icons"></i>
                  <h3 className="mb-3">Create Your Account</h3>
                  <p className="text-muted mb-0">Sign up for an wripple account now by filling in the necessary details on the sign up form!</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-drivers-license-o text-primary mb-3 sr-icons"></i>
                  <h3 className="mb-3">Fill in Your Profile</h3>
                  <p className="text-muted mb-0">To let people know more about you, it is recommended to fill in all the profile details required.</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-folder-open text-primary mb-3 sr-icons"></i>
                  <h3 className="mb-3">Start Your Project</h3>
                  <p className="text-muted mb-0"> You can click '+ New' under the navigation bar to start your own project and wait for people to apply for your project! </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="service-box mt-5 mx-auto">
                  <i className="fa fa-4x fa-handshake-o text-primary mb-3 sr-icons"></i>
                  <h3 className="mb-3">Ready for Collaboration</h3>
                  <p className="text-muted mb-0">You are all set! you can recruit partners for your projects or join other projects as a collaborator! </p>
                </div>
              </div>
            </div>
          </div>

        </section>

        <section className="p-0" id="portfolio">
          <div className="container-fluid p-0">
            <div className="row no-gutters popup-gallery">
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href={programmer}>
                  <img className="img-fluid" src={programmer} alt=""/>
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <h3 className="text-faded">
                       Programmer
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href={engineer}>
                  <img className="img-fluid" src={engineer} alt=""/>
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <h3 className="text-faded">
                       Engineer
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href={graphic_designer}>
                  <img className="img-fluid" src={graphic_designer} alt=""/>
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <h3 className="text-faded">
                        Graphic Designer
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href={videographer}>
                  <img className="img-fluid" src={videographer} alt=""/>
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <h3 className="text-faded">
                        Videographer
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href={photographer}>
                  <img className="img-fluid" src={photographer} alt=""/>
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <h3 className="text-faded">
                        Photographer
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
              <div className="col-lg-4 col-sm-6">
                <a className="portfolio-box" href={entrepreneur}>
                  <img className="img-fluid" src={entrepreneur} alt=""/>
                  <div className="portfolio-box-caption">
                    <div className="portfolio-box-caption-content">
                      <h3 className="text-faded">
                        Entrepreneur
                      </h3>
                    </div>
                  </div>
                </a>
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
            <h3>Listen to what our reputable users say</h3>
            <h5 style={{ fontWeight: '100' }}>You might also have many friends here!</h5>
          </div>
          <div className="container container4">
            <div className="row">
              <div className="card col-lg-6 col-centered card2">
                <div className="mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={profile_pic1} style={{ boxShadow: '0 4px 4px 0 #adb5bd' }} alt="profile" />
                  <h4>Kevin Chan</h4>
                  <h5>Team Member</h5>
                  <p>Single and available, a sporty Computer Science student who likes to play squash. He is familiar with AngularJs and weird stuff.
                  </p>
                </div>
              </div>
              <div className="card col-lg-6 col-centered card2">
                <div className="mx-auto mb-5 mb-lg-0">
                  <img className="img-fluid rounded-circle mb-3" src={profile_pic2} style={{ boxShadow: '0 4px 4px 0 #adb5bd' }} alt="profile" />
                  <h4>Lin Ruo</h4>
                  <h5>Team Member</h5>
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
              <p style={{fontSize: "18px"}}>Thank you for visiting our website! We are Kevin and Lin Ruo, current Year 2 computing students from National University of Singapore. This website, wripple, was created under NUS Orbital Project in AY17/18 as our first step into web development.</p>
              <p>
                <a href="https://github.com/linnnruoo/Orbital-2018-wripple"><i className="fa fa-github" style={{fontSize:"48px"}}></i></a>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomeContent;
