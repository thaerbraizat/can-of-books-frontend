import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../BestBooks.css';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

class MyFavoriteBooks extends React.Component {
  constructor() {
    super();
    this.state = {
      listBooks: [],
      email: ''
    }
  }

  getUserInput = (e) => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value
    })
    console.log(this.state.email);
  }

  sendRequest = (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/book?email=${this.state.email}`;
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
          <input type='text' placeholder="email" onChange={this.getUserInput} />
          < button onClick={(e) => { this.sendRequest(e) }}>search by email</button>
        </from>
        {
          this.state.listBooks.map(book => {
            console.log(book.books);
            return book.books.map(item => {
              console.log(item.name);
              return <>
                <ListGroup horizontal={item} className="my-2" >
                  <ListGroup.Item variant="dark">name: {item.name}</ListGroup.Item>
                  <ListGroup.Item variant="dark">decription:{item.decription}</ListGroup.Item>
                  <ListGroup.Item variant="dark">status: {item.status}</ListGroup.Item>
                </ListGroup>
              </>
            })
          })
        }     
      </Jumbotron>
    )
  }
}
export default withAuth0(MyFavoriteBooks);