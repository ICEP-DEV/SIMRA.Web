
import axios from 'axios';
import './SanitaryInpection.css'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
function SanitaryInpection() {
    const navigate = useNavigate()

    const tempData = useLocation();
    const [SamplingData] = useState(tempData.state.temp)

    const [SanitaryInpectionItems, setSanitaryInpectionItems] = useState({
        pitLatrine: false,
        domesticAnimal: false,
        diaperDisposal: false,
        wasteWaterRelease: false,
        openDefaction: false,
        unprotectedWaterSource: false,
        agriculturalActivity: false,
        observerLaundryActivity: false,
        samplingId: 0
    });
    const [Longitude, setLongitude] = useState('')
    const [Latitude, setLatitude] = useState('')
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLongitude(longitude)
            setLatitude(latitude)
        })
    })

    const handleChangeUpdate = e => {
        setSanitaryInpectionItems((currentState) => ({
            ...currentState,
            [e.target.name]: Boolean(e.target.value),
        }))

    }



    function senduseSanitaryInpectionSurvey() {

        axios.post("http://localhost:3001/api/sampling_data", SamplingData).then((response) => {
            SanitaryInpectionItems.samplingId = response.data.insertedId
            var coordinates = {
                latitude: Latitude,
                longitude: Longitude,
                samplingId: response.data.insertedId
            }
            axios.post("http://localhost:3001/api/coordinates", coordinates).then((result) => {
                console.log(result)
            }, err => {
                console.log(err)
            })
            axios.post("http://localhost:3001/api/watersource", SamplingData).then((result) => {
                console.log(result)
            }, err => {
                console.log(err)
            })

            axios.post("http://localhost:3001/api/sanitary_inspection_survey", SanitaryInpectionItems)
                .then((result) => {
                    console.log(result.data.success)
                    var temp = result.data
                    if (result.data.success === true) {
                        navigate("/data_results", { state: { temp } })
                    }
                }, err => {
                    console.log(err)
                })
        }, (err) => {
            console.log(err)
        })
    }

    return (
        <div className='sanitaryInpection'>
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Yes</th>
                            <th scope="col">No</th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        <tr>
                            <th scope="row">1. Are There pit-latrines?</th>
                            <td><input type='radio' onChange={handleChangeUpdate} value='true' name='pitLatrine' /></td>
                            <td><input type='radio' onChange={handleChangeUpdate} value='' name='pitLatrine' /></td>
                        </tr>
                        <tr>
                            <th scope="row">2. Are There any domestic animals observer?</th>
                            <td><input type='radio' onChange={handleChangeUpdate} value='true' name='domesticAnimal' /></td>
                            <td><input type='radio' onChange={handleChangeUpdate} value='' name='domesticAnimal' /></td>
                        </tr>
                        <tr>
                            <th scope="row">3. Diapers Disposal?</th>
                            <td><input type='radio' onChange={handleChangeUpdate} value='true' name='diaperDisposal' /></td>
                            <td><input type='radio' onChange={handleChangeUpdate} value='' name='diaperDisposal' /></td>
                        </tr>
                        <tr>
                            <th scope="row">4. Release of wastewater?</th>
                            <td><input type='radio' onChange={handleChangeUpdate} value='true' name='wasteWaterRelease' /></td>
                            <td><input type='radio' onChange={handleChangeUpdate} value='' name='wasteWaterRelease' /></td>
                        </tr>
                        <tr>
                            <th scope="row">5. Open defaction?</th>
                            <td><input type='radio' onChange={handleChangeUpdate} value='true' name='openDefaction' /></td>
                            <td><input type='radio' onChange={handleChangeUpdate} value='' name='openDefaction' /></td>
                        </tr>
                        <tr>
                            <th scope="row">6. Is the water source unprotected?</th>
                            <td><input type='radio' onChange={handleChangeUpdate} value='true' name='unprotectedWaterSource' /></td>
                            <td><input type='radio' onChange={handleChangeUpdate} value='' name='unprotectedWaterSource' /></td>
                        </tr>
                        <tr>
                            <th scope="row">7. Agricultural Activities?</th>
                            <td><input type='radio' onChange={handleChangeUpdate} value='true' name='agriculturalActivity' /></td>
                            <td><input type='radio' onChange={handleChangeUpdate} value='' name='agriculturalActivity' /></td>
                        </tr>
                        <tr>
                            <th scope="row">8. Observer laundry Activities?</th>
                            <td><input type='radio' onChange={handleChangeUpdate} value='true' name='observerLaundryActivity' /></td>
                            <td><input type='radio' onChange={handleChangeUpdate} value='' name='observerLaundryActivity' /></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={senduseSanitaryInpectionSurvey} className='btn btn-primary'>Submit</button>
            </div>
        </div>
    );
}

export default SanitaryInpection