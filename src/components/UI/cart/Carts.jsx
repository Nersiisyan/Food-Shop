import React, {useEffect} from 'react';
import { ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

import CartItem from './CartItem';

import './shopping-cart.css'

import { useDispatch, useSelector } from 'react-redux';
import { cartUiActions } from '../../../store/shopping-cart/cartUiSlice';
import { cartActions } from './../../../store/shopping-cart/cartSlice';



const Carts = () => {

  const dispatch = useDispatch()
  const cartProducts = useSelector(state =>state.cart.cartItems)
  const totalAmount = useSelector(state=> state.cart.totalAmount)

  useEffect(() => {
    dispatch(cartActions.calculateTotal())
  }, [cartProducts])
  
  const toggleCart = () => {
    dispatch(cartUiActions.toggle())
  }

  return <div className="cart__container">
    <ListGroup className='cart'>

      <div className="cart__close">
        <span onClick={toggleCart}><i className="ri-close-fill"></i></span>
      </div>

      <div className="cart__item-list">
        {
          cartProducts.length === 0 ? <h6 className='text-center mt-5'>
                                      No item added to the cart</h6>
                                    : cartProducts.map((item, index)=>(
                                      <CartItem item={item} key={index} />
                                    ))
        }

      </div>

      <div className="cart__bottom d-flex align-items-center justify-content-between">
        <h6>Subtotal: <span>${totalAmount}</span> </h6>
        <button onClick={toggleCart}><Link to='/checkout'>Checkout</Link></button>
      </div>

    </ListGroup>
  </div>
}

export default Carts