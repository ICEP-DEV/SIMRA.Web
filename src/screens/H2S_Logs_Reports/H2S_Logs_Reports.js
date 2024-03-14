import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

function H2S_Logs_Reports() {

    let user_info = useSelector((state) => state.user.value)
    const [Logs, setLogs] = useState([]);
    const [FullLogs, setFullLogs] = useState([]);
    const [Filter, setFilter] = useState('')
    const [FilterInput, setFilterInput] = useState('')
    let [IsFoundData, setIsFoundData] = useState(false)


    function handleFilter(event) {
        setFilter(event)
        console.log(event)
    }
    useEffect(() => {

        async function getLogs() {
            var userId = user_info.userId
            var logs = await axios.get('http://localhost:3001/api/get_userhistory_h2s/' + userId);
            if (logs.data.success) {
                setFullLogs(logs.data.result)
                setLogs(logs.data.result)
                setIsFoundData(logs.data.success)
            }
        }
        getLogs()
    })

    function filter_table() {
        var tempLogs = FullLogs
        console.log(tempLogs)
        if (Filter.toLocaleLowerCase() === "province") {
            setLogs(tempLogs.filter((value) => {
                return value.province_name.toLocaleLowerCase().includes(FilterInput.toLocaleLowerCase());
            }))
        }

        if (Filter.toLocaleLowerCase() === "risk type") {
            setLogs(tempLogs.filter((value) => {
                return value.risk_type.toLocaleLowerCase().includes(FilterInput.toLocaleLowerCase());
            }))
        }

        if (Filter.toLocaleLowerCase() === "municipality") {
            setLogs(tempLogs.filter((value) => {
                return value.muni_name.toLocaleLowerCase().includes(FilterInput.toLocaleLowerCase());
            }))
        }

        if (Filter.toLocaleLowerCase() === "water accessability") {
            setLogs(tempLogs.filter((value) => {
                return value.waterAccessability.toLocaleLowerCase().includes(FilterInput.toLocaleLowerCase());
            }))
        }

        if (Filter.toLocaleLowerCase() === "weather condition") {
            setLogs(tempLogs.filter((value) => {
                return value.weatherCondition.toLocaleLowerCase().includes(FilterInput.toLocaleLowerCase());
            }))
        }

        if (Filter.toLocaleLowerCase() === "status") {
            setLogs(tempLogs.filter((value) => {
                return value.status.toLocaleLowerCase().includes(FilterInput.toLocaleLowerCase());
            }))
        }
    }

    let Filter_Data= <div className='filter'>
        <div className='select_filter'>
            <label>Filter</label>
            <select className='filter' onChange={(event) => { handleFilter(event.target.value) }}>
                <option value="----">-Select From Options- </option>
                <option value="date">Date</option>
                <option value="province">Province</option>
                <option value="municipality">Municipality</option>
                <option value="water accessability">Water Accessability</option>
                <option value="weather condition">Weather Condition</option>
                <option value="risk type">Risk Type</option>
                <option value="status">Status</option>
            </select>
        </div>
        <div className='filter-input-form'>
            {Filter === "province" && (<input type='text' className='control-form' onChange={(event) => setFilterInput(event.target.value)} />)}
            {Filter === "date" && (
                <div>
                    <label>Start<input type='date' className='control-form form-date' /></label>
                    <label>End<input type='date' className='control-form form-date' /></label>
                </div>
            )}
            {Filter === "----" && (<input type='text' className='control-form' onChange={(event) => setFilterInput(event.target.value)} />)}
            {Filter === "municipality" && (<input type='text' className='control-form' onChange={(event) => setFilterInput(event.target.value)} />)}
            {Filter === "Wwter accessability" && (<input type='text' className='control-form' onChange={(event) => setFilterInput(event.target.value)} />)}
            {Filter === "weather condition" && (<input type='text' className='control-form' onChange={(event) => setFilterInput(event.target.value)} />)}
            {Filter === "risk type" && (<input type='text' className='control-form' onChange={(event) => setFilterInput(event.target.value)} />)}
            {Filter === "status" && (<input type='number' className='control-form' onChange={(event) => setFilterInput(event.target.value)} />)}

        </div>
        <div className='filter-search-btn'><button onClick={filter_table} className='filter-button btn btn-primary'>Search </button></div>

    </div>

    // H2S report list
    let H2S_Logs = <div>
        <table >
                <th>Sample Date</th>
                <th>Province Name</th>
                <th>Municipality Name</th>
                <th>Water Accessability</th>
                <th>weather Condition</th>
                <th>Risk Type</th>
                <th>Status</th>
            <tbody>
                {Logs.map((log, xid) => (
                    <tr key={xid}>
                        <td>{log.sample_date}</td>
                        <td>{log.province_name}</td>
                        <td>{log.muni_name}</td>
                        <td>{log.waterAccessability}</td>
                        <td>{log.weatherCondition}</td>
                        <td>{log.risk_type}</td>
                        <td>{log.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>


    return (
        <div className='hero-all' >
            <Navbar/>

            <div className='main-all'>

                <div className='content'>
                    <Header />
                    <div className='container-wrapper'>
                        <div className='filter_div'>
                            <filter>{Filter_Data}</filter>
                        </div>
                        {IsFoundData === true && (
                            <div className='display_user_log'>
                                {H2S_Logs}
                            </div>
                        )}

                        {IsFoundData === false && (
                            <h2>No logs found</h2>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )

}
export default H2S_Logs_Reports