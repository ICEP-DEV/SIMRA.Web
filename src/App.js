import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login/Login';
import Home from './screens/Home/Home'
import SamplingData from './screens/SamplingData/SamplingData';
import Level1 from './screens/Level1/Level1';
import SanitaryInpection from './screens/SanitaryInpection/SanitaryInpection';
import H2S from './screens/H2S/H2S';
import Level2 from './screens/Level2/Level2';
import FibAnalysis from './screens/FIBAnlysis/AnalyseFIB';
import QMRA from './screens/QMRA/Parameters'
import Municipality from './screens/Municipality/Municipality';
import Report from './screens/Municipality_Report/Report'
import Survay_Report from './screens/Survay_Report/Survay_Report';
import H2S_Report from './screens/H2S_Report/H2S_Report';
import LandingPage from './screens/LandingPage/LandingPage';
/*import DataResults from './screens/AnalysisResults/AnalysisResults';
*/

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/sampling_data' element={<SamplingData />} />
        <Route exact path='/h2s_survey' element={<Level1 />} />
        <Route exact path='/sanitaryInpection' element={<SanitaryInpection />} />
        <Route exact path='/h2s_testing' element={<H2S />} />
        <Route exact path='/level2' element={<Level2 />} />
        <Route exact path='/fib_analysis' element={<FibAnalysis />} />
        <Route exact path='/qmra' element={<QMRA />} />
        {/* <Route exact path='/municipality' element={<Municipality />} /> */}
        <Route exact path='/municipality' element={<Report />} />
        <Route exact path='/sanitary_report' element={<Survay_Report />} />
        <Route exact path='/h2s_report' element={<H2S_Report />} />

        
        
        {/*
        <Route exact path='/data_results' element={<DataResults />} />
      
         */}

      </Routes>
    </Router>
  );
}
export default App;
