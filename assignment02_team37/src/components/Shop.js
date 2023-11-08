import React, { useState, useEffect } from "react";
import logo from '../logo.svg'
import { Categories } from "../Categories";
import { Products } from "../Products";


const Shop = () => {

    var prodQuanArr = [];
    for (let i = 0; i < Products.length + 1; i++) {
        prodQuanArr.push(0);

    };
    const [cart, setCart] = useState([]);                                //Starts with an empty array of products
    var [quantity, setQuantity] = useState(prodQuanArr);               //Array parallel to products. Should start off with all zeros
    const [cartTotal, setCartTotal] = useState(0);                       //Total Cost starting at 0
    const [ProductsCategory, setProductsCategory] = useState(Products);
    var [transaction, setTransaction] = useState(0);


    //Constants for Confirmation
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const form = document.getElementById('checkout-form');
    const inputCard = document.getElementById('inputCard');
    const summaryCard = document.querySelector('.card');
    const summaryList = document.querySelector('.card > ul');
    const [paymentInfo, setPaymentInfo] = useState({
        name: '',
        email: '',
        card: '',
        address: '',
        city: '',
        state: '',
        zip: 0
    });

    var [pageState, setPageState] = useState(
        [{
            catalog: true,
            cart: false,
            confirmation: false,
        }]
    )

    var cartPage = true;

    useEffect(() => {
        console.log("PageState Catalog: " + pageState.catalog);
        console.log("PageState Cart: " + pageState.cart);
        console.log("PageState Confirmation: " + pageState.confirmation);
    }, [pageState])

    function handleGoToCart() {

        setPageState(
            pageState = {
                catalog: false,
                cart: true,
                confirmation: false,
            }
        );
    }
    function handleGoToCatalog() {
        setPageState(
            pageState = {
                catalog: true,
                cart: false,
                confirmation: false,
            }
        );
    }
    function handleGoToConfirmation() {

        setPageState(
            pageState = {
                catalog: false,
                cart: false,
                confirmation: true,
            }
        );
    }



    const addToCart = (el) => {
        var id = el.id;
        setTransaction(transaction += 1);
        quantity[id] += 1;
        console.log("el.id: " + id);
        if (cart.includes(el)) {
            //don't add it again
            // setQuantity(quantity);
        } else {
            setCart([...cart, el]);         // ... means whatever is inside the cart + el    --- i.e. +=
        }
    };

    useEffect(() => {
        console.log("Transaction: " + transaction);
        setQuantity(quantity);
        setCart(cart);
        total();
    }, [transaction]);


    useEffect(() => {
        console.log("Quantity" + quantity);
    }, [quantity]);

    const removeFromCart = (el) => {
        let id = el.id;
        setTransaction(transaction += 1);

        if (quantity[id] > 1) {
            quantity[id] -= 1;
        } else if (quantity[id] == 1) {
            quantity[id] -= 1;
            let hardCopy = [...cart];
            hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
            setCart(hardCopy);
        } else if (quantity[id] == 0) {
            let hardCopy = [...cart];
            hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
            setCart(hardCopy);

        }




    };

    const listItems = ProductsCategory.map((el) => (
        <div>
            <div key={el.id} className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none" style={{ minHeight: '500px' }}>
                <img className=
                    "object-cover h-40" alt={el.title} src={el.image} /> <br />
                <strong> {el.title}</strong> <br />
                {el.category} <br />
                ${el.price} <br />
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-1" onClick={() => removeFromCart(el)}>-</button>{" "}
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-1" variant="light" onClick={() => addToCart(el)}> + </button>
                <p>Quantity: {quantity[el.id]}</p>
            </div>

        </div>

    ));

    const cartItems = cart.map((el) => (
        <div>
            <div key={el.id} className="bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none" style={{ minHeight: '500px' }}>
                <img className=
                    "object-cover h-40" alt={el.title} src={el.image} /> <br />
                {el.title} <br />
                {el.category} <br />
                ${el.price} <br />
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-1" onClick={() => removeFromCart(el)}>-</button>{" "}
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-1" variant="light" onClick={() => addToCart(el)}> + </button>
                <p>Quantity: {quantity[el.id]}</p>
            </div>
        </div>
    ));

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price * quantity[cart[i].id];
        }
        setCartTotal(totalVal);
    };




    function handleClick(tag) {
        let filtered = Products.filter(cat => cat.category === tag);
        // modify useState
        setProductsCategory(filtered);
        // ProductsCategory = filtered;
    }
    const [query, setQuery] = useState('');



    const handleChange = (e) => {
        setQuery(e.target.value);
        // console.log(e.target.value);
        const results = Products.filter(eachProduct => {
            if (e.target.value === "") {
                console.log("No Entry")
                return ProductsCategory;
            } else {
                return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase());
            }
        });
        setProductsCategory(results);
    }

    //Functions used for Confirmation 
    const displayPayment = (() => (
        <div>
            <div id="liveAlertPlaceholder"></div>

            <form class="row g-3" id="checkout-form">

                {/* <!-- Name --> */}
                <div class="col-md-6">
                    <label for="inputName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="inputName"></input>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Must be like, "John Doe"
                    </div>
                </div>

                {/* <!-- Email --> */}
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail4"></input>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Must be like, "abc@xyz.efg"
                    </div>
                </div>

                {/* <!-- Credit card --> */}
                <div class="col-12">
                    <label for="inputCard" class="form-label">Card</label>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i class="bi-credit-card-fill"></i></span>
                        <input type="text" id="inputCard" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                            aria-label="Username" aria-describedby="basic-addon1"></input>
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                        <div class="invalid-feedback">
                            Must be like, "7777-7777-7777-7777"
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <label for="inputAddress" class="form-label">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"></input>
                </div>
                <div class="col-12">
                    <label for="inputAddress2" class="form-label">Address 2</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">City</label>
                    <input type="text" class="form-control" id="inputCity"></input>
                </div>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">State</label>
                    <select id="inputState" class="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label for="inputZip" class="form-label">Zip</label>
                    <input type="text" class="form-control" id="inputZip"></input>
                </div>
                <div class="col-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck"></input>
                        <label class="form-check-label" for="gridCheck">
                            Check me out
                        </label>
                    </div>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-success" onClick={(event) => {
                        if (!validate()) {
                            const alertPlaceholder = document.getElementById(
                                "liveAlertPlaceholder"
                            );
                            alertPlaceholder.innerHTML = "";
                            alert("Something went wrong!");
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    }}> <i class="bi-bag-check"></i> Order</button>
                </div>
            </form>
        </div>
    ));


    const alert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            ` <div>${message}</div>`,
            ' <button type="button" class="btn-close" data-bs-dismiss="alert" arialabel="Close"></button>',
            '</div>'
        ].join('')
        alertPlaceholder.append(wrapper)
    }


    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    }

    // inputCard.addEventListener('input', event => {
    //     if (!inputCard.value) {
    //         return event.preventDefault() // stops modal from being shown
    //     } 
    //     else {
    //         inputCard.value = inputCard.value.replace(/-/g, '')
    //         let newVal = ''
    //         for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
    //             if(i===16){
    //                 break;
    //             }
    //             if (nums != 0 && nums % 4 == 0) {
    //                 newVal += '-'
    //             }
    //             newVal += inputCard.value[i]
    //             if (isNumeric(inputCard.value[i])) {
    //             nums++
    //             }
    //         }
    //         inputCard.value = newVal
    //     }
    // })

    // form.addEventListener('submit', event => {
    //     //if (!form.checkValidity()) {
    //     if (!validate()) {
    //         alertPlaceholder.innerHTML = ''
    //         alert('<i class="bi-exclamation-circle"></i> Something went wrong!','danger')
    //     }
    //     event.preventDefault()
    //     event.stopPropagation()
    //     //form.classList.add('was-validated')
    //     }, false )

    function newPayment() {
        console.log("New Payment Called");
        return (
            <div> 
                Payment
                {displayPayment}
            </div>
        )
    }



    let validate = function () {
        let val = true;
        let email = document.getElementById('inputEmail4')
        let name = document.getElementById('inputName')
        let card = document.getElementById('inputCard')

        if (!email.value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            email.setAttribute("class", "form-control is-invalid");
            val = false;
        }
        else {
            email.setAttribute("class", "form-control is-valid");
            paymentInfo.email = email.value
        }

        if (name.value.length == 0) {
            name.setAttribute("class", "form-control is-invalid")
            val = false
        }
        else {
            name.setAttribute("class", "form-control is-valid");
            paymentInfo.name = name.value
        }

        if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
            card.setAttribute("class", "form-control is-invalid")
            val = false
        }
        else {
            card.setAttribute("class", "form-control is-valid");
            paymentInfo.card = card.value
        }

        if (val) {
            form.classList.add("collapse")

            for (const [key, value] of Object.entries(paymentInfo)) {
                summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` + '</li>'
            }
            summaryCard.classList.remove("collapse")
            alertPlaceholder.innerHTML = ""
            alert('<i class="bi-cart-check-fill"></i> You have made an order!', 'success')
        }
        return val;
    }

    return (
        <div>
            <div>
                <div className="px-6 py-4">
                    <h1 className="text-3xl mb-2 font-bold"> Product Catalog App </h1>
                </div>
            </div>
            <div className="flex fixed flex-row">

                {/* Side Bar */}
                <div className="h-screen  bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '20%' }}>
                    <img className="w-full" src={logo} alt="React Logo" />
                    <div className="px-6 py-4">
                        <h1 className="text-3xl mb-2 font-bold text-white"> Product Catalog App </h1>
                        <p className="text-gray-700 text-white">
                            by - <b style={{ color: 'orange' }}>Design Shubham, Development Abraham</b>
                        </p>
                        <div className="py-10">
                            {(Categories) ? <p className='text-white'>Tags : </p> : ''}
                            {
                                Categories.map(tag => <button onClick={() => { handleClick(tag) }} key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2" >{tag}</button>)
                            }
                        </div>

                        <div className="py-10">
                            <input type="search" value={query} onChange={handleChange} />

                        </div>

                    </div>
                </div>

                {/* Container with a button to go to cart */}

                {pageState.catalog &&
                    <div>
                        <div className="text-3xl">Catalog:</div>
                        <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{ maxHeight: '800px', overflowY: 'scroll' }}>
                            {listItems}
                        </div>
                    </div>
                }


                {pageState.cart &&
                    <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{ maxHeight: '800px', overflowY: 'scroll' }}>
                        <div className="text-3xl">Cart:</div>
                        <br />
                        <div>{cartItems} </div>
                    </div>
                }
                {pageState.confirmation &&
                    <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10">
                        {displayPayment}
                    </div>
                }


                {1 &&
                    <div className="h-screen p-3 xl:basis-1/5" style={{ minWidth: '8%' }}>
                        <h2>
                            Total: ${cartTotal}
                        </h2>
                        <br />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1" onClick={handleGoToCart}>Cart</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1" onClick={handleGoToCatalog}>Catalog</button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1" onClick={handleGoToConfirmation}>Confirm Order</button>

                    </div>}



            </div>
        </div>
    );


}; export default Shop;