import React, { useState, useEffect, useContext } from 'react'
import { OrderContext } from '../context/orderContext'
import { ItemContext } from '../context/itemContext'
import axios from 'axios'
import {useNavigate, useParams,Link} from 'react-router-dom'
import "../cssFiles/navBar.css"
import "../cssFiles/customize.css"

const Customize = (props) => {
    const navigate = useNavigate()

    const [item, setItem] = useState({})

    const {orderItem, setOrderItem} = useContext(ItemContext)

    const {allItemsInOrder, setAllItemsInOrder} = useContext(OrderContext)

    const {id} = useParams()

    //HERE WE GET THE FOOD ITEM WE PICKED TO CUSTOMIZE
    useEffect( () => {
        axios.get(`http://localhost:8000/api/oneItem/${id}`)
            .then(res => {
                setItem(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    },[id])

    //THIS IS FOR TOPPINGS
    const inputChange = (e) => {
        let toppings = orderItem.toppings
            if(e.target.checked) {
                toppings.push(e.target.value)
            }else{
                let toppingValue = e.target.value
                toppings = toppings.filter((topping) => topping !== e.target.value);
            }

        setOrderItem({...orderItem, [e.target.name]: toppings})
    }
    // THIS IS FOR MEAT
    const inputMeatChange = (e) => {
        setOrderItem({...orderItem, [e.target.name]: e.target.value, name: item.name, price: item.price})
    }
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

    const submitHandler = (e) => {
        e.preventDefault()
        setAllItemsInOrder([...allItemsInOrder ,orderItem])


        setOrderItem({
        name: '',
        meat:'',
        toppings:[]})
        
        
        navigate('/loggedMainPage')

    }

    return (
        <div className='parent-container'>
            <nav className='d-flex align-items-center justify-content-around'>
                <h1>El Frjolito Restaurant</h1>
                <div>
                    <button><Link to={'/profile'}>Profile</Link></button>
                    <button><Link to={'/cart'}>Cart</Link></button>
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>
            <div className='main-body'>
                <h1 className='text-center'>Customize {item.name}</h1>
                <form onSubmit={submitHandler} className='text-center'>
                    <label>Choose Meat</label>
                    <select onChange={inputMeatChange} value={orderItem.item} name='meat'>
                        <option>Select one</option>
                        <option value='CarneAsada'>Carne Asada</option>
                        <option value='Chicken'>Chicken</option>
                        <option value='Pastor'>Pastor</option>
                        <option value='No-meat'>No meat</option>
                    </select>

                    <h2>Choose toppings</h2>
                        <div className='topping'>
                            <label>tomato</label>
                            <input type='checkbox'value='tomato' onChange={ (e) => {inputChange(e)}} name='toppings'/>
                        </div>
                        <div className='topping'>
                            <label>cheese</label>
                            <input type='checkbox'value='cheese'onChange={(e) => {inputChange(e)}} name='toppings'/>
                        </div>
                        <div className='topping'>
                            <label>lettuce</label>
                            <input type='checkbox'value='lettuce'onChange={(e) => {inputChange(e)}} name='toppings'/>
                        </div>
                        <div className='topping'>
                            <label>beans</label>
                            <input type='checkbox'value='beans'onChange={(e) => {inputChange(e)}} name='toppings'/>
                        </div>
                        <div className='topping'>
                            <label>rice</label>
                            <input type='checkbox'value='rice'onChange={(e) => {inputChange(e)}} name='toppings'/>
                        </div>
                        <div className='topping'>
                            <label>salsa</label>
                            <input type='checkbox'value='salsa'onChange={(e) => {inputChange(e)}} name='toppings'/>
                        </div>
                        <div className='topping'>
                            <label>avocado</label>
                            <input type='checkbox'value='avocado'onChange={(e) => {inputChange(e)}} name='toppings'/>
                        </div>
                        <div className='topping'>
                            <label>jalapeno</label>
                            <input type='checkbox'value='jalapeno'onChange={(e) => {inputChange(e)}} name='toppings'/>
                        </div>
                    <button>Add to cart</button>
                </form>

        </div>
            </div>
            
    )
}

export default Customize