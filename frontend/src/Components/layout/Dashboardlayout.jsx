import React, { Children, useContext } from 'react'
import { UserContext } from '../../context/useContext'
import Navbar from './Navbar'


const Dashboardlayout = ({children}) => {
    const { user } = useContext(UserContext)
    return (
        <div>
            <Navbar />
{user && <div>{children}</div>}
        </div>
    )
}

export default Dashboardlayout