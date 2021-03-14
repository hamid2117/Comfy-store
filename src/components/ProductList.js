import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtered_products: filter, grid_view } = useFilterContext()
  if (filter.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry , There is no products matched your search.....
      </h5>
    )
  }
  if (grid_view === false) {
    return <ListView products={filter}> </ListView>
  }
  return <GridView products={filter}>product list</GridView>
}

export default ProductList
