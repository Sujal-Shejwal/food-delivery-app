import React, { useState, useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Cart from './pages/Home/cart/cart'
import Order from './pages/Home/cart/place_Order/PlaceOrder'
import Verify from './pages/verify/verify'   // ✅ added
import LoginPopup from './components/LoginPopup/LoginPopup'
import { StoreContext } from './context/StoreContext'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { token } = useContext(StoreContext);

  return (
    <>
      {showLoginPopup && (
        <LoginPopup setShowLoginPopup={setShowLoginPopup} />
      )}

      <div className="App" key={token}>
        <Navbar setShowLoginPopup={setShowLoginPopup} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/verify' element={<Verify />} />  
          <Route path='/myorders' element={<MyOrders />} />  



          <Route path='/add' element={<Home />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App