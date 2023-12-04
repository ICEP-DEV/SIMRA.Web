import Sidebar from '../../Admin/Sidebar/SideBar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../../../Data/API';
function Fib_Admin(){
    const [Provinces, setProvinces] = useState([])
    const [Report, setReport] = useState([])
    const [Municipalities, setMunicipalities] = useState([])
    const [StoredReport, setStoredReport] = useState([])
    let [TotalRecord, setTotalRecord] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [FoundReport, setFoundReport] = useState(false)
    let user_info = useSelector((state) => state.user.value)

    

   

return( 
<div className="container-admin" >
<div className='sidebar-admin ' >
        <Sidebar/>
        </div>
 
        <div className='main-admin'>
                <div className='reports'>
                            
                       
                        </div>
        </div>

    </div>
)

}

export default Fib_Admin;