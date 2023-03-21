import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
import { OrderContext } from '../context/orderContext' 
import '../cssFiles/mainPage.css'



const LogMainPage = (props) => {

    const navigate = useNavigate()

    const [foodItems, setFoodItems] = useState([])
    const {allItemsInOrder, setAllItemsInOrder} = useContext(OrderContext)


    useEffect( () => {
        axios.get('http://localhost:8000/api/getItems')
            .then(res => {
                setFoodItems(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },[])


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
    return(
        <div>
            <nav className='d-flex align-items-center justify-content-around'>
                <h1>El Frjolito Restaurant</h1>
                <div>
                    <button><Link to={'/profile'}>Profile</Link></button>
                    <button><Link to= {'/cart'}>Cart</Link></button>
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>

            <main>
                <h2>Menu</h2>
                <div className='flex-container d-flex justify-content-around'>

                    {
                        foodItems.map((item,index) => {
                            return (
                                <div className='item' key={index}>
                                    <h3>{item.name}</h3>
                                    <img src={require(`../images/${item.image}`)} alt={item.name}/>
                                    <p>${item.price}</p>
                                    <button className='custom'><Link to={`/customize/${item._id}`}>Customize</Link></button>
                                </div>
                            )
                        })
                    }
                </div>
            </main>
        </div>
    )
}

export default LogMainPage