import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function H2S() {
    const navigate = useNavigate();

    const tempData = useLocation();
    const [SamplingData] = useState(tempData.state.temp)

    const [activeMenu, setActiveMenu] = useState(null);
    const [completedProcessH2S, setCompletedProcessH2S] = useState('Completed 0/1');
    const [isYellowTextVisible, setIsYellowTextVisible] = useState(false);
    const [isBlackTextVisible, setIsBlackTextVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);


    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const divStyleSubmit = {
        backgroundColor: 'blue',
        width: '200px',
        height: '40px',
        color: 'white',
        textAlign: 'center',
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(menu === activeMenu ? null : menu);
    };

    const handleSubmitButton = () => {
        // Handle submission here, you can use the selectedOption state.
        console.log(`Selected Option: ${selectedOption}`);
        if (selectedOption === 'NEGATIVE') {
            setIsYellowTextVisible(true); // Show the negative message
            setIsBlackTextVisible(false); // Hide the positive message
        } else if (selectedOption === 'POSITIVE') {
            setIsYellowTextVisible(false); // Hide the negative message
            setIsBlackTextVisible(true); // Show the positive message
        }
    };
    const handleButtonClick = (color) => {
        if (color === 'Yellow') {
            setIsYellowTextVisible(!isYellowTextVisible);
            setCompletedProcessH2S('Completed 1/1');
            setIsBlackTextVisible(false);
            setSelectedOption('NEGATIVE');
        } else if (color === 'Black') {
            setIsBlackTextVisible(!isBlackTextVisible);
            setCompletedProcessH2S('Completed 1/1');
            setIsYellowTextVisible(false);
            setSelectedOption('POSITIVE');
        }

        console.log(isYellowTextVisible)
        axios.post("http://localhost:3001/api/sampling_data", SamplingData).then((response) => {
            var h2s_test = {
                status: isBlackTextVisible,
                samplingId: response.data.insertedId
            }
            axios.post("http://localhost:3001/api/hydrogensulfide", h2s_test).then((result) => {
                var temp = result.data
                if (result.data.success === true) {
                    navigate("/data_results", { state: { temp } })
                }
            })
        })


    };

    return (
        <div className='text-center mt-4'>
            {activeMenu === 'sanitary' && <div className="submenu"></div>}
            <br></br>
            <p> Please complete H2Test </p>

            <div className='d-inline p-2 bg-dark text-white mt-5' onClick={() => handleMenuClick('h2s')}>
                H2S TEST {completedProcessH2S && <span style={{ marginLeft: '90px' }}>{completedProcessH2S}</span>}
            </div>
            {activeMenu === 'h2s' && (
                <div className='text-center mt-5'>
                    <p>Choose Test Result:</p>
                    <button
                        className={`p-3 mb-z ${selectedOption === 'NEGATIVE' ? 'bg-success' : 'bg-light'}`} style={{ marginRight: '20px' }}
                        id="yellow"
                        name="test_color"
                        value="YELLOW"

                    >
                    </button>

                    <button
                        className={`p-3 mb-2 ${selectedOption === 'POSITIVE' ? 'bg-danger ' : 'bg-light'}`}
                        id="black"
                        name="test_color"
                        value="BLACK"

                    >
                    </button>

                    <div>
                        <label style={{ marginRight: '10px' }}>
                            <input
                                type="radio"
                                value="NEGATIVE"
                                checked={selectedOption === 'NEGATIVE'}
                                onChange={handleRadioChange} style={{ marginRight: '10px' }}
                            />
                            NEGATIVE
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="POSITIVE"
                                checked={selectedOption === 'POSITIVE'}
                                onChange={handleRadioChange} style={{ marginRight: '10px' }}
                            />
                            POSITIVE
                        </label>
                    </div>
                    <br></br>

                    <button onClick={handleSubmitButton} className='d-inline p-2 bg-primary text-white mt-5' type="submit" value="Submit" style={divStyleSubmit}>
                        SUBMIT
                    </button>
                    <br></br>

                    {isYellowTextVisible && (
                        <div>
                            <p>NO RISK !!!  ENJOY YOUR WATER!!</p>
                            <p>WATER IS CLEAN, THERE IS NO FAECAL CONTAMINATION </p>
                        </div>
                    )}

                    {isBlackTextVisible && (
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
                    <button className='btn btn-success mt-5' type="submit" value="Submit" onClick={handleButtonClick}>
                        DONE
                    </button>
                </div>
            )}



        </div>
    );
}

export default H2S