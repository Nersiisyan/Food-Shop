
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,

    reducers: {

        addItem(state, action){
           
            const newItem = action.payload
            const existingItem = state.cartItems.find(item=>item.id ===newItem.id)
            state.totalQuantity++

            if(!existingItem){
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    image01: newItem.image01,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            else{
                existingItem.quantity++
                 existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            }

            
            localStorage.cartItems = JSON.stringify(state.cartItems)


        },

        removeItem(state, action){
            const id = action.payload
            const existingItem = state.cartItems.find(item=>item.id === id)
            state.totalQuantity--

            if(existingItem.quantity === 1){
                state.cartItems = state.cartItems.filter(item=> item.id !== id)
            }
            else{
                existingItem.quantity--
                existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price)
            }

            
        },

        deleteItem(state, action){
            const id = action.payload
            const existingItem = state.cartItems.find(item=> item.id === id)

            if(existingItem){
                state.cartItems = state.cartItems.filter(item=>item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }

            
        },
        
        loadItems(state, action){
            let items = localStorage.cartItems
            if(items){
                items = JSON.parse(items)
                state.cartItems = items
                state.totalQuantity = items.reduce((acc, cur) => acc + +cur.quantity, 0)
            }
        },

        calculateTotal(state, action){
            state.totalAmount = state.cartItems.reduce((total, item)=>(
                total + Number(item.price) * Number(item.quantity)
            ),0)
            localStorage.cartItems = JSON.stringify(state.cartItems)

        }


    }
});

export const cartActions = cartSlice.actions;
export default cartSlice