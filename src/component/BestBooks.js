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
      email: '',
      name: '',
      description: '',
      status: '',
      showUpdate: false,
      index: 0,
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
    const url = `${process.env.REACT_APP_SERVER_URL}/user?email=${this.state.email}`;
    axios.get(url).then(response => {
      this.setState({
        listBooks: response.data
      })
      console.log(response.data);
    })
  }

  updateName = (e) => this.setState({ name: e.target.value });
  updateDisc = (e) => this.setState({ description: e.target.value });
  updateStatus = (e) => this.setState({ status: e.target.value });

  addBook = async (e) => {
    e.preventDefault();
    const bodyData = {
      bookName: this.state.name,
      bookDescription: this.state.description,
      bookStatus: this.state.status,
      email: this.props.auth0.user.email,
    };
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/book`, bodyData).then((res) => {
      this.setState({
        book: res.data.books,
      });
    });
  };

  deleteBook = async (index) => {
    const query = {
      email: this.props.auth0.user.email,
    };
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/book/${this.state.book[index]._id}`, { params: query })
      .then((res) => {
        this.setState({
          book: res.data.books,
        });
      });
  };
  bookName;

  showUpdateForm = (idx) => {
    this.setState({
      index: idx,
      showUpdate: !this.state.showUpdate,
    });
  };

  update = async (e) => {
    e.preventDefault();
    const reqBody = {
      bookName: this.state.name,
      bookStatus: this.state.status,
      bookDescription: this.state.description,
      email: this.props.auth0.user.email,
    };
    console.log(reqBody);
    await axios.put(`${process.env.REACT_APP_SERVER_URL}/book/${this.state.index}`, reqBody).then((res) => {
      this.setState({
        book: res.data.books,
      });
    });
  };

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        <form onSubmit={(e) => this.addBook(e)}>
          <label>Name of the Book</label>
          <input onChange={this.updateName} type="text" />

          <label>Description of the Book</label>
          <input onChange={this.updateDisc} type="text" />

          <label>Status of the Book</label>
          <input onChange={this.updateStatus} type="text" />

          <input type="submit" value="Add New Book" />
        </form>


        {this.state.showUpdate && (
          <form onSubmit={(e) => this.update(e)}>
          <fieldset>
            <legend>Update Form</legend>

            <label>Name of the Book</label>
            <input onChange={(e) => this.updateName(e)} type="text" />

            <label>status</label>
            <input onChange={(e) => this.updateStatus(e)} type="text" />

            <label>description</label>
            <input onChange={(e) => this.updateDisc(e)} type="text" />

            <input type="submit" value="Update Book" />
          </fieldset>
        </form>
        )}

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