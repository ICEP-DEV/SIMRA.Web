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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import methods from '../../../../Data/methods';
import { useNavigate } from 'react-router-dom';
import { BiSolidCommentCheck } from 'react-icons/bi';

function SanitaryInpection() {
    var navigate = useNavigate()
    let sampling_info = useSelector((state) => state.sampling.value)
    //////data results
    const [DataAnalysis, setDataAnalysis] = useState({})
    const [backgroundColor, setbackgroundColor] = useState('')
    let [SelectPopUp, setSelectPopUp] = useState(false);
    const [Methods, setMethods] = useState(methods)
    const [check, setCheck] = useState(false);
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
    /////////////////////////////////////////


    // const tempData = useLocation();

    const [pitLatrine, setpitLatrine] = useState(false)
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

        

    }

    // function sanitaryI(){
    //     navigate("/sanitaryInpection", { state: { temp } })
    // }

    function senduseSanitaryInpectionSurvey() {
        //validate the radio buttons
        console.log(check)
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
        /*axios.post("http://localhost:3001/api/sampling_data", sampling_info).then((response) => {
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
        })*/

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

                        <Modal show={isShows} onHide={modalCloses}>
                            <Modal.Header closeButton onClick={function (event) { modalClose(); modalCloses() }}>
                                <Modal.Title>Methods</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="text-center">
                                    <p className="text-danger">RISK!! WATER IS NOT CLEAN!! PLEASE FOLLOW THE STEPS BELOW :</p>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>METHOD 1: Boiling water</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>The simplest method to purify water is to boil it for a good time.
                                                        High temperatures cause the bacteria and virus to dissipate, removing all impurities from the water.
                                                        In doing so, chemical additions cease to exist in the water. However, the dead micro-organisms and impurities settle at the bottom of the water,
                                                        and boiling does not help eliminate all the impurities.
                                                        You must strain the water through a microporous sieve to completely remove the impurities.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METHOD 2: Water Purifier</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <li>An electric water purifier is the most trusted form of water purification found in most houses today.
                                                        A water purifier uses a multi-stage process involving UV and UF filtration, carbon block,
                                                        and modern water filtration technology that eliminates most of the chemicals and impurities, making it the purest drinking water.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METHOD 3: Reverse Osmosis</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>An RO Purifier proves to be one of the best methods of purifying water.
                                                        Reverse Osmosis forces water through a semipermeable membrane and removes contaminants.
                                                        The TDS Controller and Mineraliser Technology, like the one found in an A. O. Smith RO UV Water Purifier,
                                                        help retain the necessary nutrients while doing away with harmful impurities.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METHOD 4: Water Chlorination</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>It is an older technique used usually during an emergency, wherein a mild bleach with approximately 5% chlorine is added to the water.
                                                        This mixture works as an oxidant and quickly kills microorganisms, making water safe for consumption.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METHOD 5: Distillation</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Distillation is a water purification process involving collecting the condensed water after evaporation,
                                                        ensuring that water is free of contaminants. However, this isn’t as effective as an RO filter because it is time-consuming and eliminates minerals.</li>


                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METHOD 6: Iodine Addition</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Iodine is a red chemical that is easily available as a tablet or a liquid. It is extremely powerful as it kills bacteria and viruses.
                                                        However, it adds an unpleasant taste and can be fatal if taken in high doses.
                                                        Therefore, it should only be used if you don’t have access to a better method of purification like an electric water purifier.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METHOD 7:  Solar Purification</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>An RO Purifier proves to be one of the best methods of purifying water.
                                                        Reverse Osmosis forces water through a semipermeable membrane and removes contaminants.
                                                        The TDS Controller and Mineraliser Technology, like the one found in an A. O. Smith RO UV Water Purifier,
                                                        help retain the necessary nutrients while doing away with harmful impurities.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METHOD 8:  Clay Vessel Filtration</th>
                                            </tr>
                                            <tr>
                                                <td>

                                                    <li>Way before people had access to an RO or UV Purifier, they used clay pots which purified muddy water,
                                                        by blocking out the mud and allowing pure, potable water to pass through. This method is still used in some rural regions.</li>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METHOD 9: UV Radiation</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <li>Water is exposed to a UV Light that kills microorganisms, thereby preventing it from breeding further.
                                                        But if not coupled with an RO Filter, UV Radiation alone cannot remove impurities and heavy metals.</li>

                                                </td>
                                            </tr>
                                            <tr>
                                                <th>METHOD 10: Desalination</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <li>This method is used when water with a certain level of salinity needs to be filtered. This process is helpful.</li>


                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                {/* <Button variant="danger" onClick={initModals}>
                            Close
                        </Button> */}
                                <Button variant="dark" onClick={function (event) { modalClose(); }}>
                                    Ok
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* <input class="form-check-input" type="checkbox" value='true' role="switch" id="flexSwitchCheckDefault" onChange={(e) => setCheck(e.target.value)} name="check" /> */}

                        <div className='table'>
                            <div className='form-header'>
                                <label className='header_form_label questinare'>Questionare</label>
                                <label className='header_form_label yes_no'>No/Yes</label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>1. Are There pit-latrines?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input class="form-check-input" type="checkbox" value='pitLatrine' role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate} name='pitLatrine' checked={SanitaryInpectionItems.pitLatrine} />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>2. Are There any domestic animals observer?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate} name='domesticAnimal' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>3. Diapers Disposal?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate} name='diaperDisposal' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>4. Release of wastewater?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate} name='wasteWaterRelease' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>5. Open defaction?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate} name='openDefaction' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>6. Is the water source unprotected?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate} name='unprotectedWaterSource' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>7. Agricultural Activities?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate} name='agriculturalActivity' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>8. Observer laundry Activities?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeUpdate} name='observerLaundryActivity' />
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