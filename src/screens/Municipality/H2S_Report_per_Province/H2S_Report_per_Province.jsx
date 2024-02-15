import axios from 'axios'
import { useEffect, useState } from 'react';
import { api } from '../../../Data/API';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


function H2S_Report_per_Province() {
    // H2S reports
    //province Reports
    const [Provinces, setProvinces] = useState([])
    const [IsProvinces, setIsProvinces] = useState(false)
    const [SelectedProvince, setSelectedProvince] = useState('')
    const [SelectedMunicipality, setSelectedMunicipality] = useState('')
    const [RiskCharacters, setRiskCharacters] = useState([])
    const [IsFoundRiskCharacters, setIsFoundRiskCharacters] = useState(false)

    const [AllMunicipalities, setAllMunicipalities] = useState([])
    const [IsFoundMunicipality, setIsFoundMunicipality] = useState(false)

    //visualize
    const [IsProvincesView, setIsProvincesView] = useState(false)
    const [IsFoundRiskCharactersView, setIsFoundRiskCharactersView] = useState(false)
    const [IsFoundMunicipalityView, setIsFoundMunicipalityView] = useState(false)


    useEffect(() => {

        //get_h2s_by_province
        axios.get(api + 'h2s_province').then(respond => {
            setIsProvinces(respond.data.success)
            if (respond.data.success) {
                setProvinces(respond.data.results)
                setIsProvincesView(respond.data.success)
            }

        }, err => {
            console.log(err)
        })
    }, [])

    //h2s report per province
    const h2s_province_report = {
        labels: Provinces.map(value => { return value.province_name }),
        datasets: [{
            data: Provinces.map(value => { return value.muni_count }),
            backgroundColor: ['red', 'purple', 'blue', 'green', 'yellow', 'pink', 'brown', 'black', 'white']
        }]
    }
    //h2s report per municipality
    const h2s_municipal_report = {
        labels: AllMunicipalities.map(value => { return value.muni_name }),
        datasets: [{
            data: AllMunicipalities.map(value => { return value.count_risk }),
            backgroundColor: [ 'blue', 'brown', "yellow", 'pink', 'red', 'purple',"green", 'black', 'white']
        }]
    }

    //h2s report per risk
    const h2s_risk_report = {
        labels: RiskCharacters.map(value => { return value.risk_type }),
        datasets: [{
            data: RiskCharacters.map(value => { return value.count_risk }),
            backgroundColor: [ 'pink',"green", "yellow", 'red', 'purple', 'blue', 'brown', 'black', 'white']
        }]
    }

    const province_report = {
        labels: Provinces.map(value => { return value.province_name }),
        datasets: [{
            data: Provinces.map(value => { return value.province_total }),
            backgroundColor: ["green", "yellow", 'pink', 'red', 'purple', 'blue', 'brown', 'black', 'white']
        }]
    }


    function h2s_province(province_id) {
        axios.get(api + 'h2s_municipality/' + province_id).then(respond => {
            setIsFoundMunicipality(respond.data.success)
            if (respond.data.success) {

                setAllMunicipalities(respond.data.results)
                setSelectedProvince(province_id)
                
                // Configure booleans on view
                setIsFoundMunicipalityView(respond.data.success)
                setIsProvincesView(false)
                setIsFoundRiskCharactersView(false)
            }
        }, err => {
            console.log(err)
        })
    }

    function h2s_results(municipal_id) {
        console.log(municipal_id)
        setSelectedMunicipality(municipal_id)

        axios.get(api + 'h2s_risk_results/' + municipal_id).then(respond => {
            setIsFoundRiskCharacters(respond.data.success)
            if (respond.data.success) {
                setRiskCharacters(respond.data.results)
                setIsFoundMunicipality(false)

                // Configure booleans on view
                setIsFoundMunicipalityView(false)
                setIsProvincesView(false)
                setIsFoundRiskCharactersView(respond.data.success)
            }

        }, err => {
            console.log(err)
        })

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
                                                        {RiskCharacters.map((risk, rid) => (
                                                            <tr key={rid} className='risk_char'>
                                                                <td className='risk_name'>{risk.risk_type} </td>
                                                                <td className='risk_count'>{risk.count_risk}</td>
                                                            </tr>
                                                        ))}

                                                    </>}
                                                </>
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
                {IsProvincesView && <div className='pie-display' style={{ width: '400px', height: '400px' }}>
                    <Pie data={h2s_province_report} />
                </div>
                }

                {IsFoundMunicipalityView && <div className='pie-display' style={{ width: '400px', height: '400px' }}>
                    <Pie data={h2s_municipal_report} />
                </div>}

                {IsFoundRiskCharactersView && <div className='pie-display' style={{ width: '400px', height: '400px' }}>
                    <Pie data={h2s_risk_report} />
                </div>}
            </div>
        </div>
    )
}

export default H2S_Report_per_Province;