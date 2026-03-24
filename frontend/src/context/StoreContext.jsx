import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token,setToken] = useState("");
  const [food_list,setFoodList] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // ✅ ADD TO CART (FIXED)
  const addToCart = async (itemId) => {

    setCartItems((prev) => {
      const updated = prev || {};   // ✅ FIX

      if (!updated[itemId]) {
        return { ...updated, [itemId]: 1 };
      } else {
        return { ...updated, [itemId]: updated[itemId] + 1 };
      }
    });

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // ✅ REMOVE FROM CART (FIXED)
  const removeFromCart = async (itemId) => {

    setCartItems((prev) => {
      const updatedCart = { ...(prev || {}) };   // ✅ FIX

      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }

      return updatedCart;
    });

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // ✅ TOTAL PRICE (SAFE)
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    if (!cartItems) return 0;   // ✅ FIX

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = food_list.find(
          (product) => product._id === itemId
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  // ✅ FETCH FOOD
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url+"/api/food/list");
      setFoodList(response.data.data || []);   // ✅ FIX
    } catch (error) {
      console.log(error);
    }
  }

  // ✅ LOAD CART (MAIN FIX 🔥)
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url+"/api/cart/get",
        {},
        {headers:{token}}
      );

      setCartItems(response.data.cartData || {});   // ✅ FIX

    } catch (error) {
      console.log(error);
      setCartItems({});   // ✅ fallback
    }
  }

  useEffect(()=>{
    async function loadData() {
      await fetchFoodList();
      if(localStorage.getItem("token")){
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;