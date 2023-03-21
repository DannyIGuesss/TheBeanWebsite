import {createContext, useState} from 'react'

export const CustomerContext= createContext()

export const CustomerProvider = (props) => {
    const [customerId, setCustomerId]= useState([])

    return (
        <CustomerContext.Provider value={{
            customerId,
            setCustomerId
        }}>

            {props.children}
        </CustomerContext.Provider>
    )
}