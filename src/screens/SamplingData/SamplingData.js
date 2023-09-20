import './SamplingData.css'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

function SamplingData() {

    const navigate = useNavigate();
    const tempData = useLocation();
    const [UserId] = useState(tempData.state.userId)
    const [provinces, setProvinces] = useState([])
    const [Municipalities, setMunicipalities] = useState([])
    const [WaterSource, setWaterSource] = useState('');
    const [WaterAccessibility, setWaterAccessibility] = useState('');
    const [WeatherCondition, setWeatherCondition] = useState('');
    
    const api = 'http://localhost:3001/api/'

    useEffect(() => {
        axios.get(api + 'get_provinces').then(response => {
            setProvinces(response.data.results)
        }, err => {
            console.log(err)
        })
    }, [provinces])

    function getAllMunicipalities(event){
        var prov_id = event.target.value
        console.log(prov_id)
        axios.get(api + 'get_municipalities/'+prov_id).then(response => {
            setMunicipalities(response.data.results)
            
        }, err => {
            console.log(err)
        })
    }

    function SelectMunicipality(event){
        console.log(event.target.value)
    }

    function submit_sampling_data() {
        if (WaterSource === "") {
            return
        }
        if (WaterAccessibility === "") {
            return
        }
        if (WeatherCondition === "") {
            return
        }
        var temp = {
            type: WaterSource,
            waterAccessability: WaterAccessibility,
            weatherCondition: WeatherCondition,
            userId: UserId
        }
        navigate('/level1', { state: { temp } })
    }

    return (
        <div className='samplingData'>
            <div className='form-group'>
                <label>Province</label>
                <select onChange={getAllMunicipalities}>
                <option>---Select---</option>
                    {provinces.map((prov, xid) => (
                        <option key={xid} className="control-form" value={prov.province_id} >{prov.province_name}</option>
                    ))}
                </select>
            </div>

            <div className='form-group'>
            <label>Municipality</label>
            <select onChange={SelectMunicipality}>
                <option>---Select---</option>
                    {Municipalities.map((muni, xid) => (
                        <option key={xid} className="control-form" value={muni.muni_id} >{muni.muni_name}</option>
                    ))}
                </select>
            </div>

            <div className='form-group'>
                <label>Water Source</label>
                <select className='select-sampling_data' onChange={(event) => setWaterSource(event.target.value)}>
                    <option value='' className="control-form">---Select---</option>
                    <option value='River' className="control-form">River</option>
                    <option value='Dam' className="control-form">Dam</option>
                    <option value='Spring' className="control-form">Spring</option>
                    <option value='Borehole' className="control-form">Borehole</option>
                    <option value='Dug Well' className="control-form">Dug Well</option>
                    <option value='Household Tap Water' className="control-form">Household Tap Water</option>
                    <option value='Housewater Stored Water' className="control-form">Housewater Stored Water</option>
                    <option value='Wastewater Treatment Plant' className="control-form">Wastewater Treatment Plant</option>
                    <option value='water Treatment Plant' className="control-form">water Treatment Plant</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Water Accessibility</label>
                <select className='select-sampling_data' onChange={(event) => setWaterAccessibility(event.target.value)}>
                    <option value='' className="control-form">---Select---</option>
                    <option value='Hard' className="control-form">Hard</option>
                    <option value='Easy' className="control-form">Easy</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Weather Condition</label>
                <select className='select-sampling_data' onChange={(event) => setWeatherCondition(event.target.value)}>
                    <option value='' className="control-form">---Select---</option>
                    <option value='Dry' className="control-form">Dry</option>
                    <option value='Windy' className="control-form">Windy</option>
                    <option value='cloudy' className="control-form">cloudy</option>
                    <option value='Snow' className="control-form">Snow</option>
                    <option value='Thunder and Lightning' className="control-form">Thunder and Lightning</option>
                    <option value='Frost and Ice' className="control-form">Frost and Ice</option>
                    <option value='Rainy' className="control-form">Rainy</option>
                    <option value='Fog' className="control-form">Fog</option>
                    <option value='Sunny' className="control-form">Sunny</option>
                </select>
            </div>
            <button className='btn btn-primary' onClick={submit_sampling_data}>Next</button>
        </div>
    );
}
export default SamplingData