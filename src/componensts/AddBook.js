import React, { useState } from "react";
import { graphql, useMutation } from "react-apollo";
import { flowRight as compose } from "lodash";

//Queries
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

const AddBook = (props) => {

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");

    const [addBook] = useMutation(addBookMutation);

    const displayAuthors = () => {
        let data = props.getAuthorsQuery;
        if (data.loading) {
            return (<option>Loading authors...</option>)
        } else {
            return data.authors.map((author) => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        addBook({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    }

    return (
        <div>
            <form id="add-book" onSubmit={submitForm}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => setGenre(e.target.value)}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => setAuthorId(e.target.value)}>
                        <option>Select author</option>
                        {displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        </div>
    )
}

/* when you have to pass 2 queries */
export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
