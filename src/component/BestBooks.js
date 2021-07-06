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
//   constructor(){
//     super();
//     this.state={
//       listBooks :[],
//       email :''
//     }
//   }
// componentDidMount=()=>{
//   const url='http://localhost:8000/book?email=thaerbraizat13@gmail.com';
//   axios.get(url).then(response=>{
//     this.setState({
//       listBooks : response.data
//     })
//     console.log(response.data);
//   })
// }

// getUserInput=(e)=>{
//   this.setState({
//     email:e.target.value
//   })

// }

// sendRequest=(e)=>{
//   e.preventDefault();
//   const url='http://localhost:8000/book?email=thaerbraizat13@gmail.com';
//   axios.get(url).then(response=>{
//     this.setState({
//       listBooks : response.data
//     })
//     console.log(response.data);
//   })
// }

  render() {
    return (
      // <ol>
      // {
      //   this.state.listBooks.map(book => {
      //   return <li>{book.name}</li>
      //   })
      // }
      // <ol/>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {/* <from>
          <input type='text' placeholder="email" onChange={(e)=>{this.getUserInput}}/>
           < button onClick ={(e)=>{this.sendRequest}}>search by email</button>
          </from> */}
      </Jumbotron>
      
    )
  }
}

export default withAuth0(MyFavoriteBooks);
