import React from 'react';
import {withAuth0} from '@auth0/auth0-react';
import Header from './component/Header';
import IsLoadingAndError from './component/IsLoadingAndError';
import Footer from './component/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './component/Login';
import Profile from './component/Profile';
import BestBooks from './component/BestBooks';

class App extends React.Component {

  render() {
    console.log('app', this.props);
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {
                  this.props.auth0.isAuthenticated ?
                  <BestBooks /> : <Login />
                }
                
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              </Route>
              <Route path='/login'>
                    <Login />
              </Route>
              <Route path='/profile'>
                    <Profile />
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
