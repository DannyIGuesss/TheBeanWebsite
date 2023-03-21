import React, {useState,useContext} from 'react'
import axios from 'axios'
import {useNavigate,Link} from 'react-router-dom'
import "../cssFiles/navBar.css"
import "../cssFiles/regandlog.css"
import { CustomerContext } from '../context/customerContext'


const Register = (props) => {

    const navigate = useNavigate()

    const {customerId, setCustomerId} = useContext(CustomerContext)
    const [errors, setErrors] = useState('')

    const[regCustomer, setRegCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword:""
    })

    const onChangeHandler = (e) => {
        setRegCustomer({...regCustomer, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        
    axios.post('http://localhost:8000/api/register', regCustomer, {withCredentials:true})
        .then(res => {
            setCustomerId(res.data.customer._id)
            navigate('/loggedMainPage')
        })
        .catch(err => {
            console.log(err);
            setErrors(err.response.data.error.errors)
        })
}

    return(
        <div className='parent-container'>
            <nav className='d-flex align-items-center justify-content-around'>
                <h1>El Frjolito Restaurant</h1>
                <div>
                    <button><Link to={'/login'} className='link'>Login</Link></button>
                    <button><Link to={'/'} className='link'>Home</Link></button>
                </div>
            </nav>
            <div className='main-body'>
                <h1 className='text-center'>Register!</h1>
                <form onSubmit={onSubmitHandler} className='col-4 mx-auto user-form'>
                    <label className='form-label'>First Name</label>
                    {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>}
                    <input className='form-control' type='text' name='firstName' value={regCustomer.firstName} onChange={onChangeHandler} />

                    <label className='form-label'>Last Name</label>
                    {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>}
                    <input className='form-control' type='text' name='lastName' value={regCustomer.lastName} onChange={onChangeHandler}/>

                    <label className='form-label'>Email</label>
                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                    <input className='form-control' type='text' name='email' value={regCustomer.email} onChange={onChangeHandler}/>

                    <label className='form-label'>Password</label>
                    {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                    <input className='form-control' type='password' name='password' value={regCustomer.password} onChange={onChangeHandler}/>

                    <label className='form-label'>Confirm Password</label>
                    {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
                    <input className='form-control' type='password' name='confirmPassword' value={regCustomer.confirmPassword} onChange={onChangeHandler}/>

                    <button className='reg-btn'>Register!</button>
                    <br/>
                    <Link to="/login">Already have an account? Login in here</Link>
                </form>
            </div>
            
        </div>
    )
}

export default Register