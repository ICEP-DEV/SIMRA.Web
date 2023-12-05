import Admin_Side_Bar from "../../Admin_NavBar/Admin_NavBar";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Users(){
   
    const api = "http://localhost:3001/api/"
   
    const [users,setUsers]=useState([{}]);
    const [datafound,setDataFound]=useState({});

    useEffect(() => {
       
        axios.get(api + 'get_users/').then((response) => {
            setDataFound(response.data.success)
            if (response.data.success === true) {
                setUsers(response.data.results)
             
              }
            
        })

    }, []);

return(
    <div className="hero-all">
        <Admin_Side_Bar/>
        <div className="content mt-5">
            <h2 className="text-primary text-center">Users</h2>
        <div className="container-wrapper">
        <table className="table survay_table">
                                    <tr className="survey_tr">
                                        <th className="survey_th">Email</th>
                                        <th className="survey_th">Mobile Number</th>
                                        <th className="survey_th ">Firstname</th>
                                        <th className="survey_th ">Lastname</th>
                                        <th className="survey_th ">Levels</th>
                                        <th className="survey_th ">Roles</th>
                                        
                                    </tr>

                                  {users.map((user, xid) => (
                                        <tr key={xid} className="survey_tr" scope="row">
                                            <td className="survey_td _td">{user.email}</td>
                                            <td className="survey_td">{user.mobileNo}</td>
                                            <td className="survey_td">{user.firstname}</td>
                                            <td className="survey_td">{user.lastname}</td>
                                            <td className="survey_td">{user.level}</td>
                                            <td className="survey_td">{user.role}</td>
                                            
                                        </tr>
                                    ))}
                                </table>
</div>
        </div>

    </div>
)
}
export default Users;