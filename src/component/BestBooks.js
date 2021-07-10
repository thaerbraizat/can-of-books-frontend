import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../BestBooks.css';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import Update from './Update';

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
    const url = `${process.env.REACT_APP_SERVER_URL}user?email=${this.state.email}`;
    axios.get(url).then(response => {
      this.setState({
        listBooks: response.data
      })
      console.log(response.data);
    })
  }

  updateName = (e) => {
    this.setState({
       name: e.target.value 
      });
      console.log(this.state.name);
    }
  updateDisc = (e) => this.setState({ description: e.target.value });
  updateStatus = (e) => this.setState({ status: e.target.value });

  addBook = async (e) => {
    e.preventDefault();
    const bodyData = {
      email: this.state.email,
      book: {
        name: this.state.name,
        description: this.state.description,
        status: this.state.status
      }
    };
    await axios.post(`${process.env.REACT_APP_SERVER_URL}book`, bodyData).then((res) => {
      this.setState({
        book: res.data.books,
      });
    });
  };

  deleteBook = async () => {
    const bodyData = {
      email: this.state.email,
      book: {
        name: this.state.name
      }

    };
    await axios
      .delete(`http://localhost:3001/book`, bodyData)
      .then((res) => {
        this.setState({
          book: res.data.books,

        });
        console.log(res.data.books);
      });
  };





  update = async (e) => {
    e.preventDefault();
    const reqBody = {
      email: this.state.email,
      "book" :{
     "name": this.state.name,
      }
      // bookStatus: this.state.status,
      // bookDescription: this.state.description,
   
    };
    console.log(reqBody);
    await axios.put(`http://localhost:3001/book/`, reqBody).then((res) => {
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
        {/* <form onSubmit={(e) => this.addBook(e)}>
          <label>Name of the Book</label>
          <input onChange={this.updateName} type="text" />

          <label>Description of the Book</label>
          <input onChange={this.updateDisc} type="text" />

          <label>Status of the Book</label>
          <input onChange={this.updateStatus} type="text" />

          <input type="submit" value="Add New Book" />
        </form> */}


        {this.state.showUpdate && (
          <form onSubmit={(e) => this.update(e)}>
          <fieldset>
            <legend>Update Form</legend>

            <label>Name of the Book</label>
            <input onChange={(e) => this.updateName(e)} type="text" placeholder="bookName"required />

            <label>status</label>
            <input onChange={(e) => this.updateStatus(e)} type="text"  placeholder={this.state.status}required/>

            <label>description</label>
            <input onChange={(e) => this.updateDisc(e)} type="text" placeholder={this.state.description} required/>

            <input type="submit" value="Update Book" />
          </fieldset>
        </form> 
        )}

        <from>
          <input type='text' placeholder="email" onChange={this.getUserInput} />
          < button onClick={(e) => { this.sendRequest(e) }}>search by email</button>
        </from>
        <form onSubmit={(e) => this.addBook(e)}>
          <label>Name of the Book</label>
          <input onChange={this.updateName} type="text" />

          <label>Description of the Book</label>
          <input onChange={this.updateDisc} type="text" />

          <label>Status of the Book</label>
          <input onChange={this.updateStatus} type="text" />

          <input type="submit" value="Add New Book" />
        </form>
    

        {
          this.state.listBooks.map(book => {
            console.log(book.books);
            return book.books.map(item => {
              console.log(item.name);
              return <>
        
                <ListGroup horizontal={item} className="my-2" >
                  <ListGroup.Item variant="dark">name: {item.name}</ListGroup.Item>
                  <ListGroup.Item variant="dark">decription:{item.description}</ListGroup.Item>
                  <ListGroup.Item variant="dark">status: {item.status}</ListGroup.Item>
                </ListGroup>
                <button onClick={this.deleteBook}>delete</button>
                <Update update={this.update} updateName={this.updateName}  updateDisc={this.updateDisc}
                  updateStatus={this.updateStatus}
                  />

              </>

            })

          })
        }
      </Jumbotron>
    )
  }
}
export default withAuth0(MyFavoriteBooks);



// / import React from 'react';
// import { withAuth0 } from '@auth0/auth0-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
// import '../BestBooks.css';
// import axios from 'axios';
// import { ListGroup, } from 'react-bootstrap';
// import Add from './Add ';
// import Delete from './Delete';
// import Update from './Update';




