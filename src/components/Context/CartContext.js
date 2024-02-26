const { createContext, useState, useEffect } = require('react');

export const Context = createContext({});

export default function ContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts, ls]);

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts(prev => [...prev, productId]);
  }
  function clearCart() {
    window.localStorage.setItem('cart', JSON.stringify([]));
  }

  function removeProduct(productId) {
    setCartProducts(prev => {
      const position = prev.indexOf(productId);
      if (position !== -1) {
        const remainingProducts = prev.filter(
          (value, index) => index !== position
        );
        if (remainingProducts.length === 0) {
          window.localStorage.setItem(
            'cart',
            JSON.stringify(remainingProducts)
          );
        }
        return remainingProducts;
      }
      return prev;
    });
  }

  return (
    <Context.Provider
      value={{
        cartProducts,
        clearCart,
        setCartProducts,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
}
