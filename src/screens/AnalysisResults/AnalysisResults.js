import { useEffect, useState } from 'react';
import './AnalysisResults.css'
import { useLocation } from 'react-router-dom';

function DataResults() {
    const tempData = useLocation()
    const [DataAnalysis] = useState(tempData.state.temp)
    const [backgroundColor, setbackgroundColor] = useState('')

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

    },[DataAnalysis])
    //risk_typ
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
    return (

        <div className='AnalysisResults'>
            {(DataAnalysis.message!== "adedd hydrogensulfide") &&(<div >
                {sanitary}
            </div>)}
            {(DataAnalysis.message === "adedd hydrogensulfide") &&(<div>
                {h2s}
            </div>)}
        </div>
    )
}

export default DataResults