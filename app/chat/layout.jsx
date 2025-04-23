import AppBar from "../_components/AppBar"
import React from 'react'

export default function layout({ children }) {
    return (
        <div>
            <AppBar />
            {children}


        </div>
    )
}
