import { api } from "../../../Data/API";
import SideBar from "../Sidebar/SideBar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function H2SReport(){
  const api = "http://localhost:3001/api/"
    const [Provinces, setProvinces] = useState([])
    const [Municipalities, setMunicipalities] = useState([])
    const [H2SReport, setH2SReport] = useState([])
    const [startDate, setStartDate] = useState('')
    const [StoredReport, setStoredReport] = useState([])
    const [endDate, setEndDate] = useState('')
    const [IsDataLoaded,setIsDataLoaded] = useState(false)
    const [FoundReport, setFoundReport] = useState(false)
    const [Report, setReport] = useState([])
    let [TotalRecord, setTotalRecord] = useState(0)
     // Pagination
  const [CurrentPage, setCurrentPage] = useState(1)
  const record_per_page = 5
  const lastIndex = CurrentPage * record_per_page
  const firdIndex = lastIndex - record_per_page
  const record =H2SReport.slice(firdIndex, lastIndex)
  const number_of_pages = Math.ceil(record.length / record_per_page)
  const number = [...Array(number_of_pages + 1).keys()].slice
  const PagePerNumber = []
  for (let i = 1; i <= Math.ceil(H2SReport.length / record_per_page); i++) {
    PagePerNumber.push(i)
  }
    useEffect(() => {
        axios.get(api+"get_all_summary_h2s").then(response => {
          setTotalRecord(0)
            setIsDataLoaded(response.data.success)
            setFoundReport(response.data.success)
            if (response.data.success === true) {
             
                setH2SReport(response.data.rows)
                
            }

        })
    }, [])
  
    function filter_by_province(_province) {
        var count = 0
        var temp_array = StoredReport

        axios.get(api + "get_municipalities/" + _province).then(response => {
            setMunicipalities(response.data.results)

        }, err => {
            console.log(err)
        })
        setReport(temp_array.filter(value => {
            return value.province_id.toLocaleLowerCase().includes(_province.toLocaleLowerCase())
        }))

        for (var k = 0; k < StoredReport.length; k++) {
            if (StoredReport[k].province_id.toLocaleLowerCase() === _province.toLocaleLowerCase()) {
                count++
            }
        }
        setTotalRecord(count)
    }

    function filter_by_municipality(_muni) {
        var temp_array = StoredReport
        var count = 0
        if (_muni === '') {
            setReport(StoredReport)
            return
        }

        setReport(temp_array.filter(value => {
            return value.muni_id.toLocaleLowerCase().includes(_muni.toLocaleLowerCase())
        }))
        for (var k = 0; k < Report.length; k++) {
            if (Report[k].muni_id.toLocaleLowerCase() === _muni.toLocaleLowerCase()) {
                count++
            }
        }
        setTotalRecord(count)
    }

    function search_by_weekday(day) {
        var temp_array = StoredReport
        var count = 0
        if (day !== '') {
            setReport(temp_array.filter(value => {
                return value.weekday.toLocaleLowerCase().includes(day.toLocaleLowerCase())
            }))
            for (var k = 0; k < StoredReport.length; k++) {
                if (StoredReport[k].weekday.toLocaleLowerCase() === day.toLocaleLowerCase()) {
                    count++
                }
            }
            setTotalRecord(count)
        }
        else {
            setReport(StoredReport)
        }
    }

      //change page 
  const paginate = (page_number) => setCurrentPage(page_number)
    return(
        
        <div className="container-admin" >
        <div className='sidebar-admin ' >
        <SideBar/>
        </div>
           <div className='main-admin'>
                     
           <div className='report-header  '>
           
          
<table className="table-logs table table-bordered w-75 ">
    <thead className='thead-dark'>
    <tr>
      
     
      <th scope="col" className='report-heading'>Province</th>
      <th scope='col' className='report-heading'>Municipalities</th>
     
    </tr>
  </thead>
  <tbody>
    <tr  scope="row">
    
     
                  <td className="w-25">
                  <select onChange={(e) => filter_by_province(e.target.value)} className="w-100 p-2">
                    <option value=''>All Provinces</option>
                    {Provinces.map((province, xid) => (
                      <option key={xid} value={province.province_id} >{province.province_name}</option>
                    ))}
                  </select>
               
                  </td>
                 <td className="w-25">
                 <select onChange={(e) => filter_by_municipality(e.target.value)}  className="w-100 p-2" >
                    <option value=''>All Municipalities</option>
                    {Municipalities.map((muni, xid) => (
                      <option key={xid} value={muni.muni_id} >{muni.muni_name}</option>
                    ))}
                  </select>
                 </td>
 
    </tr>
   
   
  </tbody>
</table>
              <div id='stats_summary'  className=' text-primary mt-5' >
                <h3>Total Records: {TotalRecord}</h3>
              </div>

            </div>

           {IsDataLoaded === true && (
           <table>
                            <tr>
                                <th>Municipality</th>
                                <th>Sample  source</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Samling date​</th>
                                <th>Presence/Absence</th>
                            </tr>
                            {H2SReport.map((report, xid) => (
                                <tr key={xid}>
                                    <td>{report.muni_name}</td>
                                    <td>{report.type}</td>
                                    <td>{report.longitude}</td>
                                    <td>{report.latitude}</td>
                                    <td>{report.sample_date}</td>
                                    <td>{report.status}</td>
                                </tr>
                            ))}

                        </table>)}
                        <div className='page_numbers' >
                {(IsDataLoaded === true) && (
                  <nav className='pagination'>
                    <ul class="pagination justify-content-center">
                      {PagePerNumber.map((number, xid) => (
                        <li key={xid} className='page-item'>
                          <button onClick={() => paginate(number)} className='page-link'>{number}</button>
                        </li>
                      ))}
                    </ul>

                  </nav>
                )}
              </div>
                        {IsDataLoaded === false && (
                            <label>Data no loaded</label>
                        )}
           </div>
        
        </div>
    )
}
export default H2SReport;