import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

const AddBook = (props) => {

    const displayAuthors = () => {
        let data = props.data;
        if (data.loading) {
            return (<option>Loading authors...</option>)
        } else {
            return data.authors.map((author) => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    return (
        <div>
            <form id="add-book">
                <div className="field">
                    <label>Book name:</label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select author</option>
                        {displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        </div>
    )
}

export default graphql(getAuthorsQuery)(AddBook);
