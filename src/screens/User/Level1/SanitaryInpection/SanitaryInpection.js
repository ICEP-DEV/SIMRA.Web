import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import React from 'react'
import './SanitaryInpection.css'
import { Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PooUp from '../../../Pop_Up/Pop_Up'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import methods from '../../../../Data/methods';
import { useNavigate } from 'react-router-dom';


function SanitaryInpection() {
    var navigate = useNavigate()
    let sampling_info = useSelector((state) => state.sampling.value)
    //////data results
    const [DataAnalysis, setDataAnalysis] = useState({})
    const [backgroundColor, setbackgroundColor] = useState('')
    let [SelectPopUp, setSelectPopUp] = useState(false);
    const [Methods, setMethods] = useState(methods)
    useEffect(() => {

        if (DataAnalysis.message !== "adedd hydrogensulfide") {
            if (DataAnalysis.total_avarage < 26) { setbackgroundColor("rgba(0, 128, 0, 0.719)") }
            else if (DataAnalysis.total_avarage > 25 && DataAnalysis.total_avarage < 51) { setbackgroundColor("rgba(255, 255, 0, 0.733)") }
            else if (DataAnalysis.total_avarage > 50 && DataAnalysis.total_avarage < 76) { setbackgroundColor("rgb(201, 199, 105)") }
            else { setbackgroundColor("rgba(216, 0, 0, 0.986)") }
        }
        else {
            if (DataAnalysis.status === true) {
                setbackgroundColor("rgba(216, 0, 0, 0.986)")
            }
            else {
                setbackgroundColor("rgba(0, 128, 0, 0.719)")
            }
        }

    }, [DataAnalysis])

    let sanitary = <div>
        <h2>Analysis: Sanitary</h2>
        <h3>Risk Characterization</h3>
        <div className='form-group'>
            <label>{DataAnalysis.risk_type}</label>
            <input type='text' className='low_risk risk_parce' style={{ backgroundColor: backgroundColor }} disabled />
        </div>
    </div>;

    let h2s = <div>
        <h2>Analysis: H2S</h2>
        <h3>Risk Characterization</h3>
        <div className='form-group'>
            <label>{DataAnalysis.risk_type}</label>
            <input type='text' className='low_risk risk_parce' style={{ backgroundColor: backgroundColor }} disabled />
        </div>
    </div>
    
    const [SanitaryInpectionItems, setSanitaryInpectionItems] = useState(
        {
            pitLatrine: false,
            domesticAnimal: false,
            diaperDisposal: false,
            wasteWaterRelease: false,
            openDefaction: false,
            unprotectedWaterSource: false,
            agriculturalActivity: false,
            observerLaundryActivity: false,
            samplingId: 0
        }
    );
    const [Longitude, setLongitude] = useState('')
    const [Latitude, setLatitude] = useState('')
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLongitude(longitude)
            setLatitude(latitude)
        })
    })

    const handleChangeUpdate = (e) => {
        let sanitary = SanitaryInpectionItems;
        sanitary[e.target.value] = e.target.checked;
        setSanitaryInpectionItems(sanitary)
    }
    
    function senduseSanitaryInpectionSurvey() {
        //validate the radio buttons
        console.log(SanitaryInpectionItems)
        if (SanitaryInpectionItems.agriculturalActivity === undefined || SanitaryInpectionItems.diaperDisposal === undefined || SanitaryInpectionItems.domesticAnimal === undefined ||
            SanitaryInpectionItems.observerLaundryActivity === undefined || SanitaryInpectionItems.openDefaction === undefined || SanitaryInpectionItems.samplingId === undefined ||
            SanitaryInpectionItems.unprotectedWaterSource === undefined || SanitaryInpectionItems.wasteWaterRelease === undefined) {
            toast.warn("All the field the must be checked!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            //initModalsing();
            return;
        }

        //Call in sampling data api
        axios.post("http://localhost:3001/api/sampling_data", sampling_info).then((response) => {
            SanitaryInpectionItems.samplingId = response.data.insertedId
            // Assign to Coordinates object
            var coordinates = {
                latitude: Latitude,
                longitude: Longitude,
                samplingId: response.data.insertedId
            }
            //Call in coordinates api
            axios.post("http://localhost:3001/api/coordinates", coordinates).then((result) => {
                console.log(result)
            }, err => {
                console.log(err)
            })
            // Assign to watersource object
            var watersource = {
                samplingId: response.data.insertedId,
                type: sampling_info.type,
                waterAccessability: sampling_info.waterAccessability
            }
            //Call in watersource api
            axios.post("http://localhost:3001/api/watersource", watersource).then((result) => {
                console.log(result)
            }, err => {
                console.log(err)
            })

            axios.post("http://localhost:3001/api/sanitary_inspection_survey", SanitaryInpectionItems)
                .then((result) => {
                    setDataAnalysis(result.data)
                    // navigate("/data_results", { state: { temp } })

                    if (result.data.success === true) {
                        if (DataAnalysis.message !== "adedd hydrogensulfide") {
                            if (DataAnalysis.total_avarage < 26) { setbackgroundColor("rgba(0, 128, 0, 0.719)") }
                            else if (DataAnalysis.total_avarage > 25 && DataAnalysis.total_avarage < 51) { setbackgroundColor("rgba(255, 255, 0, 0.733)") }
                            else if (DataAnalysis.total_avarage > 50 && DataAnalysis.total_avarage < 76) { setbackgroundColor("rgb(201, 199, 105)") }
                            else { setbackgroundColor("rgba(216, 0, 0, 0.986)") }
                        }
                        else {
                            if (DataAnalysis.status === true) {
                                setbackgroundColor("rgba(216, 0, 0, 0.986)")
                            }
                            else {
                                setbackgroundColor("rgba(0, 128, 0, 0.719)")
                            }
                        }
                    }

                    // setSelectPopUp(true)
                    initModal();

                }, err => {
                    console.log(err)
                })
        }, (err) => {
            console.log(err)
        })

    }

    let display_methods = <div className="box box_with_carousel">
        <Carousel useKeyboardArrows={true}>
            {Methods.map((method, xid) => (
                <div className="slide" key={xid}>
                    <h1>Method: {method.id}</h1>
                    <h3>{method.method}</h3><br />
                    <label>{method.description}</label>
                    <div className='method_img'>
                        <img src={method.image} alt={method.method} className='image_method_class' />
                    </div>

                </div>
            ))}
        </Carousel>
        <button className='btn btn-primary' onClick={() => navigate('/level1')}>OK</button>
    </div>

    const [isShowsing, invokeModalsing] = React.useState(false)
    const initModalsing = () => {
        return invokeModalsing(!false)
    }
    const [isShow, invokeModal] = React.useState(false)
    const initModal = () => {
        return invokeModal(!false)
    }
    const [isShows, invokeModals] = React.useState(false)
    const initModals = () => {
        return invokeModals(!false)
    }
    const modalClose = () => {
        return invokeModal(false)
    }
    const modalCloses = () => {
        return invokeModals(false)
    }
    const modalClosesing = () => {
        return invokeModalsing(false)
    }
    return (

        <div className='hero-all' >
            <div className='sidenav'>
                <Sidebar />
            </div>

            <div className='main-all'>
                <div className='content'>
                    <div className='container-wrapper'></div>
                    <div className='sanitaryInpection'>

                        {/* Pop up test methods */}
                        <PooUp trigger={SelectPopUp} setTrigger={setSelectPopUp}>
                            {display_methods}
                        </PooUp>
                        {/* validation pop up */}
                        <Modal show={isShowsing} onHide={modalClosesing} >
                            <Modal.Header closeButton onClick={modalClosesing}>
                                <Modal.Title>Analysis results</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                all the field the must be checked

                            </Modal.Body>
                            <Modal.Footer></Modal.Footer>
                        </Modal>

                        {/* data results pop up */}

                        <Modal show={isShow} onHide={modalClose} >
                            <Modal.Header closeButton onClick={modalClose}>
                                <Modal.Title>Analysis results</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>



                                <div className='container-wrapper'></div>
                                {(DataAnalysis.message !== "adedd hydrogensulfide") && (<div >
                                    {sanitary}
                                </div>)}
                                {(DataAnalysis.message === "adedd hydrogensulfide") && (<div>
                                    {h2s}
                                </div>)}

                            </Modal.Body>
                            <Modal.Footer>
                                {/* <Button variant="danger" onClick={initModal}>
                            Close
                        </Button> */}
                                <Button variant="dark" onClick={function (event) { modalClose(); setSelectPopUp(true) }}>
                                    Ok
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* methods pop up */}

                        {/* <input class="form-check-input" type="checkbox" value='true' role="switch" id="flexSwitchCheckDefault" onChange={(e) => setCheck(e.target.value)} name="check" /> */}

                        <div className='table'>
                            <div className='form-header'>
                                <label className='header_form_label questinare'>Questionare</label>
                                <label className='header_form_label yes_no'>No/Yes</label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>1. Are There pit-latrines?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value="pitLatrine" />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>2. Are There any domestic animals observer?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value="domesticAnimal" />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>3. Diapers Disposal?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value="diaperDisposal" />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>4. Release of wastewater?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value="wasteWaterRelease" />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>5. Open defaction?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value='openDefaction' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>6. Is the water source unprotected?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value='unprotectedWaterSource' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>7. Agricultural Activities?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value='agriculturalActivity' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>8. Observer laundry Activities?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value='observerLaundryActivity' />
                                </label>
                            </div>

                        </div>
                        {/* <table className="table">
                            <div class="form-check form-switch">

                            </div>
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
                        </table> */}
                        <button onClick={senduseSanitaryInpectionSurvey} className='btn btn-primary btn-lg mb-3'>Submit</button>

                    </div>
                </div>



            </div>
        </div>
    );
}

export default SanitaryInpection