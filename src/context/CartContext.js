import { createContext, useContext, useReducer, useEffect } from 'react';
const CartContext = createContext()

function reducer(state, action) {
    switch (action[0]) {
        case 'add':
            return [
                ...state,
                action[1]
            ]
        default:
            return state
    }
}

const initialState = []

function CartContextProvider({ children }) {

    const [items, dispatch] = useReducer(reducer, initialState)
    const context = {
        items,
        dispatch
    }
    return (
        <CartContext.Provider value={context}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export {
    CartContextProvider,
    CartContext,
    useCart
}