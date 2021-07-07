import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../BestBooks.css';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';



class MyFavoriteBooks extends React.Component {
  // componentDidMount = () => {
  //   if (this.props.auth0.isAuthenticated) {
  //     this.props.auth0.getIdTokenClaims().then(res => {
  //       let jwt = res.__raw;
  //       let config = {
  //         headers: {
  //           "Authorization": `Bearer  ${jwt}`
  //         },
  //         method: 'get',
  //         baseURL: process.env.REACT_APP_URL,
  //         url: '/test'

  //       }
  //       axios(config).then(response => {
  //         console.log(response.data);
  //       }).catch(err => { console.log(err); })
  //     }).catch(err=> console.log(err));
  //   }
  // }
  constructor() {
    super();
    this.state = {
      listBooks: [],
      email: ''
    }
  }
  // componentDidMount = () => {
  //   const url = 'http://localhost:3001/book?email=thaerbraizat13@gmail.com';
  //   axios.get(url).then(response => {
  //     this.setState({
  //       listBooks:response.data
  //     })
  //     // console.log(response.data);
  //   })
  // }

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
      // console.log(this.state.listBooks)
      // console.log(response.data.books[0].name);
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
             
                {/* <li> name: {item.name}</li>
                <li> decription:{item.decription}</li>
                <li>status: {item.status}</li> */}

              </>

            })
          })

        }
      </Jumbotron>

    )
  }
}

export default withAuth0(MyFavoriteBooks);

// thaerbraizat13@gmail.com
// 