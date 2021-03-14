import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { UPDATE_FILTERS } from '../actions'

const Filters = () => {
  const {
    filters: {
      text,
      company,
      name,
      category,
      color,
      min_price,
      max_price,
      shipping,
      price,
    },
    all_products,
    filtered_products,
    updateSearch,
    clearFilters,
  } = useFilterContext()

  const categories = getUniqueValues(all_products, 'category')
  const companies = getUniqueValues(all_products, 'company')
  const colors = getUniqueValues(all_products, 'colors')

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form_control'>
            <input
              type='text'
              name='text'
              className='search-input'
              placeholder='search'
              value={text}
              onChange={updateSearch}
            />
          </div>

          {/* category */}
          <div className='form_control'>
            <h5>category</h5>
            {categories.map((c, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  name='category'
                  onClick={updateSearch}
                  className={`${
                    category === c.toLowerCase() ? 'active' : null
                  }`}
                >
                  {c}
                </button>
              )
            })}
          </div>
          {/* end of category */}
          {/* Company */}

          <div className='form_control'>
            <h5>company</h5>
            <select
              name='company'
              className='company'
              value={company}
              onChange={updateSearch}
            >
              {companies.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                )
              })}
            </select>
          </div>
          {/* end of Company */}
          {/* colors */}
          <div className='form_control'>
            <h5>colors</h5>
            <div className='colors'>
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      className={color === c ? 'all-btn active' : 'all-btn'}
                      name='color'
                      data-color='all'
                      onClick={updateSearch}
                    >
                      all
                    </button>
                  )
                }

                return (
                  <button
                    key={index}
                    name='color'
                    className={color === c ? 'color-btn active' : 'color-btn'}
                    data-color={c}
                    style={{ backgroundColor: c }}
                    onClick={updateSearch}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                )
              })}
            </div>
          </div>
          {/* end of color*/}
          {/*  range*/}
          <div className='form_content'>
            <h5>Price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              onChange={updateSearch}
              max={max_price}
              min={min_price}
              value={price}
            />
          </div>
          {/* end of range*/}
          <div className='form_content shipping'>
            {/* <h5>Shipping</h5> */}
            <label htmlFor='shipping'>shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              onChange={updateSearch}
              checked={shipping}
            />
          </div>
        </form>
        <button type='button' className='clear-btn' onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
    margin-top: 15px;
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
