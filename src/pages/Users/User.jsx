import React from 'react'
import './User.css'
import { useState, useEffect } from 'react'
import Navbar from '../../Component/Navbar/Navbar'


export const User = () => {
    const [name, setName] = useState('')
    const [userList, setUserList] = useState([])
    const [filterList, setFilterList] = useState([])

    const getData = async () => {
        const response = await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
        const json = await response.json();
        setUserList(json)
        setFilterList(json)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const filtered = userList.filter(elm => elm.fullName.toLowerCase().includes(name.toLowerCase()));
        setFilterList(filtered)
    }, [name])

  
const resetInput = ()=>{
setName('')
}
    return (
        <>
        <Navbar/>
        <div className="outer-wrapper">
            <h1 className="main-heading">Users</h1>
            <div>
                <form className="userlist-filter" id="search-form">
                    <input className="userlist-searchbox" type="search" id="searchBox" placeholder="Search by Name" onChange={(e) => setName(e.target.value)} />
                    <input type="reset" className="userlist-reset-btn" value="Reset" id="resetBtn" onClick={resetInput}/>
                </form>
                <div style={{ width: '100%' }}>
               
                    <table className="order">
                        <tr>
                            <th>ID</th>
                            <th>User Avatar</th>
                            <th>Full Name</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Current Location</th>
                        </tr>
                        { filterList.length > 0 ? (
                        <tbody id="content-body">
                            { filterList.length > 0 ? filterList.map((data) => {
                                return <tr class="content-row" key={data.id}>
                                    <td class="secondary-text">{data.id}</td>
                                    <td class="secondary-text"><img src={data.profilePic} /></td>
                                    <td class="secondary-text">{data.fullName}</td>
                                    <td class="primary-text">{data.dob}</td>
                                    <td class="secondary-text">{data.gender}</td>
                                    <td class="secondary-text">{data.currentCity}, {data.currentCountry}</td>
                                </tr>
                            }) : userList && userList.map((data) => {
                                return <tr class="content-row" key={data.id}>
                                    <td class="secondary-text">{data.id}</td>
                                    <td class="secondary-text"><img src={data.profilePic} /></td>
                                    <td class="secondary-text">{data.fullName}</td>
                                    <td class="primary-text">{data.dob}</td>
                                    <td class="secondary-text">{data.gender}</td>
                                    <td class="secondary-text">{data.currentCity}, {data.currentCountry}</td>
                                </tr>



                            })}
                        </tbody>) : null}
                    </table>  
                </div>
            </div>
        </div>
        </>
        
    )
}


export default User