// class MyFavoriteBooks extends React.Component {
//   // componentDidMount = () => {
//   //   if (this.props.auth0.isAuthenticated) {
//   //     this.props.auth0.getIdTokenClaims().then(res => {
//   //       let jwt = res.__raw;
//   //       let config = {
//   //         headers: {
//   //           "Authorization": `Bearer  ${jwt}`
//   //         },
//   //         method: 'get',
//   //         baseURL: process.env.REACT_APP_URL,
//   //         url: '/test'

//   //       }
//   //       axios(config).then(response => {
//   //         console.log(response.data);
//   //       }).catch(err => { console.log(err); })
//   //     }).catch(err=> console.log(err));
//   //   }
//   // }
//   constructor() {
//     super();
//     this.state = {
//       listBooks: [],
//       email: '',
//       name: '',
//       description: '',
//       status: '',

//     }
//   }


//   getUserInput = (e) => {
//     console.log(e.target.value);
//     this.setState({
//       email: e.target.value
//     })

//     console.log(this.state.email);

//   }

//   sendRequest = (e) => {
//     e.preventDefault();
//     const url = `http://localhost:8000/user?email=${this.state.email}`;
//     axios.get(url).then(response => {
//       this.setState({
//         listBooks: response.data
//       })
//       // console.log(this.state.listBooks)
//       // console.log(response.data.books[0].name);
//     })
//   }





//   getName=(e)=>{
//     e.preventDefault();
//     this.setState({
//       name:e.target.value
//     })
//   }
//   getDescription=(e)=>{
//     console.log(e.target.value);
//     e.preventDefault();
//     this.setState({
//       deccription:e.target.value
//     })
//   }
//   getStatus=(e)=>{
//     e.preventDefault();
//     this.setState({
//       status:e.target.value
//     })
//   }




//   creatBook = async (e) => {
//     e.preventDefault();
//     const { user } = this.props.auth0;
//     const bookData = {
//       name: this.state.name,
//       description: this.state.description,
//       status: this.state.status,

//     }

//     const add = await axios.post(`${process.env.REACT_APP_URL}/create-book`, bookData);

//     this.setState({
//       listBooks: add.data
//     })
//   }


//   deleteBook = async (index) => {
//     const { user } = this.props.auth0;

//     const email = {
//       email: user.email
//     }
//     const deleteBookURL = await axios.delete(`${process.env.REACT_APP_URL}/delete-book/${Number(index)}`, { params: email });

//     this.setState({
//       listBooks: deleteBookURL.data,
//       index :index
//     })
//   }

//   updateBook = async (e,index) => {
//     e.preventDefault();
//     console.log(index);
//     const { user } = this.props.auth0;
//     const bookData = {
//       name: this.state.name,
//       description: this.state.description,
//       status: this.state.status,
//       email: user.email
//     }

//     const updateBookURL = await axios.put(`${process.env.REACT_APP_URL}/update-book/${index}`, bookData);

//     this.setState({
//       myBook: updateBookURL.data
//     })
//   }

//   render() {

//     return (

//       <Jumbotron>
//         <h1>My Favorite Books</h1>
//         <p>
//           This is a collection of my favorite books
//         </p>


//             <from>
//               <input type='text' placeholder="email" onChange={this.getUserInput} />
//               < button onClick={(e) => { this.sendRequest(e) }}>search by email</button>
//             </from>



//             {

//               this.state.listBooks.map(book => {
//                 console.log(book.books);
//                 return book.books.map(item => {
//                   console.log(item.name);
//                   return <>

//                     <ListGroup horizontal={item} className="my-2" >
//                       <ListGroup.Item variant="dark">name: {item.name}</ListGroup.Item>
//                       <ListGroup.Item variant="dark">decription:{item.decription}</ListGroup.Item>
//                       <ListGroup.Item variant="dark">status: {item.status}</ListGroup.Item>
//                     </ListGroup>

//                   <Update update={this.updateBook}
//                 getName={this.getName}
//                 getDescription={this.getDescription}
//                 getStatus={this.getStatus}
//                 updateBook={this.updateBook}

//                 bookName= {book.name}/>
//                   <Delete  
//                    deleteBook={this.deleteBook}
//                     // index={this.state.index}
//                     />

//                   </>

//                 })
//               })

//             }
//           </Jumbotron>

//         )
//         }
// }

//         export default withAuth0(MyFavoriteBooks);

// // thaerbraizat13@gmail.com
// // 