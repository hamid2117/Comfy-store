import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featuredProducts: [],
  singleProduct_loading: false,
  singleProduct_error: false,
  singleProduct: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const openSiderbar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSiderbar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }
  const fetchData = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios(url)
      const product = response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: product })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }
  const fetchSingle = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(url)
      const singleProducts = response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProducts })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }
  useEffect(() => {
    fetchData(url)
  }, [])
  return (
    <ProductsContext.Provider
      value={{ ...state, openSiderbar, fetchSingle, closeSiderbar }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
