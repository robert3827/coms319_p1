/**
 * This JS file will be used for Form Validation
 */
import React, { useState, useEffect } from 'react';

const Confirm = () =>{
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const form = document.getElementById('checkout-form');
    const inputCard = document.querySelector('#inputCard');
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



    var order = { 
        name: '',
        email: '',
        card: '' 
    }

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
        
    inputCard.addEventListener('input', event => {
        if (!inputCard.value) {
            return event.preventDefault() // stops modal from being shown
        } 
        else {
            inputCard.value = inputCard.value.replace(/-/g, '')
            let newVal = ''
            for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
                if(i===16){
                    break;
                }
                if (nums != 0 && nums % 4 == 0) {
                    newVal += '-'
                }
                newVal += inputCard.value[i]
                if (isNumeric(inputCard.value[i])) {
                nums++
                }
            }
            inputCard.value = newVal
        }
    })

    form.addEventListener('submit', event => {
        //if (!form.checkValidity()) {
        if (!validate()) {
            alertPlaceholder.innerHTML = ''
            alert('<i class="bi-exclamation-circle"></i> Something went wrong!','danger')
        }
        event.preventDefault()
        event.stopPropagation()
        //form.classList.add('was-validated')
        }, false )
        


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
        <div>
          <h1>
            Confirmation
          </h1>
          <div className="row">
            <div className="square">
              <h2>Payment Info:</h2>
              <h5 className='boldText'>Name:</h5>
              <p className='indent'> {paymentInfo.name}</p>
              <h5 className='boldText'>Email:</h5>
              <p className='indent'> {paymentInfo.email}</p>
              <h5 className='boldText'>Card:</h5>
              <p className='indent'> {paymentInfo.card}</p>
              <h5 className='boldText'>Address:</h5>
              <p className='indent'> {paymentInfo.address}</p>
              <h5 className='boldText'>City:</h5>
              <p className='indent'> {paymentInfo.city}</p>
              <h5 className='boldText'>State:</h5>
              <p className='indent'> {paymentInfo.state}</p>
              <h5 className='boldText'>Zip:</h5>
              <p className='indent'> {paymentInfo.zip}</p>
            </div>
          </div>
        </div>
        {/* <div className='text-center'>
          <button type='button' className='btn btn-danger m-2' onClick={e => { setCart([]); changePage("Browse"); }}>Cancel</button>
          <button type='button' className='btn btn-danger m-2' onClick={e => { alert("Thank you for your order!"); setCart([]); changePage("Browse"); }}>Confirm</button>
        </div> */}
      </div>
    );
}
export default Confirm;