import './SamplingData.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import PopUpAlert from '../Pop_Up/Pop_Up'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { sampling_details } from '../../Redux/sampling_data'
import Level2PopUp from '../Pop_Up/Pop_Up_Level2'
import Level3PopUp from '../Pop_Up/Pop_Up_Level3'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../Data/API';
import Load_Waves from '../Pop_Up/load/Load_Waves';

function SamplingData() {
    let user_info = useSelector((state) => state.user.value)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([])
    const [Municipalities, setMunicipalities] = useState([])
    const [WaterSource, setWaterSource] = useState('');
    const [WaterAccessibility, setWaterAccessibility] = useState('');
    const [WeatherCondition, setWeatherCondition] = useState('');
    const [Municipality, setMunicipality] = useState('');
    const [Province, setProvince] = useState('');
    const [Longitude, setLongitude] = useState('')
    const [Latitude, setLatitude] = useState('')
    const [PopUpAlertMessage, setPopUpAlertMessage] = useState(false)
    let [Level2UserPopUp, setLevel2UserPopUp] = useState(false);
    let [Level3UserPopUp, setLevel3UserPopUp] = useState(false);
    const [ButtonPopup, setButtonPopup] = useState(false);


    useEffect(() => {
        axios.get(api + 'get_provinces').then(response => {
            setProvinces(response.data.results)
        }, err => {
            console.log(err)
        })
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLongitude(longitude)
            setLatitude(latitude)
        })
    }, [provinces])

    function getAllMunicipalities(event) {
        var prov_id = event.target.value
        axios.get(api + 'get_municipalities/' + prov_id).then(response => {
            setMunicipalities(response.data.results)
            setProvince(response.data.results)
        }, err => {
            console.log(err)
        })
    }
    function SelectMunicipality(event) {
        setMunicipality(event.target.value)
    }

    function submit_sampling_data() {
        setButtonPopup(true)
        if (Province === "") {
            toast.warn(`Select Province`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        if (Municipality === "") {
            toast.warn(`Select Municipality`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        if (WaterSource === "") {
            toast.warn(`Select Water Source`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        if (WaterAccessibility === "") {
            toast.warn(`Select Water Accessibility`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        if (WeatherCondition === "") {
            toast.warn(`Select Weather Condition`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        var temp = {
            type: WaterSource,
            waterAccessability: WaterAccessibility,
            weatherCondition: WeatherCondition,
            muni_id: Municipality,
            userId: user_info.userId,
            latitude: Latitude,
            longitude: Longitude
        }
        dispatch(sampling_details(temp))

        if (Latitude === '' || Longitude === '') {
            toast.warn(`Cannot detect your location you can proceed with the application but you will not
            get the results and we wont be able to capture your information provided!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        setTimeout(() => {
            setButtonPopup(false)
            if (user_info.user_level === 1) {
                navigate('/h2s_survey')
            }
            else if (user_info.user_level === 2) {
                setLevel2UserPopUp(true)
            }
            else if (user_info.user_level === 3) {
                setLevel3UserPopUp(true)
            }
        }, 6000)

    }
    let AlertMessage = <div>
        <p>Cannot detect your location you can proceed with the application but it will not
            get the results and we wont be able to capture your information provided</p>
        <br />
        <button className='btn btn-success' onClick={() => navigate('/level1')}></button>
    </div>

    const leve2popup = <div>
        <button className='level_popup level1_class ' onClick={() =>navigate('/h2s_survey')}>Level One (Household)</button>
        <button className='level_popup level2_class ' onClick={() =>navigate('/fib_analysis')}>Level Two (Intermidiate)</button>
    </div>

    const leve3popup = <div>
        <button className='level_popup level1_class  ' onClick={() =>navigate('/h2s_survey')}>Level One (Household)</button>
        <button className='level_popup level2_class ' onClick={() =>navigate('/fib_analysis')}>Level Two (Intermidiate)</button>
        <button className='level_popup level3_class ' onClick={()=> navigate('/level3')}>Level Three (Expert)</button>
    </div>

    return (
        <div className='hero-all' >
            <Navbar />
            <div className='content'>
                <Header />
                <h2 className='text-primary text-center'>Sampling Data</h2>
                <div className='container-wrapper'>
                <Load_Waves trigger={ButtonPopup} setTrigger={setButtonPopup}>
                        <div></div>
                    </Load_Waves>
                    <ToastContainer />
                  
                    <PopUpAlert trigger={PopUpAlertMessage} setTrigger={setPopUpAlertMessage} >
                        {AlertMessage}
                    </PopUpAlert>
                    <Level2PopUp trigger={Level2UserPopUp} setTrigger={setLevel2UserPopUp}>
                        {leve2popup}
                    </Level2PopUp>
                    <Level3PopUp trigger={Level3UserPopUp} setTrigger={setLevel3UserPopUp}>
                        {leve3popup}
                    </Level3PopUp>
                    <div className='form-group'>
                        {/* <label>Province</label> */}
                        <select className='select-sampling_data form-select w-75 mb-4 align-self-center' onChange={getAllMunicipalities}>
                            <option>Select Province</option>
                            {provinces.map((prov, xid) => (
                                <option key={xid} className="control-form" value={prov.province_id} >{prov.province_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='form-group'>
                        {/* <label>Municipality</label> */}
                        <select className='select-sampling_data form-select w-75 mb-4 align-self-center' onChange={SelectMunicipality}>
                            <option>Select Municipality</option>
                            {Municipalities.map((muni, xid) => (
                                <option key={xid} className="control-form" value={muni.muni_id} >{muni.muni_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        {/* <label>Water Source</label> */}
                        <select className='select-sampling_data form-select w-75 mb-4 align-self-center' onChange={(event) => setWaterSource(event.target.value)}>
                            <option value='' className="control-form">Select Water Source</option>
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
                        {/* <label>Water Accessibility</label> */}
                        <select className='select-sampling_data form-select w-75 mb-4 align-self-center' onChange={(event) => setWaterAccessibility(event.target.value)}>
                            <option value='' className="control-form">Select Water Accessibility</option>
                            <option value='Hard' className="control-form">Hard</option>
                            <option value='Easy' className="control-form">Easy</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        {/* <label>Weather Condition</label> */}
                        <select className='select-sampling_data form-select w-75 mb-5 align-self-center ' onChange={(event) => setWeatherCondition(event.target.value)}>
                            <option value='' className="control-form">Select Weather Condition</option>
                            <option value='Dry' className="control-form">Dry</option>
                            <option value='Windy' className="control-form">Wet</option>
                           
                        </select>
                    </div>
                    <button className='btn btn-success btn-lg w-25' onClick={submit_sampling_data}>Next</button>
                </div>

            </div>
            <footer>
                <Footer />
            </footer>

        </div>

    );
}
export default SamplingData