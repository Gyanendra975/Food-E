// ContextReducer.jsx
import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const addTOCart =  [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price }];
      localStorage.setItem("cart", JSON.stringify(addTOCart));
      return addTOCart;

    case 'UPDATE':
      const updateCart =  state.map(item => item.id === action.id && item.size === action.size ? { ...item, qty: action.qty, price: action.price } : item);
      localStorage.setItem("cart", JSON.stringify(updateCart));
      return updateCart;

    case 'REMOVE':
      const removeFromCart =  state.filter(item => !(item.id === action.id && item.size === action.size));
      localStorage.setItem("cart", JSON.stringify(removeFromCart));
      return removeFromCart;
    case 'DROP':
      localStorage.removeItem("cart");
      let empArr = []
      return empArr;
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], ()=>{
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  })
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)
