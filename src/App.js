import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login/Login';
import SamplingData from './screens/SamplingData/SamplingData';
import Level1 from './screens/Level1/Level1';
import H2S from './screens/H2S/H2S';
import SanitaryInpection from './screens/SanitaryInpection/SanitaryInpection';
import DataResults from './screens/AnalysisResults/AnalysisResults';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      </Routes>
    </Router> 
  );
}
export default App;
