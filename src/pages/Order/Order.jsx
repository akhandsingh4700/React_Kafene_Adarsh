import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import Loader from '../../Loader'
import Error from '../../Loader/Error'
import './Order.css'

const Order = () => {
    const [orderList, setOrderList] = useState([])
    const [count, setCount] = useState(0)
    const [filters, setFilters] = useState({
        New: true,
        Packed: true,
        InTransit: true,
        Delivered: true
    });
    const [loading,setloading] = useState(true)
    const [error,setError] = useState(false)

    const getData = async () => {
        try{
            const response = await axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
            setOrderList(response.data)
            setCount(response.data.length)
           

        }
        catch(e){
            setError(true)

        }
        finally {
            setloading(false)

        }

    }

    useEffect(() => {
        getData()
    }, [])

    const handleFilter =(e)=>{
        const { name , checked} =  e.target;

       
        setFilters(prevFilter => {
            const nextFilter = {...prevFilter, [name]: checked}

            const lengthcount = orderList.filter(order => nextFilter[order.orderStatus] !== false)
            setCount(lengthcount.length)
            return nextFilter;
        });
}
    




    return (
        <>
        <Navbar/>

         {loading&&<Loader/>}

        {!loading && orderList.length>0 && <div className="outer-wrapper">
            <h1 className="main-heading">Orders</h1>
            <div className="inner-wrapper">
                <div className="filter-wrapper">
                    <h3>Filters</h3>
                    <div className="filter-option">
                        <p>Count:{count} <span id="count"></span></p>
                        <label className="filter-checkbox"><input type="checkbox" id="newCheckBox" name="New" onChange={handleFilter} checked={filters.New} />New</label>
                        <label className="filter-checkbox"><input type="checkbox" id="PackedCheckBox" name="Packed" onChange={handleFilter} checked={filters.Packed} />Packed</label>
                        <label className="filter-checkbox"><input type="checkbox" id="IntransitcheckBox" name="InTransit" onChange={handleFilter} checked={filters.InTransit} />InTransit</label>
                        <label className="filter-checkbox"><input type="checkbox" id="DeliveredCheckBox" name="Delivered" onChange={handleFilter} checked={filters.Delivered} />Delivered</label>
                    </div>
                </div>
                <div style={{ width: '100%' }}>
                    <table className="order">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="content-body">
                            {orderList && orderList.filter(order => filters[order.orderStatus] !== false)
                                .map((data) => {
                                    return <tr class="content-row" key={data.id}>
                                        <td class="secondary-text">{data.id}</td>
                                        <td class="primary-text">{data.customerName}</td>
                                        <td class="primary-text">{data.orderDate}<br /><span class="secondary-text">{data.orderTime}</span></td>
                                        <td class="secondary-text">${data.amount}</td>
                                        <td class="primary-text">{data.orderStatus}</td>
                                    </tr>
                                }
                                )}


                        </tbody>
                    </table>

                </div>
            </div>
        </div> }
        {error && <Error/>}
        </>
        
        )
}

export default Order