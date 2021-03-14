import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, colr, amount, products } = action.payload
    const tempCart = state.cart.find((i) => i.id === id + colr)
    if (tempCart) {
      const newAmount = state.cart.map((cartItem) => {
        if (cartItem.id === id + colr) {
          let newValue = cartItem.amount + amount
          if (newValue > cartItem.stock) {
            return (newValue = cartItem.stock)
          }
          return { ...cartItem, amount: newValue }
        } else {
          return cartItem
        }
      })
      return { ...state, cart: newAmount }
    } else {
      const newItem = {
        id: id + colr,
        colr,
        amount,
        name: products.name,
        price: products.price,
        stock: products.stock,
        image: products.images[0].url,
        max: products.stock,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((i) => i.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return { ...item, amount: newAmount }
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...item, amount: newAmount }
        }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item
        total.total_items += amount
        total.total_amount += price * amount
        return total
      },
      { total_items: 0, total_amount: 0 }
    )
    return { ...state, total_items, total_amount }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
