import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './screens/Login/Login';
import SamplingData from './screens/User/SamplingData/SamplingData';
import Level1 from './screens/User/Level1/Level1';
import H2S from './screens/User/H2S/H2S';
import SanitaryInpection from './screens/User/SanitaryInpection/SanitaryInpection';
import DataResults from './screens/User/AnalysisResults/AnalysisResults';
import Municipality from './screens/Municipality/Municipality/Municipality';
import Report from './screens/Municipality/Report/Report'

import './App.css';
function App() {
  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/sampling_data' element={<SamplingData />} />
          <Route exact path='/h2s_testing' element={<H2S />} />
          <Route exact path='/level1' element={<Level1 />} />
          <Route exact path='/sanitaryInpection' element={<SanitaryInpection />} />
          <Route exact path='/data_results' element={<DataResults />} />
          <Route exact path='/municipality' element={<Municipality />} />
          <Route exact path='/report' element={<Report />} />
        </Routes>
      </Router>
  );
}
export default App;
