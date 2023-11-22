import axios from 'axios';
import React from 'react'
import './SanitaryInpection.css'
import { Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PooUp from '../Pop_Up/Pop_Up'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import methods from '../../Data/methods';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Level2PopUp from '../Pop_Up/Pop_Up_Level2';
import Level3PopUp from '../Pop_Up/Pop_Up_Level3';
import { api } from '../../Data/API';
import slider from '../../Data/slider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function SanitaryInpection() {
    var navigate = useNavigate()
    let sampling_info = useSelector((state) => state.sampling.value)
    //////data results
    const [DataAnalysis, setDataAnalysis] = useState({})
    const [backgroundColor, setbackgroundColor] = useState('')
    let [SelectPopUp, setSelectPopUp] = useState(false);
    const [Methods] = useState(methods)
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

    let sanitary = <div className='headerModal'>
        <h2>Analysis: Sanitary Survey</h2>
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


        // if (!sampling_info.longitude || !sampling_info.latitude) {
        //     toast.error("Won't be able to proceed since we couldn't get your location!", {
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
        //Call in sampling data api
        axios.post(api + "sampling_data", sampling_info).then((response) => {
            SanitaryInpectionItems.samplingId = response.data.insertedId
            // Assign to Coordinates object
            var coordinates = {
                latitude: sampling_info.latitude,
                longitude: sampling_info.longitude,
                samplingId: response.data.insertedId
            }
            //Call in coordinates api
            axios.post(api + "coordinates", coordinates).then((result) => {
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
            axios.post(api + "watersource", watersource).then((result) => {
                console.log(result)
            }, err => {
                console.log(err)
            })

            axios.post(api + "sanitary_inspection_survey", SanitaryInpectionItems)
                .then((result) => {
                    setDataAnalysis(result.data)
                    console.log(DataAnalysis)
                    // navigate("/data_results", { state: { temp } })

                    if (result.data.success === true) {
                        if (DataAnalysis.message !== "added hydrogensulfide") {
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


    // }

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
    
    const settings = {
        dots: true,
        centerMode: true,
    centerPadding: '10px',
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
      speed: 2000,
      autoplaySpeed: 6000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1,
          },
        },
      ],
    
      };

    return (

        <div className='hero-all' >
            <Navbar />
            <div className='main-all'>
                <ToastContainer />
                <div className='content'>
                    <Header />
                    <h2 className='text-primary text-center'>Sanitary Inpection</h2>
                    <div className='sanitaryInpection'>

                        {/* Pop up test methods */}
                        <PooUp trigger={SelectPopUp} setTrigger={setSelectPopUp}>
                            {display_methods}
                        </PooUp>
                        <Level2PopUp>

                        </Level2PopUp>
                        <Level3PopUp>

                        </Level3PopUp>
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

                        <Modal show={isShow} onHide={modalClose} size="md" >

                            <Modal.Header closeButton>
                                <Modal.Title>Results</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                {(DataAnalysis.message !== "added hydrogensulfide") && (<div style={{textTransform:'capitalize' ,fontSize:'1.1em', fontWeight:'600'}}>
                                    {sanitary}
                                </div>)}
                                {(DataAnalysis.message === "added hydrogensulfide") && (<div>
                                    {h2s}
                                </div>)}


                                <div className='methods' style={{margin: '0 50px', padding:'10px', color:'white', backgroundColor:'grey'}}>
                                    {SanitaryInpectionItems.pitLatrine ? <span className='controlMethods'>
                                        <h4>Pit Latrines</h4>
                                        <li>Keep pit latrines 50m from water sources </li>
                                        <li>Build and maintain pit latrines properly, and safely dispose of waste after emptying.. </li>
                                        <li>Flush toilets or proper well-maintained pit latrine construction. </li> 
                                    </span> : null}

                                    {SanitaryInpectionItems.domesticAnimal ? <span className='controlMethods'>
                                        <h4>Domestic Animals</h4>
                                        <li>Implement proper waste management for animal feaces. </li>
                                        <li>Prevent manure runoff into water sources. </li>
                                        <li>Establish buffer zones between livestock areas and water bodies. </li>
                                        <li>Reduce contamination risks through effective planning and separation. </li>
                                    </span> : null}

                                    {SanitaryInpectionItems.diaperDisposal ? <span className='controlMethods'>
                                        <h4>Diapers Deposition</h4>
                                        <li>Women should be encouraged to stop dumping children's feces in the stream. </li>
                                        <li>The responsible solution is to dispose of diapers in designated waste bins. </li>
                                        <li>Using cloth diapers is a helpful and eco-friendly alternative. </li>
                                    </span> : null}

                                    {SanitaryInpectionItems.wasteWaterRelease ? <span className='controlMethods'>
                                        <h4>Release of Wastewater</h4>
                                        <li>Households must be connected to sewage systems. </li>
                                        <li>Ensure effective wastewater treatment to reduce pollution. </li>
                                    </span> : null}

                                    {SanitaryInpectionItems.openDefaction ? <span className='controlMethods'>
                                        <h4>Open Defecation</h4>   
                                        <li>Open defecation poses health and environmental risks, especially when it contaminates water bodies. </li>
                                        <li>Build and maintain public and household toilets to discourage open defecation.</li>
                                    </span> : null}

                                    {SanitaryInpectionItems.unprotectedWaterSource ? <span className='controlMethods'>
                                        <h4>Unprotected Water Sources</h4>                                        
                                        <li>Establish and protect water sources to prevent contamination from surface runoff or human activities. </li>
                                        <li>Fencing the area remove faecal matter deposited by livestock, and sweep wellhead area. </li>
                                        <li>Communities should use protected and treated water sources.</li>
                                    </span> : null}

                                    {SanitaryInpectionItems.agriculturalActivity ? <span className='controlMethods'>
                                        <h4>Agricultural Activities</h4>
                                        <li>To maintain soil health, implement erosion control measures such as planting cover crops and establishing vegetative buffer zones along water bodies.</li>
                                    </span> : null}

                                    {SanitaryInpectionItems.observerLaundryActivity ? <span className='controlMethods'>
                                        <h4>Laundry Activities</h4>
                                        <li>Proper disposal of laundry wastewater must be done by using sewage pipes.</li> 
                                        <li>The impact of eco-friendly detergents will help to not contaminate water.</li>
                                        <li>Filtering laundry water before disposal can enhance water quality and minimize environmental impact.</li>
                                    </span> : null}

                                </div>


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="dark" onClick={function (event) { modalClose(); setSelectPopUp(true)}}>
                                    Ok
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className='table '>
                            <h3 className='pt-2'>Questionnaire</h3>
                            <div className='form-header' style={{padding:'15px 0'}}>
                                <label className='header_form_label questinare' style={{ textAlign: 'center', fontSize:'1.2em' }}>Questions</label>
                                <label className='header_form_label yes_no' style={{fontSize:'1.2em'}}>No/Yes</label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>1. Are There pit-latrines (Pit toilets)?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultSI" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value="pitLatrine" />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>2. Are There any domestic animals observed?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultSI" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value="domesticAnimal" />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>3. Diapers Disposal (Throwing away diapers)?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultSI" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value="diaperDisposal" />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>4. Release of wastewater (Dirty water)?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultSI" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value="wasteWaterRelease" />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>5. Open defaction (Public toilets )?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultSI" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value='openDefaction' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>6. Is the water source unprotected (Open access)?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultSI" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value='unprotectedWaterSource' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>7. Agricultural Activities (Farming operations)?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultSI" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value='agriculturalActivity' />
                                </label>
                            </div>
                            <div className='form_content'>
                                <label className='header_form_label questinare'>8. Observer laundry Activities (Washing)?</label>
                                <label className='header_form_label yes_no form-check form-switch'>
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefaultSI" onChange={handleChangeUpdate}
                                        name='SanitaryInpectionItems' value='observerLaundryActivity' />
                                </label>
                            </div>

                        </div>

                        <button onClick={senduseSanitaryInpectionSurvey} className='btn btn-success btn-lg justify-content-center mt-5 w-25'>Submit</button>


                    </div>

                    {/* <div id='sanitary_description ' className='text-primary mb-2'>
                    <h3>How can I do sanitary Inspection? </h3>
                    <ul>
                        <li>For sanitary inspection you can use a sanitary survey, where you simply answer yes or no.</li>
                        <li>Then simple quantitative classification can be done by counting the number of YES answers. </li>
                        <li>Calculate: Percentage= Number of yes/total number of questions x 100.</li>
                        <li>Then sanitary score can be rated as low-very high risk.</li>
                    </ul>
                    <label>The level of safety of the water source can be rated from risk score (e.g. very high risk (7-8), high risk (5-6), medium risk (3-4) and low risk (1-2)).</label>
                </div> */}
                
                <section className='section-h2s mx-5'>
                <h2 className='text-dark text-center'>Sanitary Inpection Examples</h2>
                   

                <Slider {...settings}>
                {slider.map((d) => (
                <div className='alert alert-secondary text-dark w-75 '>
                    <div 
                    className='p-2 text-center'> {d.heading}
                    </div>
                <div className='image-div w-75 flex justify-center '>
                    <img src={d.image} className='image-sani w-100 rounded' />
                    </div>
                </div>
                ))}

                </Slider> 


                   
                    </section>
                    {/* <section className='section-h2s'>
                        <div className='h2s-cards row align-items-start justify-content-around mb-5'>
                            <h2 className='text-dark text-center'>Sanitary Inpection Examples</h2>
                            <div className='card' >
                                <div class="card-header">
                                    domestic animals
                                </div>

                                <div className='card-body'>
                                    <img className='' style={{ width: '100%', height: '250px' }} src={domestic_animal} alt="domestic animals" />
                                </div>

                            </div>
                            <div className='card' style={{ width: '18rem' }}>
                                <div class="card-header">
                                    Diapers Disposal
                                </div>

                                <div className='card-body'>
                                    <img className='' style={{ width: '100%', height: '250px' }} src={diapers} />
                                </div> </div>
                            <div className='card' style={{ width: '18rem' }}>
                                <div class="card-header">
                                    Open defaction
                                </div>
                                <div className='card-body'>

                                    <img className='card-img-top' style={{ width: '100%', height: '250px' }} src={pit} alt="pit toilets" />
                                </div> </div>


                            <div className='card' style={{ width: '18rem' }}>

                                <div class="card-header">
                                    Agricultural Activities
                                </div>

                                <div className='card-body' style={{ font: '16px' }}>
                                    <img className='' style={{ width: '100%', height: '250px' }} src={farming} />
                                </div> </div>


                            <div className='card' style={{ width: '18rem' }}>

                                <div class="card-header">
                                    waste Water
                                </div>
                                <div className='card-body'>
                                    <img className='' style={{ width: '100%', height: '250px' }} src={waterwaste} />
                                </div>
                            </div>
                        </div>
                    </section> */}
                </div>

            </div>
            <footer><Footer /></footer>
        </div>
    );
}

export default SanitaryInpection