import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router'

const Dashboard = () => {
    const navigate = useNavigate()
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            DASHBOARD
            <button onClick={Logout}>Logout</button>
        </div>
    )
}

export default Dashboard
