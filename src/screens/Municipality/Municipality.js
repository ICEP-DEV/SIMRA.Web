import './Municipality.css'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Admin_Side_Bar from '../Admin_Side_Bar/Admin_Side_Bar'
function Municipality() {
    
    return (
        <div className="body">
            <div className="content">
                <div className="left">
                <Admin_Side_Bar />
                </div>
                <div className="right">
                <label>right content</label>
                </div>
            </div>
        </div>
    )
}

export default Municipality
