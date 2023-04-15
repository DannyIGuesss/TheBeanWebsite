import React, { useEffect, useState } from 'react'
import "../cssFiles/navBar.css"
import "../cssFiles/profile.css"
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'

const Profile = (props) => {

    const navigate = useNavigate()

    const [ordersFromCustomer, setOrdersFromCustomer] = useState([])

    //WHEN WE LOGOUT
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const deleteOrder = () => {
        axios.delete('http://localhost:8000/api/deleteOrder')
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //get all the order that the customer has made
    useEffect(() => {
        axios.get('http://localhost:8000/api/get', {withCredentials:true})
            .then(res => {
                // console.log(res.data);
                setOrdersFromCustomer(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },[])

    return (
        <div className='parent-container'>
            <nav className='d-flex align-items-center justify-content-around'>
                <h1>El Frjolito Restaurant</h1>
                <div>
                <button><Link to={'/loggedMainPage'}>Menu</Link></button>
                <button><Link to={'/cart'}>Cart</Link></button>
                <button onClick={logout}>Logout</button>
                </div>
            </nav>
            <div className='main-body'>
                <h2 className='text-center'>Previous Item Orders</h2>
                {
                    ordersFromCustomer.map((order, index) =>{

                        const items = order.orderItems.map((itemOrder, indexTwo) => {
                            // console.log(itemOrder);
                            return (
                                <div key={indexTwo} className='orderItems'>
                                <h3> {itemOrder.meat} {itemOrder.name} with {itemOrder.toppings.map((topping,index) =>{
                                    return(<span key={index}>{topping} </span>)
                                    })} 
                                </h3>
                                <button className='delete-btn' onClick={deleteOrder}>Delete</button>
                                </div>
                            )
                        })
                        return (
                            <div key={index}>
                                <h1>{items}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile