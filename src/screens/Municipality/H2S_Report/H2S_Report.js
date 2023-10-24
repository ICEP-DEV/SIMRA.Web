import AdminSideBar from '../Admin_Side_Bar/Admin_Side_Bar'
import Header from '../../Header/Header';
import './H2S_Report.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function H2S_Report() {
    const [H2SReport, setH2SReport] = useState([])
    const [IsDataLoaded,setIsDataLoaded] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:3001/api/get_all_summary_h2s").then(response => {
            setIsDataLoaded(response.data.success)
            if (response.data.success === true) {
                setH2SReport(response.data.rows)
            }

        })
    }, [])
    return (
        <div className='hero-all' >
            <div className='sidenav'>
                <AdminSideBar />
            </div>
            <div className='main-all'>
                <div className='content'>
                    <Header />
                    <div className='container-wrapper'>
                        {IsDataLoaded === true && (<table>
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
                        {IsDataLoaded === false && (
                            <label>Data no loaded</label>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default H2S_Report