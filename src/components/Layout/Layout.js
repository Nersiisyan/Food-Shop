import React, {useEffect} from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routes/Routers';

import Carts from '../UI/cart/Carts';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/shopping-cart/cartSlice';


const Layout = () => {

  const showCart = useSelector(state => state.cartUi.cartIsVisiable)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(cartActions.loadItems())
  }, [])
  
  return <div>
    <Header />

    {
      showCart && <Carts />
    }
    
    <div>
        <Routers />
    </div>
    
    <Footer />
  </div>
    

}

export default Layout