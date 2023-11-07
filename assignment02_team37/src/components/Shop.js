import React, { useState, useEffect } from "react";
import items from '../selected_products.json'
import logo from '../logo.svg'
import { Categories } from "../Categories";
import { Products } from "../Products";


const Shop = () => {
    
    var prodQuanArr = [];
    for(let i=0;i<Products.length;i++) {
        prodQuanArr.push(0);
    }
;    
    const [cart, setCart] = useState([]);                                //Starts with an empty array of products
    var [quantity, setQuantity] = useState(prodQuanArr);               //Array parallel to products. Should start off with all zeros
    const [cartTotal, setCartTotal] = useState(0);                       //Total Cost starting at 0
    const [ProductsCategory, setProductsCategory] = useState(Products);
    var [transaction, setTransaction] = useState(0);                                     //Current elID


    var [pageState, setPageState] = useState(
        [{
            catalog: true,
            cart: false,
            confirmation: false,
        }]
    )

    function handleOrderNow() {
        pageState = {
            catalog: false,
            cart: true,
            confirmation: false,
        }
    }

    const addToCart = (el) => {
        var id = el.id;
        setTransaction(transaction+=1);
        quantity[id]+=1;
        console.log("el.id: " + id);
        if(cart.includes(el)) {
            //don't add it again
            // setQuantity(quantity);
        } else {
            setCart([...cart, el]);         // ... means whatever is inside the cart + el    --- i.e. +=
        } 
    };

    useEffect(()=>{
        console.log("Transaction: " + transaction);
        setQuantity(quantity);
    }, [transaction]);


    useEffect(() => {
        console.log("Quantity" + quantity);
      }, [quantity]);

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
    };

    const listItems = Products.map((el) => (
        <div>
            <div key={el.id} className="  bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none" style={{ minHeight: '500px' }}>
                <img className=
                    "img-fluid" alt={el.title} src={el.image} width={150} maxHeight={100} /> <br />
                <strong> {el.title}</strong> <br />
                {el.category} <br />
                ${el.price} <br />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1" onClick={() => removeFromCart(el)}>-</button>{" "}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1" variant="light" onClick={() => addToCart(el)}> + </button>
                <p>Quantity: {quantity[el.id]}</p>
            </div>

        </div>

    ));

    const cartItems = cart.map((el) => (

        <div key={el.id} className="  bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none" style={{ minHeight: '450px' }}>
            <img className=
                "img-fluid" alt={el.title} src={el.image} width={150} height={100} /> <br />
            {el.title} <br />
            {el.category} <br />
            ${el.price} <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1" onClick={() => removeFromCart(el)}>-</button>{" "}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1" variant="light" onClick={() => addToCart(el)}> + </button>
            {/* <p>Quantity: {quantity[el.id]}</p> */}
        </div>
    ));






    useEffect(() => {
        total();
    }, [cart]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
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


                {/* Container holding the catalog "Inside the scrollable bar" */}
                <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{ maxHeight: '800px', overflowY: 'scroll' }}>
                    {listItems}
                </div>


                {/* Make this a second column */}
                <div className="h-screen p-3 xl:basis-1/5" style={{ minWidth: '20%', overflowY: 'scroll' }}>
                    <div >Items in Cart :</div>
                    <div>{cartItems} </div>


                </div>

                <div className="h-screen p-3 xl:basis-1/5" style={{ minWidth: '8%' }}>
                    <h2>
                        Total: ${cartTotal}
                    </h2>
                    <br />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1" onClick={handleOrderNow}>Order Now</button>

                </div>


            </div>
        </div>
    );


}; export default Shop;