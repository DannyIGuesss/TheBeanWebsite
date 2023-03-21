import {createContext, useState} from 'react'

export const ItemContext= createContext()

export const ItemProvider = (props) => {
    const [orderItem, setOrderItem]= useState({
        name: '',
        meat:'',
        toppings:[]
    })

    return (
        <ItemContext.Provider value={{
            orderItem,
            setOrderItem
        }}>

            {props.children}
        </ItemContext.Provider>
    )
}