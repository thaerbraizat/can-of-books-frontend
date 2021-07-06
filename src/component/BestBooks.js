import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../BestBooks.css';
import axios from 'axios';


class MyFavoriteBooks extends React.Component {
  componentDidMount = () => {
    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims().then(res => {
        let jwt = res.__raw;
        let config = {
          headers: {
            "Authorization": `Bearer  ${jwt}`
          },
          method: 'get',
          baseURL: process.env.REACT_APP_URL,
          url: '/test'

        }
        axios(config).then(response => {
          console.log(response.data);
        }).catch(err => { console.log(err); })
      }).catch(err=> console.log(err));
    }

  }
  constructor(props) {
    super(props);
    this.state = {
      listBooks: [],
      email: ''
    }
  }

  getUserInput = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  sendRequest = (e) => {
    e.preventDefault();
    const url = 'http://localhost:8000/book?email=nedal.r.alashqar@gmail.com';
    axios.get(url).then(response => {
      this.setState({
        listBooks: response.data
      })
      console.log(response.data);
    })
  }
  render() {
    return (
      <Jumbotron>
     
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          <from>
            <input type='text' placeholder="search by email ..." onChange={(e) => { this.getUserInput }} />
            < button onClick={(e) => { this.sendRequest }}>search by email</button>
          </from>
          <h2>{this.state.name}</h2>
      </Jumbotron>
    )
  }
}



export default withAuth0(MyFavoriteBooks);
