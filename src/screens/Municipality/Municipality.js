import './Municipality.css'
import Footer from '../Footer/Footer';
import Admin_NavBar from '../Admin_NavBar/Admin_NavBar';
import Header from '../Header/Header';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { api } from '../../Data/API';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Municipality() {
    //province Reports
    const [Provinces, setProvinces] = useState([])
    const [IsProvinces, setIsProvinces] = useState(false)
    const [ExpandSelectedProvince, setExpandSelectedProvince] = useState([])
    const [AllMunicipalities, setAllMunicipalities] = useState([])
    const [IsFoundMunicipality, setIsFoundMunicipality] = useState(false)
    const [FiteredMunicipalities, setFiteredMunicipalities] = useState([])


    // H2S reports
    const [H2SPovinces, setH2SPovinces] = useState([])
    const [H2SMunicipalities, setH2SMunicipalities] = useState([])
    const [H2SMunicipalitiesRisk, setH2SMunicipalitiesRisk] = useState([])
    const [FilteredH2SMunicipalitiesRisk, setFilteredH2SMunicipalitiesRisk] = useState([])
    const [FilteredH2SMunicipalities, setFilteredH2SMunicipalities] = useState([])
    const [H2SPovincesFound, setH2SPovincesFound] = useState(false)
    const [SelectedH2SProvince, setSelectedH2SProvince] = useState('')
    const [isFoundH2SPovinces, setisFoundH2SPovinces] = useState(false)
    const [isFoundH2SMunicipality, setisisFoundH2SMunicipality] = useState(false)
    const [isFoundH2SMunicipalityRisk, setisFoundH2SMunicipalityRisk] = useState(false)
    const [SelectedH2SProvinceRisk, setSelectedH2SProvinceRisk] = useState(false)


    useEffect(() => {
        axios.get(api + 'get_results_per_province').then(respond => {
            setProvinces(respond.data.results)
            setIsProvinces(respond.data.success)
        }, err => {
            console.log(err)
        })

        axios.get(api + 'get_results_per_municipalities').then(respond => {
            console.log(respond.data.success)
            setAllMunicipalities(respond.data.results)
        }, err => {
            console.log(err)
        })
        //get_h2s_by_province
        axios.get(api + 'get_h2s_by_province').then(respond => {
            setH2SPovincesFound(respond.data.success)
            setisFoundH2SPovinces(respond.data.success)
            setH2SPovinces(respond.data.rows)
            setH2SMunicipalitiesRisk(respond.data.results)
            setH2SMunicipalities(respond.data.result)
            console.log(respond.data)
        }, err => {
            console.log(err)
        })
    }, [])

    // report for province
    const province_report = {
        labels: Provinces.map(value => { return value.province_name }),
        datasets: [{
            data: Provinces.map(value => { return value.province_total }),
            backgroundColor: ["green", "yellow", 'pink', 'red', 'purple', 'blue', 'brown', 'black', 'white']
        }]
    }
    //report for municipality
    const municipal_report = {
        labels: FiteredMunicipalities.map(value => { return value.muni_name }),
        datasets: [{
            data: FiteredMunicipalities.map(value => { return value.muni_count }),
            backgroundColor: ["green", "yellow", 'pink', 'red', 'purple', 'blue', 'brown', 'black', 'white']
        }]
    }

    //h2s report per province
    const h2s_province_report = {
        labels: H2SPovinces.map(value => { return value.province_name }),
        datasets: [{
            data: H2SPovinces.map(value => { return value.province_total }),
            backgroundColor: ["green", "yellow", 'pink', 'red', 'purple', 'blue', 'brown', 'black', 'white']
        }]
    }
    //h2s report per municipality
    const h2s_municipal_report = {
        labels: FilteredH2SMunicipalities.map(value => { return value.muni_name }),
        datasets: [{
            data: FilteredH2SMunicipalities.map(value => { return value.muni_count }),
            backgroundColor: ["green", "yellow", 'pink', 'red', 'purple', 'blue', 'brown', 'black', 'white']
        }]
    }

        //h2s report per risk
        const h2s_risk_report = {
            labels: FilteredH2SMunicipalitiesRisk.map(value => { return value.risk_type }),
            datasets: [{
                data: FilteredH2SMunicipalitiesRisk.map(value => { return value.count_risk }),
                backgroundColor: ["green", "yellow", 'pink', 'red', 'purple', 'blue', 'brown', 'black', 'white']
            }]
        }

    function collapse_province(province_id) {
        var newId = {
            province_id: province_id
        }

        var tempFilter = AllMunicipalities
        setIsFoundMunicipality(true)
        setFiteredMunicipalities(tempFilter.filter(muni => {
            return muni.province_id?.toLocaleLowerCase().includes(province_id?.toLocaleLowerCase())
        }))
        setExpandSelectedProvince(newId)
    }

    function h2s_province(province_id) {
        var tempFilter = H2SMunicipalities
        setFilteredH2SMunicipalities(tempFilter.filter(muni => {
            return muni.province_id?.toLocaleLowerCase().includes(province_id?.toLocaleLowerCase())
        }))
        setSelectedH2SProvince(province_id)
        setisFoundH2SPovinces(false)
        setisisFoundH2SMunicipality(true)
        setisFoundH2SMunicipalityRisk(false)
        setSelectedH2SProvinceRisk(false)
        console.log(tempFilter)
    }

    function h2s_results(municipal_id) {
        var tempFilter = H2SMunicipalitiesRisk
        console.log(municipal_id)

        console.log(tempFilter)
        setFilteredH2SMunicipalitiesRisk(tempFilter.filter(muni => {
            return muni.muni_id?.toLocaleLowerCase().includes(municipal_id?.toLocaleLowerCase())
        }))
        setisFoundH2SPovinces(false)
        setisisFoundH2SMunicipality(false)
        setisFoundH2SMunicipalityRisk(true)
        setSelectedH2SProvinceRisk(true)
        console.log(FilteredH2SMunicipalitiesRisk)

    }


    return (
        <div className='hero-all' >
            <Admin_NavBar />
            <div className='content-municipalities'>
                <Header />
                <div className='container-wrapper mb-5'>
                    <h2>Simra Reports</h2>
                    <div className='reports' >
                        <div id='today_report' className='section-report'>
                            <h5>Todays Report</h5>
                            <h6>0 &nbsp;Reported</h6>
                        </div>


                        <div className='section-report' id='report_per_prov'>
                            <h5>Total Reports For Every province</h5>
                            <div className='content-report'>
                                <div className='description-report'>
                                    {IsProvinces && <>
                                        {Provinces.map((prov, xid) => (
                                            <div key={xid}>
                                                <table>
                                                    <tr onClick={() => collapse_province(prov.province_id)} className='collapsible' >
                                                        <td className='province_name'>{prov.province_name}</td>
                                                        <td className='province_count'>{prov.province_total}</td>
                                                    </tr>
                                                </table>
                                                {ExpandSelectedProvince.province_id === prov.province_id && <>
                                                    <div className='drop-province' id='collapse1'>
                                                        <div className='province-content'>
                                                            <table>
                                                                <th className='municipal_name'>Municipality</th>
                                                                <th className='municipal_count'>results</th>
                                                                {FiteredMunicipalities.map((muni, xid) => (
                                                                    <tr key={xid}>
                                                                        <td className='municipal_name'>{muni.muni_name} </td>
                                                                        <td className='municipal_count'>{muni.muni_count}</td>
                                                                    </tr>
                                                                ))}
                                                            </table>
                                                        </div>
                                                    </div>
                                                </>}
                                            </div>
                                        ))}
                                    </>}
                                </div>
                                <div className='report_visualization'>
                                    {!IsFoundMunicipality && <>
                                        <div className='pie-display' style={{ width: '400px', height: '400px' }}>
                                            <Pie data={province_report} />
                                        </div>
                                    </>}
                                    {IsFoundMunicipality && <>
                                        <div className='pie-display' style={{ width: '400px', height: '400px' }}>
                                            <Pie data={municipal_report} />
                                        </div>
                                    </>}

                                </div>
                            </div>
                        </div>

                        <div className='section-report' id='report_per_prov'>
                            <h5>Total H2S Reports For Every province</h5>
                            <div className='content-report'>
                                <div className='description-report'>
                                    {H2SPovincesFound && <>
                                        {H2SPovinces.map((prov, xid) => (
                                            <div key={xid}>
                                                <table>
                                                    <tr onClick={() => h2s_province(prov.province_id)} className='collapsible' >
                                                        <td className='province_name'>{prov.province_name}</td>
                                                        <td className='province_count'>{prov.province_total}</td>
                                                    </tr>
                                                </table>
                                                {SelectedH2SProvince === prov.province_id && <>
                                                    <div className='drop-province' id='collapse1'>
                                                        <div className='province-content'>
                                                            <table>
                                                                <th className='municipal_name'>Municipality</th>
                                                                <th className='municipal_count'>results</th>
                                                                {FilteredH2SMunicipalities.map((muni, xid) => (
                                                                    <tr key={xid} onClick={() => h2s_results(muni.muni_id)}>
                                                                        <td className='municipal_name'>{muni.muni_name} </td>
                                                                        <td className='municipal_count'>{muni.muni_count}</td>
                                                                    </tr>
                                                                ))}
                                                            </table>

                                                            {SelectedH2SProvinceRisk && <> <table>

                                                                {FilteredH2SMunicipalitiesRisk.map((risk, xid) => (
                                                                    <tr key={xid} className='btn-disabled'>
                                                                        <td className='municipal_name'>{risk.risk_type} </td>
                                                                        <td className='municipal_count'>{risk.count_risk}</td>
                                                                    </tr>
                                                                ))}

                                                            </table>
                                                            </>}

                                                        </div>
                                                        <div>
                                                            <div className='drop-province' id='collapse1'>
                                                                <div className='province-content'>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>}
                                            </div>
                                        ))}

                                    </>}
                                </div>
                                <div className='report_visualization'>
                                    {isFoundH2SPovinces && <div className='pie-display' style={{ width: '400px', height: '400px' }}>
                                            <Pie data={h2s_province_report} />
                                        </div>
                                    }
                                    
                                    {isFoundH2SMunicipality && <div className='pie-display' style={{ width: '400px', height: '400px' }}>
                                            <Pie data={h2s_municipal_report} />
                                        </div>}
                                        
                                    {isFoundH2SMunicipalityRisk && <div className='pie-display' style={{ width: '400px', height: '400px' }}>
                                            <Pie data={h2s_risk_report} />
                                        </div>}
                                </div>
                            </div>

                        </div>
                        <div className="section-reports">
                            <div className='section-report' id='report_per_prov'>


                            </div>

                            <div className='section-report'>
                                <h5>Total H2S Reports For Every province</h5>
                                {H2SPovincesFound && <>
                                    {H2SPovinces.map((prov, xid) => (
                                        <div key={xid}>
                                            <table>
                                                <tr onClick={() => h2s_province(prov.province_id)} className='collapsible' >
                                                    <td className='province_name'>{prov.province_name}</td>
                                                    <td className='province_count'>{prov.province_total}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    ))}

                                </>}
                            </div>

                            <div className='section-report'>
                                <h5>Todays Report</h5>
                                <h6>0 &nbsp;Reported</h6>
                            </div>

                            <div className='section-report'>
                                <h5>Todays Report</h5>
                                <h6>0 &nbsp;Reported</h6>
                            </div>

                            <div className='section-report'>
                                <h5>Todays Report</h5>
                                <h6>0 &nbsp;Reported</h6>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Municipality
