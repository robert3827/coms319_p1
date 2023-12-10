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

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [pageState, setPageState] = useState({
        viewAll: true,
        form: false
    })

    const url = "http://localhost:8081/";

    const [products, setProducts] = useState([]);

    const [updateProduct, setUpdateProduct] = useState(false);

    const defaultProd = {
        id: 0,
        title: ""
        ,
        price: 0.0,
        description: ""
        ,
        category: ""
        ,
        image: url + "images/diglett.png",
        rating: 0.0
    }


    // new Product
    const [addNewProduct, setAddNewProduct] = useState(defaultProd);

    function setDefaultProduct() {
        setAddNewProduct(defaultProd);
    }


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

        const truncateText = (text, maxLength) => {
            return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
        };


        return (
            products.map((el) => (
                <Col sm={6} xs={8} md={4}>
                    <Card style={{ width: '18rem', height: '100%' }} fluid key={el.id} className="h-100">
                        <Card.Img variant="top" src={el.image} style={{ height: '200px', objectFit: 'cover' }} />
                        <Card.Body>
                            <Card.Title>{truncateText(el.title, 25)}</Card.Title>
                            <Card.Text>
                                Category:  {el.category} <br />
                                Price: $ {el.price} <br />
                                Rating: {el.rating.rate}
                            </Card.Text>
                            <Button variant="primary" className="mx-1" onClick={() => { handleDelete({ productId: el.id }) }}>Delete</Button>
                            {/* <Button variant="primary" className="mx-1" onClick={() => { handleUpdate({ product: el }) }}>Update</Button> */}
                            <NavLink className="btn btn-primary mx-1" to="/form" onClick={() => { handleUpdate({ product: el }) }}>Update</NavLink>
                        </Card.Body>
                    </Card>
                </Col>

            )
            ));
    }
    function handleUpdate(props) {
        console.log("Handle Update\n\n");
        console.log(props.product);
        props.product.rating = props.product.rating.rate;
        setAddNewProduct(props.product);
        setUpdateProduct(true);
    }

    function postUpdate(e){
        console.log("Attempting to update: \n" , addNewProduct);
        fetch(url + "updateProduct", {
                method : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addNewProduct)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Updated product\n");
                    console.log(data);
            });
        setUpdateProduct(false);
    }

    function handleDelete(props) {
        console.log("Delete Product: " + props._id);
        fetch(url+ "deleteProduct/" + props.productId, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({_id: props._id})
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("successfully deleted product" + props.productId);
                console.log(data);
            })
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
                    // alert(value);
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
            <Menubar setDefaultProduct={setDefaultProduct} getAllProducts={getAllProducts}/>
            <Container>
                <h3>Add a new product:</h3>
                <form>
                    <Row className="mb-3">
                        <Col>
                            <label htmlFor="id" className="form-label">ID:</label>
                            <input type="number" className="form-control border-dark" placeholder="ID" name="id" value={addNewProduct.id} onChange={handleChange} />
                        </Col>
                        <Col>
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input type="text" className="form-control border-dark" placeholder="Title" name="title" value={addNewProduct.title} onChange={handleChange} />
                        </Col>
                        <Col>
                            <label htmlFor="price" className="form-label">Price:</label>
                            <input type="number" className="form-control border-dark" placeholder="Price" name="price" value={addNewProduct.price} onChange={handleChange} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <label htmlFor="category" className="form-label">Category:</label>
                            <input type="text" className="form-control border-dark" placeholder="Category" name="category" value={addNewProduct.category} onChange={handleChange} />
                        </Col>
                        <Col>
                            <label htmlFor="rating" className="form-label">Rating:</label>
                            <input type="number" className="form-control border-dark" placeholder="Rating" name="rating" value={addNewProduct.rating} onChange={handleChange} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea className="form-control border-dark" placeholder="Description" name="description" value={addNewProduct.description} onChange={handleChange} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <label htmlFor="image" className="form-label">Image URL:</label>
                            <textarea className="form-control border-dark" placeholder="Image URL" name="image" value={addNewProduct.image} onChange={handleChange} />
                        </Col>
                    </Row>
                    {!updateProduct &&
                        <NavLink to="/" className="btn btn-primary" type="submit" onClick={postProduct}>
                            Submit
                        </NavLink>
                    }
                    {updateProduct &&
                        <NavLink to="/" className="btn btn-primary" type="submit" onClick={postUpdate}>
                            Submit
                        </NavLink>
                    }
                </form>
            </Container>
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