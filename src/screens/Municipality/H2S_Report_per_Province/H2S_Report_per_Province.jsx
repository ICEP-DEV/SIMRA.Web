import axios from 'axios'
import { useEffect, useState } from 'react';
import { api } from '../../../Data/API';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


function H2S_Report_per_Province() {
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
    //province Reports
    const [Provinces, setProvinces] = useState([])
    const [IsProvinces, setIsProvinces] = useState(false)
    const [SelectedProvince, setSelectedProvince] = useState('')
    const [SelectedMunicipality, setSelectedMunicipality] = useState('')

    const [ExpandSelectedProvince, setExpandSelectedProvince] = useState([])
    const [AllMunicipalities, setAllMunicipalities] = useState([])
    const [IsFoundMunicipality, setIsFoundMunicipality] = useState(false)
    const [FiteredMunicipalities, setFiteredMunicipalities] = useState([])

    useEffect(() => {

        //get_h2s_by_province
        axios.get(api + 'h2s_province').then(respond => {
            setIsProvinces(respond.data.success)
            if (respond.data.success) {
                setProvinces(respond.data.results)
                //setAllMunicipalities(respond.data.results)
            }

        }, err => {
            console.log(err)
        })
    }, [])

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


    function h2s_province(province_id) {
        axios.get(api + 'h2s_municipality/' + province_id).then(respond => {
            setIsFoundMunicipality(respond.data.success)
            if (respond.data.success) {
                setAllMunicipalities(respond.data.results)
                console.log(respond.data.results)
                setSelectedProvince(province_id)
            }
        })

        /*
        setSelectedH2SProvince(province_id)
        setisFoundH2SPovinces(false)
        setisisFoundH2SMunicipality(true)
        setisFoundH2SMunicipalityRisk(false)
        setSelectedH2SProvinceRisk(false)*/
        //console.log(tempFilter)
    }

    function h2s_results(municipal_id) {
        console.log(municipal_id)
        setSelectedMunicipality(municipal_id)

        /*var tempFilter = H2SMunicipalitiesRisk
        console.log(municipal_id)

        console.log(tempFilter)
        setFilteredH2SMunicipalitiesRisk(tempFilter.filter(muni => {
            return muni.muni_id?.toLocaleLowerCase().includes(municipal_id?.toLocaleLowerCase())
        }))
        setisFoundH2SPovinces(false)
        setisisFoundH2SMunicipality(false)
        setisFoundH2SMunicipalityRisk(true)
        setSelectedH2SProvinceRisk(true)
        console.log(FilteredH2SMunicipalitiesRisk)*/

    }

    return (
        <div className='content-report'>
            <div className='description-report'>
                {IsProvinces && <>
                    {Provinces.map((prov, xid) => (
                        <div key={xid}>
                            <table>
                                <tr onClick={() => h2s_province(prov.province_id)} className='collapsible' >
                                    <td className='province_name'>{prov.province_name}</td>
                                    <td className='province_count'>{prov.muni_count}</td>
                                </tr>
                            </table>
                            {SelectedProvince === prov.province_id && <>
                                <div className='drop-province' id='collapse1'>
                                    <div className='province-content'>
                                        <table>
                                            <th className='municipal_name'>Municipality</th>
                                            <th className='municipal_count'>results</th>
                                            {AllMunicipalities.map((muni, xid) => (
                                                <>
                                                    <tr key={xid} onClick={() => h2s_results(muni.muni_id)}>
                                                        <td className='municipal_name'>{muni.muni_name} </td>
                                                        <td className='municipal_count'>{muni.count_risk}</td>
                                                    </tr>
                                                    {SelectedMunicipality == muni.muni_id && <>
                                                        <tr>66556</tr>
                                                        <tr>85859</tr>
                                                    </>}
                                                </>
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
    )
}

export default H2S_Report_per_Province;