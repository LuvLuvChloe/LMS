import { useContext, useState, useEffect } from "react"
import { FirestoreContext } from "../contexts/FirestoreContext"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import {Link} from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore"

export function Home(props) {
    const [bookdata, setBookData] = useState([])
    let booksLoaded = false

    const db = useContext(FirestoreContext)

    const getBooks = async () => {
        const booksCollection = collection(db, "Books")
        const result = await getDocs(booksCollection)
        let booksArray = []
        result.forEach((doc) => {
            let book = doc.data()
            book.id = doc.id
            booksArray.push(book)

        })
        setBookData(booksArray)
        console.log(booksArray)
    }

    useEffect(() => {
        if (booksLoaded == false) {
            getBooks()
            booksLoaded = true
        }
    }, [booksLoaded])

    // map each book to a component
    const Books = bookdata.map((book, key) => {
        return (
            <Col md={3} key={key}>
                <Card>
                    <Card.Img 
                    variant="top" 
                    src={"/book_covers/" + book.Cover}
                    style={{maxWidth:"100%"}}
                    className="book-cover"
                    />
                    <Card.Body>
                        <Card.Title>{ book.Title }</Card.Title>
                        <Card.Text>
                            A book by { book.Author }
                        </Card.Text>
                        <Button as={Link} variant="primary" className="w-100" to={"/detail/" + book.id}>
                            View Detail
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    })

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Library System</h1>
                </Col>
            </Row>
            <Row>
                {/* books here */}
                { Books }
            </Row>
        </Container>

    )
}