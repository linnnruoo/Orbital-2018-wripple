import React, { Component } from 'react';

const styles = {
  container: {
    paddingTop: '84px'
  },
  card: {
    padding: '32px'
  }
}

class AboutUs extends Component {
  render() {
    return (
      <div className="container" style={styles.container}>
        <div className="card shadow" style={styles.card}>
          <h1>About Us</h1>
          <p>Hi,<br/>
          Thank you for visiting our website! We are Kevin and Lin Ruo, current Year 2 computing students from National University of Singapore. This website, wripple, was created under NUS Orbital Project in AY17/18 as our first step into web development.
          </p>
          <p>
          You may leave any feedback regarding this platform at the Contact Us page. Your feedback is highly appreciated and valuable in making this platform a better place for coordinators :)
          </p>
          <p>We would like to thank our advisor, Kyle Chu, for giving us support throughtout the summer and the School of Computing for giving us this opportunity to explore website application development. We would also like to thank Sean for giving us this idea to work on and Trix for designing the logo for us. Also, we are very grateful for the feedback from our friends. Of course, we would like to thank YOU for checking this out!
          </p>
          <p>
          Yours Sincerely,<br/>
          The D4rk Knights (Kevin & Lin Ruo)
          </p>
        </div>
      </div>
    )
  }
}

export default AboutUs;