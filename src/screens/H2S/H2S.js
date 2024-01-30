import axios from 'axios';
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { Modal, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Carousel } from "react-responsive-carousel";
import methods from '../../Data/methods';
import './H2S.css';
import h2s from '../../assets/h2s.png';
import sample from '../../assets/sample.png';
import tube from '../../assets/tube.jpg';
import tests from '../../assets/tests.jpg';
import container from '../../assets/container.png';
import {BiHelpCircle} from 'react-icons/bi';
function H2S() {
    const navigate = useNavigate();
    let sampling_info = useSelector((state) => state.sampling.value)
    const [Methods, setMethods] = useState(methods)
    const [selectedOption, setSelectedOption] = useState({ isFound: false });
    const [IsContiminated, setIsContiminated] = useState(false);
    const [ResultsStatus, setResultsStatus] = useState(false);

    const handleChangeOption = (e) => {
        let option = selectedOption;
        option[e.target.value] = e.target.checked;
        setSelectedOption(option)
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
        navigate("/h2s_survey");
    }

    const handleButtonClick = (color) => {
        console.log(selectedOption)
        // if (!sampling_info.longitude || !sampling_info.latitude) {
        //     toast.error("Won't able to proceed since we could get your location!", {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        //     return;
        // }

        // else {
            axios.post("http://localhost:3001/api/sampling_data", sampling_info).then((response) => {
                // Assign to Coordinates object
                var coordinates = {
                    latitude: sampling_info.latitude,
                    longitude: sampling_info.longitude,
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

                var h2s_test = {
                    status: selectedOption.isFound,
                    samplingId: response.data.insertedId
                }
                axios.post("http://localhost:3001/api/hydrogensulfide", h2s_test).then((result) => {

                    if (result.data.success === true) {
                        console.log(result.data.status)
                        setResultsStatus(result.data.status)
                        // navigate("/level1", { state: { temp } })
                    }
                })
            }, err => {
                console.log(err)
            })

        // }
    };

    let display_methods = <div className="box box_with_carousel">
        <Carousel useKeyboardArrows={true} className='carousel-sanitary'>
            {Methods.map((method, xid) => (
                <div className="slide" key={xid}>
                    <h1>Method: {method.id}</h1>
                    <h3>{method.method}</h3><br />
                    <label style={{ color: 'black', fontSize:'15px' }}>{method.description}</label>
                    <div className='method_img'>
                        <img src={method.image} alt={method.method} className='image_method_class' />
                    </div>

                </div>
            ))}
        </Carousel>
        <button className='btn btn-primary' onClick={() => navigate('/h2s_survey')}>OK</button>
    </div>

    return (
        <div className='hero-all' >

            <Navbar />
            <div className='main-all'>
                <ToastContainer />
                <div className='content'>
                    <Header />
                  




                    <h2 className='text-primary text-center'>Hydrogen Sulfide (H₂S)</h2>
                    <div className='container-wrapper'>
            
                    <BiHelpCircle size={'30px'} className="d-flex justify-content-end"/>


                        <div className='h2s'>
                         
                            <div className='text-center mt-5'>
                                <h3>Choose Test Result:</h3>

                                <div className='form_content form_content_switch'>
                                    <label className='header_form_label yes_no form-check form-switch'>
                                        <input className="form-check-input switch_h2s" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleChangeOption}
                                            name='selectedOption' value="isFound" />
                                    </label>
                                </div>
                                <div>
                                    <label style={{ marginRight: '10px' }}>

                                        WHITE
                                    </label>

                                    <label>

                                        BLACK
                                    </label>
                                </div>
                                <br></br>

                                <button onClick={initModal} className='btn btn-success w-25' type="submit" value="Submit" >
                                    SUBMIT
                                </button>
                                <div style={{ marginTop: '25px', textAlign: 'left' }}>
                                    <p className='alert-light h2s-label'>
                                        Presence or absence of faecal contamination in water source may be indicated by colour change on H₂S paper strip test from white to black.
                                    </p>
                                    <label className='alert alert-danger h2s-label w-75'>Warning: Remember to wear gloves when using H₂S  paper strips
                                    <br/>

                                    Hydrogen sulfide (H₂S) is a colorless gas with a foul odor of rotten eggs, posing risks such as eye and respiratory irritation.
                                    Exposure can cause serious effects like apnea, coma, convulsions, as well as symptoms such as dizziness, 
                                    headaches, weakness, irritability, insomnia, and stomach upset; in liquid form, it may lead to frostbite.                                    </label>
                                    {/* <label className='alert alert-light  h2s-label w-75'></label> */}
                                </div>

                                <section className='section-h2s'> 
                  
                  <h5 className='text-center mb-3'>How can I do H2S test?</h5>
<div className='level1-desccription'>
                         
                          <div className='h2s-cards row align-items-start justify-content-around  mb-5'>

                              <div className='card' style={{width:'16rem'}} >
                                  <img className='card-img-top' src={sample}   />
                                  <div className='card-body'>
                                  <h5>Step 1</h5>
                                  <p>	Collect 100 mL of water sample to be tested. (e.i. water from tap, stage container, spring, borehole, dam)</p>
                                  </div>
                                  
                              </div>
                              <div className='card' style={{width:'16rem'}}>
                                  <img className='card-img-top' src={tests} />
                                  <div className='card-body'>
                                  <h5>Step 2</h5>
                                  <p>	Add 20 drop (1 mL) into tubes containing growth solution.</p>
                              </div> </div>
                              <div className='card' style={{width:'16rem'}}>
                                  <img className='card-img-top' src={tube} />
                                  <div className='card-body'>
                                  <h5>Step 3</h5>
                                  <p>	Insert H2S paper strip into the tube and secured by a cotton wool so that it remains at the top centre of the tube. </p>
                              </div> </div>
                              <div className='card' style={{width:'16rem'}}>
                                  <img className='card-img-top' src={container} />
                                  <div className='card-body' style={{font:'16px'}}>
                                  <h5>Step 4</h5>
                                  <p>	Then place it in a container covered with cloth and place it in warm place for 24-36 hours.</p>
                              </div> </div>
                              <div className='card' style={{width:'16rem'}}>
                                
                                  <img className='card-img-top' src={h2s} />
                                  <div className='card-body'>
                                  <h5>Step 5</h5>
                                  <p>	Check the colour change of paper strip.If colour change to black it means water is faecal contaminated.</p>
                              </div> </div>




                          </div>
                      </div>
</section>
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
                                        {ResultsStatus == false && (
                                            <div>
                                                <p>NO RISK !!!  </p>
                                                <p>WATER IS CLEAN, THERE IS NO FAECAL CONTAMINATION </p>
                                            </div>
                                        )}

                                        {ResultsStatus === true && (
                                            <div className="text-center">
                                                <p className="text-danger">RISK!! WATER IS NOT CLEAN!! PLEASE FOLLOW THE STEPS BELOW :</p>
                                                {display_methods}
                                            </div>

                                        )}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        {/* <Button variant="danger" onClick={initModals}>
                            
                        </Button> */}
                                        <Button variant="dark" onClick={function (event) {naving(); modalClose(); }}>
                                            Ok
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>




                        </div>
                  
                    </div>
                 
                </div>
            </div>
            <footer><Footer /> </footer>
        </div>
    );
}

export default H2S;