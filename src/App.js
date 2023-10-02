import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login/Login';
import SamplingData from './screens/SamplingData/SamplingData';
import Level1 from './screens/Level1/Level1';
import H2S from './screens/H2S/H2S';
import SanitaryInpection from './screens/SanitaryInpection/SanitaryInpection';
import DataResults from './screens/AnalysisResults/AnalysisResults';
import Home from './screens/Home/Home';
import Profile from './screens/Profile/Profile';
import VideoScreen from './screens/Video/Video';
import UserRegistration from './screens/Registration/Registration';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path ='/Login' element={<Login/>} />
        <Route exact path='/sampling_data' element={<SamplingData />} />
        <Route exact path='/h2s_testing' element={<H2S />} />
        <Route exact path='/level1' element={<Level1 />} />
        <Route exact path='/sanitaryInpection' element={<SanitaryInpection />} />
        <Route exact path='/data_results' element={<DataResults />} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/video' element={<VideoScreen/>}/>
        <Route exact path='/user_Registration' element={<UserRegistration/>} />
      
      </Routes>
    </Router> 
  );
}
export default App;
