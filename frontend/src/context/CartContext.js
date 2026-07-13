import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i._id === action.item._id && i.selectedSize === action.item.selectedSize);
      if (exists) return state.map(i =>
        i._id === action.item._id && i.selectedSize === action.item.selectedSize
          ? { ...i, quantity: i.quantity + 1 } : i
      );
      return [...state, { ...action.item, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => !(i._id === action._id && i.selectedSize === action.selectedSize));
    case 'UPDATE_QTY':
      return state.map(i =>
        i._id === action._id && i.selectedSize === action.selectedSize
          ? { ...i, quantity: Math.max(1, action.qty) } : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    try { return JSON.parse(localStorage.getItem('pb_cart')) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('pb_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => dispatch({ type: 'ADD', item });
  const removeFromCart = (_id, selectedSize) => dispatch({ type: 'REMOVE', _id, selectedSize });
  const updateQty = (_id, selectedSize, qty) => dispatch({ type: 'UPDATE_QTY', _id, selectedSize, qty });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const subtotal = cart.reduce((sum, i) => sum + i.selectedPrice * i.quantity, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
