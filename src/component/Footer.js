import React from 'react';
import {withAuth0} from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>&copy; Best Books</Navbar.Brand>
      </Navbar>
    );
  }
}

export default withAuth0(Footer);
