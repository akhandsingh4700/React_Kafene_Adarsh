import React from 'react'
import './Products.css'
import { useState, useEffect } from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import Loader from '../../Loader'
import axios from 'axios'
import Error from '../../Loader/Error'

const Products = () => {
    const [count, setCount] = useState(0)
    const [productList, setProductList] = useState([])
    const [filteredProductList, setFilteredProductList] = useState([])
    const [filter, setFilter] = useState({
    stock: true,
    expiryDate: true,
    })

    const [loading,setloading] = useState(true)
    const [error,setError] = useState(false)
    let currentDate = new Date();


    const getData = async () => {
        try{
            const response = await axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
            setProductList(response.data)
            setFilteredProductList(response.data)
            setCount(response.data.length)

        }
        catch(e){
            setError(true)
        }
        finally {
            setloading(false)

        }}


    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        filterData(filter, productList)
    }, [filter])
    
    const filterData = (filters, productList) => {
        let filteredList = productList;
        if (!filters.stock) {
            filteredList = filteredList.filter((elm) => elm.stock > 100);
            console.log(filteredList)
        }
        if (!filters.expiryDate) {
            let currentDate = new Date();
            filteredList = filteredList.filter((elm) => new Date(elm.expiryDate) > currentDate);
        }
        setFilteredProductList(filteredList);
        setCount(filteredList.length);
    }
    
    
    const handleInput = (e) => {
        const { name, checked } = e.target
        setFilter({...filter, [name]: checked});
        filterData(filter, productList);
    }


return (
    <>


<Navbar/>
    {loading&&<Loader/>}   
    {!loading && productList.length>0 &&<div className="outer-wrapper">
        <h1 className="main-heading">Products</h1>
        <div className="inner-wrapper">
            <div className="filter-wrapper">
                <h3>Filters</h3>
                <div className="filter-option">
                    <p>Count:{count} <span id='count'></span></p>
                    <label className="filter-checkbox"><input type="checkbox" name="expiryDate" id="expiredCheckBox" onChange={handleInput} checked={filter.expiryDate} />Expired</label>
                    <label className="filter-checkbox"><input type="checkbox" name="stock" id="lowStockCheckBox" onChange={handleInput} checked={filter.stock} />Low Stock</label>

                </div>
            </div>
            <div style={{ width: '100%' }}>
                <table className="order">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Brand</th>
                            <th>Expiry Date</th>
                            <th>Unit Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>

                    <tbody id="content-body">
                    {filteredProductList && filteredProductList
                            .map((data) => {
                                return <tr class="content-row" key={data.id}>
                                    <td class="secondary-text">{data.id}</td>
                                    <td class="primary-text">{data.medicineName}</td>
                                    <td class="secondary-text">{data.medicineBrand}</td>
                                    <td class={new Date(data.expiryDate) < currentDate ? "expired-item" : "primary-text"}>{data.expiryDate}</td>
                                    <td class="secondary-text">${data.unitPrice}</td>
                                    <td class={data.stock<100 ?"low-stock": 'secondary-text'}>{data.stock}</td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>}
    {error && <Error/>}
    </>
    
)
}

export default Products