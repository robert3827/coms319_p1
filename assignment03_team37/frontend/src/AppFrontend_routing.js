import { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, Link, NavLink } from "react-router-dom";


import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menubar from "./Menubar";


import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';





function App() {

    const url = "http://localhost:8081/"
    const [products, setProducts] = useState([]);


    // new Product
    const [addNewProduct, setAddNewProduct] = useState({
        "id": 0,
        "title": "",
        "price": 0.0,
        "description": "",
        "category": "",
        "image": "",
        "rating": 0.0,
    });


    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts() {
        fetch(url + "get")
            .then((response) => response.json())
            .then((data) => {
                console.log("Show Catalog of Products :");
                console.log(data);
                setProducts(data);
            });
    }

    function showAllProducts() {
        console.log("Showing Prodcuts");
        return (
            <>
                <Menubar />
                <Container>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {showAllItems()}
                    </Row>
                </Container>

            </>

        )
    }



    function showAllItems() {
        return (
            products.map((el) => (
                <Col sm={6} xs={8} md={4}>
                    <Card style={{ width: '18rem', height: '100%' }} fluid key={el.id} className="h-100">
                        <Card.Img variant="top" src={el.image} style={{ height: '200px', objectFit: 'cover' }} />
                        <Card.Body>
                            <Card.Title>{el.title}</Card.Title>
                            <Card.Text>
                                Category:  {el.category} <br />
                                Price: $ {el.price} <br />
                                Rating: {el.rating.rate}
                            </Card.Text>
                            <Button variant="primary" className="mx-1" onClick={() => { handleDelete({ productId: el.id }) }}>Delete</Button>
                            {/* <Button variant="primary" className="mx-1" onClick={() => { handleUpdate({ product: el }) }}>Update</Button> */}
                            <NavLink className="btn btn-primary mx-1" to="/form" onClick={() => {handleUpdate({product: el})}}>Update</NavLink>
                        </Card.Body>
                    </Card>
                </Col>

            )
            ));
    }
    function handleUpdate(props) {
        console.log("Handle Update");
        setAddNewProduct(props.product);
    }

    function handleDelete(props) {
        console.log("Delete Product: " + props.productId);
    }

    


    function postProduct(e) {
        e.preventDefault();
        console.log(e.target.value);
        fetch(url + "addProduct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addNewProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Post a new product completed");
                console.log(data);
                if (data) {
                    const value = Object.values(data);
                    alert(value);
                }
            });
    }

        function handleChange(evt) {
            const value = evt.target.value;
            if (evt.target.name === "id") {
                setAddNewProduct({ ...addNewProduct, id: value });
            } else if (evt.target.name === "title") {
                setAddNewProduct({ ...addNewProduct, title: value });
            } else if (evt.target.name === "price") {
                setAddNewProduct({ ...addNewProduct, price: value });
            } else if (evt.target.name === "description") {
                setAddNewProduct({ ...addNewProduct, description: value });
            } else if (evt.target.name === "category") {
                setAddNewProduct({ ...addNewProduct, category: value });
            } else if (evt.target.name === "image") {
                setAddNewProduct({ ...addNewProduct, image: value });
            } else if (evt.target.name === "rating") {
                setAddNewProduct({ ...addNewProduct, rating: value });
            }
        }

        function showForm() {


            return (
                <div>
                    <Menubar />
                    <div>
                        <h3>Add a new product :</h3>
                        <form action="">
                            ID: <input type="number" placeholder="id?" name="id" value={addNewProduct.id}
                                onChange={handleChange} />
                            Title: <input type="text" placeholder="title?" name="title" value={addNewProduct.title}
                                onChange={handleChange} />
                            Price: <input type="number" placeholder="price?" name="price" value={addNewProduct.price}
                                onChange={handleChange} />
                            <br /><br />
                            Description: <textarea type="text" placeholder="description?" name="description" value={addNewProduct.description}
                                onChange={handleChange} />
                            Category: <input type="text" placeholder="category?" name="category" value={addNewProduct.category}
                                onChange={handleChange} />
                            Image URL: <textarea type="text" placeholder="image?" name="image" value={addNewProduct.image}
                                onChange={handleChange} />

                            <br /><br />
                            {/* Image: <input type="file" class="form-control-file" id="exampleFormControlFile1" /> */}
                            Rating: <input type="number" placeholder="rate?" name="rating" value={addNewProduct.rating}
                                onChange={handleChange} />
                            <button type="submit" onClick={postProduct}>
                                submit
                            </button>
                        </form>


                    </div>
                </div>
            )
        }





        return (
            <>

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<div>{showAllProducts()}</div>} />
                        <Route path="/form" element={<div>{showForm({})}</div>} />
                    </Routes>
                </BrowserRouter>
            </>

        ); // return end
    } // App end
    export default App;