import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"

import { collection, addDoc, DocumentReference } from "firebase/firestore"
import { FirestoreContext } from "../../contexts/FirestoreContext"
import { useContext, useState } from "react"

export function AddBook(props) {
    const [ show, setShow ] = useState (false)
    const [ message, setMessage ] = useState('')

    let alertType = 'success'

    const db = useContext(FirestoreContext)

    const createBook = async (event) => {
        event.preventDefault()
        const fd = new FormData(event.target)
        const book = {
            Title: fd.get('Title'),
            Author: fd.get('Author'),
            Publisher: fd.get('Publisher'),
            Cover: fd.get('Cover'),
            Category: fd.get('Category'),
            Language: fd.get('Language'),
            Active: true
        }
        const ref = collection(db, "Books")
        const docRef = await addDoc(ref, book)
        if (docRef.id) {
            //console.log("successful")
            alertType = 'success'
            setMessage ('Adding book was successful')
            event.target.reset()
            setShow (true)
        }
        else {
            console.log("failed")
            alertType = 'danger'
            setMessage('Adding book failed')
            setShow (true)
        }
        setTimeout ( ()=> {setShow(false)}, 3000)
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form id="add-book-form" onSubmit={(evt) => createBook(evt)}>
                        <h2 className="mt-4">Add a Book</h2>
                        <Form.Group>
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control type="text" name="Title" placeholder="Book Title" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Author</Form.Label>
                            <Form.Control type="text" name="Author" placeholder="Book Author" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Publisher</Form.Label>
                            <Form.Control type="text" name="Publisher" placeholder="Book Publisher" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Cover Image</Form.Label>
                            <Form.Control type="text" name="Cover" placeholder="Filename of cover image" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Category</Form.Label>
                            <Form.Select name="Category" required>
                                <option>Selet Category</option>
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non-Fiction</option>
                                <option value="Reference">Reference</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Book Language</Form.Label>
                            <Form.Select name="Language">
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Simplified-Chinese">Simplified-Chinese</option>
                                <option value="Germany">Germany</option>
                                <option value="Russian">Russian</option>
                                <option value="Japanese">Japanese</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="mt-4 w-100">
                            Add Book
                        </Button>
                    </Form>
                    <Alert variant={alertType} show={show} className="my-4">
                        {message}
                    </Alert>
                </Col>
            </Row>
        </Container >
    )
}




