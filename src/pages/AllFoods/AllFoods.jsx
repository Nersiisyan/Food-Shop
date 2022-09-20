
import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ReactPaginate from 'react-paginate'

import Helmet from '../../components/Helmet/Helmet'
import CommonSection from '../../components/UI/common-section/CommonSection'
import ProductCard from '../../components/UI/product-card/ProductCard'

import products from '../../assets/fake-data/products'

import './all-foods.css'
import './pagination.css'



const AllFoods = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  window.onunload = () => {
   delete window.localStorage.allFoodsInput
   delete window.localStorage.allFoodsSection
  }

  const [optionValue, setOptionValue] = useState(localStorage.getItem( `allFoodsSection` ))

  const [searchTerm, setSearchTerm] = useState(localStorage.getItem( `allFoodsInput` ) || ``)

  const [pageNumber, setPageNumber] = useState(0)

  const searchedProduct = products.filter((item) => {
    if (searchTerm.value === "") return item;
    if (item.title
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    )
      return item;
  })

  const productPerPage = 8
  const visitPage = pageNumber * productPerPage

  const displayPage = searchedProduct
        .sort((a, b) => {
          if(optionValue === 'ascending') return a.title.localeCompare(b.title)
          if(optionValue === 'descending') return -a.title.localeCompare(b.title)
          if(optionValue === 'high-price') return a.price - b.price
          if(optionValue === 'low-price') return b.price - a.price
        })
        .slice(visitPage, visitPage + productPerPage)

  const pageCount = Math.ceil(searchedProduct.length / productPerPage)
  const changePage = ({selected}) => {
    setPageNumber(selected)
  }
  

  return <Helmet title='All-Foods'>
    <CommonSection title='All Foods' />

    <section>
      <Container>
        <Row>

          <Col lg='6' md='6' sm='6' xs='12'>
            <div className="search__widget d-flex align-items-center justify-content-between">
              <input type="text" 
                     placeholder=" I'm looking for..."
                     value={searchTerm} onChange={e => {
                      localStorage.setItem( `allFoodsInput`, `${ e.target.value }` );
                      setSearchTerm(e.target.value)}}/>
              <span><i className="ri-search-line"></i></span>
            </div>
          </Col>

          <Col lg='6' md='6' sm='6' xs='12' className='mb-5'>
            <div className="sorting__widget text-end">
              <select className='w-50'
                   value={
                    localStorage.getItem("allFoodsSection") || "Sort by ..."
                  }
                   onChange={(e)=>{
                    localStorage.setItem( `allFoodsSection`, `${ e.target.value }`);
                      setOptionValue(e.target.value)}}>
                <option>Sort by</option>
                <option value="ascending">Sort by A-Z</option>
                <option value="descending">Sort by Z-A</option>
                <option value="high-price">High Price - Low Price</option>
                <option value="low-price">Low Price - High Price</option>
              </select>
            </div>
          </Col>

          {
              displayPage.map((item) => (
                <Col lg="3" md="4" sm="6" key={item.id} className="mb-4">
                  <ProductCard item={item} />
                </Col>
              ))
          }

              <div>
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={changePage}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName='paginationBttns'
                   />
              </div>
              
        </Row>
      </Container>
    </section>

  </Helmet>
}

export default AllFoods