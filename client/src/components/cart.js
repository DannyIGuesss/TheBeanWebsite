import React, {useContext, useState} from 'react'
import { OrderContext } from '../context/orderContext' 
import { ItemContext } from '../context/itemContext'
import { CustomerContext } from '../context/customerContext'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios'
import "../cssFiles/navBar.css"
import "../cssFiles/cart.css"

const Cart = (props) => {
    const navigate = useNavigate()

    const {customerId, setCustomerId} = useContext(CustomerContext)

    // this is the items in the order
    const {orderItem, setOrderItem} = useContext(ItemContext)

    const {allItemsInOrder, setAllItemsInOrder} = useContext(OrderContext)

    let total = 0

    //WHEN WE LOGOUT
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const checkoutHandler = (e) => {
        e.preventDefault();
        console.log(customerId);
        const placeOrder = {
            customer_id: customerId,
            orderItems: allItemsInOrder
        }
        console.log(placeOrder);

        axios.post('http://localhost:8000/api/createOrder', placeOrder, {withCredentials: true})
            .then(res => {
        
                console.log('response when created',res);
                setAllItemsInOrder([])
                navigate('/loggedMainPage')
            })
            .catch(err => {
                console.log(err);
            })





    }

    return(
        <div className='text-center parent-container'>
            <nav className='d-flex align-items-center justify-content-around'>
                <h1>El Frjolito Restaurant</h1>
                <div>
                    <button><Link to='/loggedMainPage'>Back</Link></button>
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>
            <div className='whole-body'>
                <div className='left-side '>
                    {allItemsInOrder.map((item, index) => {
                        return (
                            <div className='orderItem' key={index}>
                                <h3>{item.name}</h3>
                                <p>Meat Choice: {item.meat}</p>
                                <div className='toppings'>
                                    <p >Toppings:</p>
                                    <ul>
                                        {item.toppings.map((topping, index) => {
                                            return (
                                                <li key={index}>{topping}</li> 
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                    {console.log(allItemsInOrder)}
                    <button onClick={checkoutHandler}>Checkout</button>
                </div>
                <div className='right-side'>
                    <h2>Total</h2>
                    {allItemsInOrder.map((item) => {
                        total += item.price
                        return (
                            <></>
                        )
                    })}
                    <h3 className='total'>${total}</h3>
                </div>
            </div>
        </div>
    )
}

export default Cart