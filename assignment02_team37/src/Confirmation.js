/**
 * This JS file will be used for Form Validation
 */
import React, { useState, useEffect } from 'react';

const Confirm = () =>{
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const form = document.getElementById('checkout-form');
    const inputCard = document.getElementById('inputCard');
    const alertTrigger = document.getElementById('submit-btn');
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



    // var order = { 
    //     name: '',
    //     email: '',
    //     card: '' 
    // }

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


    function isNumeric (n) {
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
        


    let validate = function(){
        let val = true;
        let email = document.getElementById('inputEmail4')
        let name = document.getElementById('inputName')
        let card = document.getElementById('inputCard')
        
        if (!email.value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )){
            email.setAttribute("class", "form-control is-invalid");
            val = false;
        }
        else{
            email.setAttribute("class", "form-control is-valid");
            paymentInfo.email = email.value
        }

        if (name.value.length == 0)
        {
            name.setAttribute("class","form-control is-invalid")
            val = false
        }
        else{
            name.setAttribute("class", "form-control is-valid");
            paymentInfo.name = name.value
        }

        if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/))
        {
            card.setAttribute("class","form-control is-invalid")
            val = false
        }
        else{
            card.setAttribute("class", "form-control is-valid");
            paymentInfo.card = card.value
        }

        if (val){
            form.classList.add("collapse")

            for (const [key, value] of Object.entries(paymentInfo)) {
                summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` +'</li>'
            }
            summaryCard.classList.remove("collapse")
            alertPlaceholder.innerHTML = ""
            alert('<i class="bi-cart-check-fill"></i> You have made an order!', 'success')
        }
        return val;
    }

    return (
        <div>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous"></link>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
                crossorigin="anonymous"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"></link>

            <div class="container">

    <div class="row">
      <div class="col-2"></div>


      <div class="col-8">

        <h1>Javascript Form Validation</h1>

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


        <div class="card collapse">
          <div class="card-body">
            <h5 class="card-title">Order summary</h5>
            <p class="card-text">Here is a summary of your order.</p>
          </div>
          <ul class="list-group list-group-flush">

          </ul>
          <a href="" onclick="location.reload()" class="btn btn-secondary"> <i class="bi-arrow-left-circle"></i>
            Return</a>
        </div>


        <footer class="bd-footer py-4 py-md-5 mt-5 bg-light">
          <div class="container py-4 py-md-5 px-4 px-md-3">
            <div class="row">
              <div class="col-lg-12 mb-3">
                <b>SE/Com-S 319</b> Javascript form validation.
              </div>

            </div>
          </div>
        </footer>

      </div>

      <div class="col-2"></div>


    </div>
      </div>
    </div>
    );
}
export default Confirm;