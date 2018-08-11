import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';

import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearProfile } from './actions/profileActions';

import Nav from './components/Nav';
import Home from './components/home/Home';
import Contact from './components/contact/Contact';
import Footer from './components/Footer';
import Signup from './components/auth/Signup';
import VerifyEmail from './components/auth/VerificationEmail';
import LoginForm from './components/auth/LoginForm';
import Profiles from './components/profiles/Profiles';
import NewProject from './components/projects/NewProject';
import MyProfile from './components/profiles/MyProfile';
import AboutUs from './components/AboutUs';
import ProjectDetail from './components/projects/ProjectDetail';
import MyDashboard from './components/dashboard/MyDashboard';
import EditProject from './components/projects/EditProject';
import Review from './components/review/Review';
import Search from './components/projects/Search';

import './App.css';
import './components/css/loading.css';


// check for token on every page
if(localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decord token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    //Logout User
    store.dispatch(logoutUser());
    //TODO: Clear current profile
    store.dispatch(clearProfile());
    //Redirect to Login page
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>   
        <Router>  
          <div className="App">  
            <Nav />
            
            <div className="children">
              <Route exact path="/" component={ Home } />
              <Route exact path="/contact" component={ Contact } />
              <Route exact path='/about' component={ AboutUs }/>
              <Route exact path="/signup" component={ Signup } />
              <Route exact path="/verifyemail" component={ VerifyEmail } />
              <Route exact path="/login" component={ LoginForm } />
              <Route exact path="/project_detail/:projectId" component={ ProjectDetail }/>
              <Route exact path="/profiles/:userId" component={ Profiles }/>
              <Route exact path="/search" component={ Search }/>
              <Switch>
                <PrivateRoute exact path="/createnewproject" component={ NewProject } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/myprofile" component={ MyProfile }/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/my_dashboard" component={ MyDashboard }/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit_project/:projectId" component={ EditProject }/>
              </Switch>
              <Switch>
                <PrivateRoute exact path="/review/:projectId" component={ Review }/>
              </Switch>
            </div>
            
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;