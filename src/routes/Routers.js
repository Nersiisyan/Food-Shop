
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home/Home';
import AllFoods from './../pages/AllFoods/AllFoods';
import FoodDetails from '../pages/FoodDetails/FoodDetails';
import Cart from './../pages/Cart/Cart';
import Checkout from './../pages/CheckOut/Checkout';
import Login from './../pages/Login/Register/Login';
import Register from '../pages/Login/Register/Register';




const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home />} />
        <Route path='/foods' element={<AllFoods />} />
        <Route path='/foods/:id' element={<FoodDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default Routers