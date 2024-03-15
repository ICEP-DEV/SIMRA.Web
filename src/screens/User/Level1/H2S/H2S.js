import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../../../Header/Header';
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { api } from "../../../Data/API";

function H2S() {
    const navigate = useNavigate();
    let sampling_info = useSelector((state) => state.sampling.value)

    const [isYellowTextVisible, setIsYellowTextVisible] = useState(false);
    const [isBlackTextVisible, setIsBlackTextVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [Longitude, setLongitude] = useState('')
    const [Latitude, setLatitude] = useState('')
    const [IsContiminated, setIsContiminated] = useState(false);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLongitude(longitude)
            setLatitude(latitude)
        })
    })

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

    const handleChangeUpdate = e => {
        setIsContiminated((currentState) => ({
            ...currentState,
            [e.target.name]: Boolean(e.target.value),
        }))
        console.log(IsContiminated)

    }

    const divStyleSubmit = {
        backgroundColor: 'blue',
        width: '200px',
        height: '40px',
        color: 'white',
        textAlign: 'center',
    };

    // const handleMenuClick = (menu) => {
    //     setActiveMenu(menu === activeMenu ? null : menu);
    // };

    const handleSubmitButton = () => {
        
    };
    const naving = () => {
        navigate("/level1");
    }
    const handleButtonClick = (color) => {

        axios.post(api+"sampling_data", sampling_info).then((response) => {
            // Assign to Coordinates object
            var coordinates = {
                latitude: Latitude,
                longitude: Longitude,
                samplingId: response.data.insertedId
            }
            //Call in coordinates api
            axios.post(api+"coordinates", coordinates).then((result) => {
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
            axios.post(api+"watersource", watersource).then((result) => {
                console.log(result)
            }, err => {
                console.log(err)
            })

            var h2s_test = {
                status: IsContiminated.isContiminated,
                samplingId: response.data.insertedId
            }
            axios.post(api+"hydrogensulfide", h2s_test).then((result) => {

                if (result.data.success === true) {
                    // navigate("/level1", { state: { temp } })
                }
            })
        }, err => {
            console.log(err)
        })


    };

    // const navigating = () => {
    //     navigate("/level1")
    // }

    return (
        <div className='hero-all' >
            <div className='sidenav'>
                <Sidebar />
            </div>

            <div className='main-all'>

                <div className='content'>
                    <Header />
                    <div className='container-wrapper'>
                        <div className='h2s'>
                            <h2>Hydrogen Sulfide(H2S)</h2>
                            <div className='text-center mt-5'>
                                <h3>Choose Test Result:</h3>
                                <button
                                    className={`p-3 mb-z ${selectedOption === 'NEGATIVE' ? 'bg-white' : 'bg-primary'}`} style={{ marginRight: '20px' }}
                                    id="yellow"
                                    name="test_color"
                                    value="YELLOW"
                                >
                                </button>

                                <button
                                    className={`p-3 mb-2 ${selectedOption === 'POSITIVE' ? 'bg-dark ' : 'bg-primary'}`}
                                    id="black"
                                    name="test_color"
                                    value="BLACK"

                                >
                                </button>

                                <div>
                                    <label style={{ marginRight: '10px' }}>
                                        <input
                                            type="radio"
                                            value=''
                                            // checked={selectedOption === 'NEGATIVE'}
                                            // onChange={handleRadioChange} style={{ marginRight: '10px' }}
                                            onChange={handleChangeUpdate}
                                            className='test-results'
                                            name='isContiminated'
                                        />
                                        WHITE
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            value='true'
                                            // checked={selectedOption === 'POSITIVE'}
                                            // onChange={handleRadioChange} style={{ marginRight: '10px' }}
                                            onChange={handleChangeUpdate}
                                            className='test-results'
                                            name='isContiminated'
                                        />
                                        BLACK
                                    </label>
                                </div>
                                <br></br>

                                <button onClick={initModal} className='d-inline p-2 bg-primary text-white' type="submit" value="Submit" style={divStyleSubmit}>
                                    SUBMIT
                                </button>
                                <div style={{ marginTop: '25px', textAlign: 'left' }}>
                                    <p>
                                        Presence or absence of faecal contamination in water source may be indicated by colour change on H2S paper strip test from white to black.
                                    </p>
                                </div>


                                {/* <button className='btn btn-success mt-5' type="submit" value="Submit" onClick={handleButtonClick}>
                        DONE
                    </button> */}
                                <Modal show={isShow} onHide={modalClose}>
                                    <Modal.Header closeButton onClick={modalClose}>
                                        <Modal.Title>Results</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure you want to submit the results ?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        {/* <Button variant="danger" onClick={initModal}>
                            Close
                        </Button> */}
                                        <Button variant="dark" onClick={function (event) { handleSubmitButton(); handleButtonClick(); initModals() }}>
                                       yes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal show={isShows} onHide={modalCloses}>
                                    <Modal.Header closeButton onClick={function (event) { modalClose(); modalCloses() }}>
                                        <Modal.Title>Methods</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {IsContiminated.IsContiminated == false && (
                                            <div>
                                                <p>NO RISK !!!  </p>
                                                <p>WATER IS CLEAN, THERE IS NO FAECAL CONTAMINATION </p>
                                            </div>
                                        )}

                                        {IsContiminated.IsContiminated == true && (
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

                                        )}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        {/* <Button variant="danger" onClick={initModals}>
                            Close
                        </Button> */}
                                        <Button variant="dark" onClick={function (event) { naving(); modalClose(); }}>
                                            Ok
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default H2S;