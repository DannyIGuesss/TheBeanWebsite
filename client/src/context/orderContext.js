import {createContext, useState} from 'react'

export const OrderContext= createContext()

export const OrderProvider = (props) => {
    const [allItemsInOrder, setAllItemsInOrder] = useState([])

    return (
        <OrderContext.Provider value={{
            allItemsInOrder,
            setAllItemsInOrder
        }}>

            {props.children}
        </OrderContext.Provider>
    )
}