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
import User_H2S_Logs from './screens/User_H2S_Logs/User_H2S_Logs';
import User_Sanitary_Survay_Logs_Reports from './screens/User_Sanitary_Survay_Logs_Reports/User_Sanitary_Survay_Logs_Reports';
import User_QMRA_logs from './screens/User_QMRA_logs/User_QMRA_logs';
import User_MST_Logs from './screens/User_MST_Logs/User_MST_Logs';
import MST from './screens/MST/MST';
import Graphs from './screens/Graphs/Charts';
import UserProfileUpdate from './screens/Profile/Profile';
import LandingPage from './screens/LandingPage/LandingPage';
import Events from './screens/Events/Events.js';
import Map from './screens/Maps/maps.js';
import Add_Events from './screens/Events_admin/Events_admin'
import H2S_Logs_Reports from './screens/H2S_Logs_Reports/H2S_Logs_Reports';
import Level3 from './screens/Level3/Level3';
import Reference_pathogen from './screens/Reference_pathogen/Reference_pathogen';
import Users from './screens/Admin/Users/Users';
import AdminDashboard from './screens/Admin/AdminDashboard/AdminDashboard';
import Manage_Events from './screens/Admin/Events_muni/events_muni.js';
import AdminSurvey from './screens/Admin/Survay_Admin/Survay_Admin';
import H2SReport from './screens/Admin/H2SReport/H2SReport';


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
        <Route exact path='/events' element={<Events />} /> 
        <Route exact path='/municipality' element={<Municipality />} />
        <Route exact path='/piechart' element={<Report />} />
        <Route exact path='/sanitary_report' element={<Survay_Report />} />
        <Route exact path='/h2s_report' element={<H2S_Report />} />
        <Route exact path='/add_events' element={<Add_Events/>} /> 
        <Route exact path='/h2s_logs' element={<User_H2S_Logs />} />
        <Route exact path='/survay_logs' element={<User_Sanitary_Survay_Logs_Reports />} />
        <Route exact path='/qmra_logs' element={<User_QMRA_logs />} />
        <Route exact path='/mst' element={<MST />} />
        <Route exact path='/map_coordinates' element={<Map />} />
        <Route exact path='/mst_logs' element={<User_MST_Logs />} />
        <Route exact path='/graphs' element={<Graphs />} />
        <Route exact path='/profile' element={< UserProfileUpdate />} />
        <Route exact path='/level3' element={<Level3 />} />
        <Route exact path='/reference_pathogen' element={<Reference_pathogen />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/admin' element={<AdminDashboard/>} />
        <Route exact path='/manage_events' element={<Manage_Events/>} /> 
        <Route exact path='/h2sreport' element={<H2SReport />} />
        <Route exact path='/survay_logs' element={<AdminSurvey />} />

        {/*
        <Route exact path='/data_results' element={<DataResults />} />
      
         */}

      </Routes>
    </Router>
  );
}
export default App;
