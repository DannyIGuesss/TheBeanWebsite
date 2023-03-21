import React,{useState,useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../cssFiles/navBar.css'
import '../cssFiles/regandlog.css'
import axios from 'axios'
import { CustomerContext } from '../context/customerContext'

const Login = (props) => {

    const navigate = useNavigate()

    const [errors, setErrors] = useState('')

    const {customerId, setCustomerId} = useContext(CustomerContext)

    const[loginCustomer, setLoginCustomer] = useState({
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        setLoginCustomer({...loginCustomer, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        
    axios.post('http://localhost:8000/api/login', loginCustomer, {withCredentials:true})
        .then(res => {
            setCustomerId(res.data.customer._id)
            navigate('/loggedMainPage')
        })
        .catch(err => {
            console.log(err);
            setErrors(err.response.data.message)
        })
}


    return(
        <div>
            <nav className='d-flex align-items-center justify-content-around'>
                <h1>El Frjolito Restaurant</h1>
                <div>
                    <button><Link to={'/'} className='link'>Home</Link></button>
                    <button><Link to={'/register'} className='link'>Register</Link></button>
                </div>
            </nav>
            <div className='main-body'>
                <h1 className='text-center'>Login!</h1>
                <form onSubmit={onSubmitHandler} className='col-4 mx-auto user-form'>
                    <label className='form-label'>Email</label>
                    <span className='text-danger'>{errors}</span>
                    <input className='form-control' type='text' name='email' value={loginCustomer.email} onChange={onChangeHandler}/>
                    <label className='form-label'>Password</label>
                    <span className='text-danger'>{errors}</span>
                    <input className='form-control' type='password' name='password' value={loginCustomer.password} onChange={onChangeHandler}/>
                    <button className='reg-btn'>Login!</button>
                    <br/>
                    <Link to="/register">Don't have an account? Register here</Link>
                </form>

            </div>
            
        </div>
    )
}

export default Login