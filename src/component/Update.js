import React, { Component } from 'react'

export class Update extends Component {

    
  
    render() {
        return (

            <form onSubmit={(e) => this.update(e)}>
                <fieldset>
                    <legend>Update Form</legend>

                    <label>Name of the Book</label>
                    <input onChange={(e) => this.props.updateName(e)} type="text" />

                    <label>status</label>
                    <input onChange={(e) => this.props.updateStatus(e)} type="text" />

                    <label>description</label>
                    <input onChange={(e) => this.props.updateDisc(e)} type="text" />

                    <input type="submit" value="Update Book" />
                </fieldset>
            </form>
        )
        }
     }
export default Update;
