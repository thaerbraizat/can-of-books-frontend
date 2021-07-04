import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import '../Header.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand> 
        {
              this.props.auth0.isAuthenticated ?
                <>
                  
                  <Link to="/">Home</Link>
                 
                    <Link to="/profile">Profile</Link>
                    <Link to="/LogoutButton">LogOut</Link>
                  
                </> :
                  <Link to="/login">Login</Link>
                
            }
        {/* <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/Login">Login</Link> */}
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
      </Navbar>
    );
  }
}

export default withAuth0(Header);
