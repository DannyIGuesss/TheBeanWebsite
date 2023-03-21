import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../cssFiles/mainPage.css'


const MainPage = (props) => {

    const [ foodItems, setFoodItems] = useState([])

    useEffect( () => {
        axios.get('http://localhost:8000/api/getItems')
            .then(res => {
                setFoodItems(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    })


    return (
        <div className='parent-container'>
            <nav className='d-flex align-items-center justify-content-around'>
                <h1>El Frjolito Restaurant</h1>
                <div>
                    <button><Link to={'/register'} className='link'>Register</Link></button>
                    <button><Link to={'/login'} className='link'>Login</Link></button>
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
                                </div>
                            )
                        })
                    }
                </div>
                <p className='regOrSignIn'>Register or Sign in to Order!</p>
            </main>
        </div>
    )
}

export default MainPage