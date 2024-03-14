
import axios from 'axios'
import { useEffect, useState } from 'react';
import { api } from '../../../Data/API';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


function Total_Report_Per_Province() {

    const [Provinces, setProvinces] = useState([])
    const [IsProvinces, setIsProvinces] = useState(false)
    const [ExpandSelectedProvince, setExpandSelectedProvince] = useState([])
    const [AllMunicipalities, setAllMunicipalities] = useState([])
    const [IsFoundMunicipality, setIsFoundMunicipality] = useState(false)
    const [FiteredMunicipalities, setFiteredMunicipalities] = useState([])

    useEffect(() => {
        axios.get(api + 'get_results_per_province').then(respond => {//get provinces
            setProvinces(respond.data.results)
            setIsProvinces(respond.data.success)
        }, err => {
            console.log(err)
        })

        axios.get(api + 'get_results_per_municipalities').then(respond => {
            setAllMunicipalities(respond.data.results)///get municipalities
        }, err => {
            console.log(err)
        })
    },[])

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
    return (
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
    )

}



export default Total_Report_Per_Province