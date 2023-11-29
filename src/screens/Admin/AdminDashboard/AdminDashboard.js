import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SideBar from '../Sidebar/SideBar';
import { useSelector } from 'react-redux';
import NavBar_Admin from '../NavBar_Admin/NavBar_Admin';
function AdminDashboard() {

    const api = "http://localhost:3001/api/"

    const [users, setUsers] = useState([{}]);
    const [datafound, setDataFound] = useState({});
    const [data, setData] = useState([]);
    const [newRowData, setNewRowData] = useState({
        // initialize with default values or empty strings
        email:'',
        mobileNo:'',
        firstname:'',
        lastname:'',
        level:'',
        role:''
        // add other fields as needed
      });
   
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData({
      ...newRowData,
      [name]: value,
    });
  };
      const handleAddRow = () => {
        // Update the state with the new row
        setData([...data, newRowData]);
    
        // Send update to the database
        axios.post('/api/your-endpoint', newRowData)
          .then(response => {
            console.log('Data added successfully:', response.data);
            // Handle success if needed
          })
          .catch(error => {
            console.error('Error adding data:', error);
            // Handle error if needed
          });
      };
     
    useEffect(() => {

        axios.get(api + 'get_users/').then((response) => {
            setDataFound(response.data.success)
            if (response.data.success === true) {
                setUsers(response.data.results)
                console.log(users)

            }

        })


    }, []);
    return (
        <div className="hero-all"> 
            <div className='main-side bg-dark text-white' style={{width:'16%', height:''}} >
            <SideBar/>
            </div>
      
            <div className="container" >

               <div>
               <table>
                    <thead className='alert alert-info'>
                        <tr>
                            
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Firstname</th>
                            <th>LastName</th>
                            <th>Level</th>
                            <th>role</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, xid) => (
                            <tr key={xid} className="survey_tr" scope="row">
                               
                                <td>{user.email}</td>
                                <td>{user.mobileNo}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.level}</td>
                                <td>{user.role}</td>

                                <td><button className='btn btn-dark'>Update</button></td>
                                <td><button className='btn btn-secondary'>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               </div>
               
                <div className='btn-admin'>
                <button className='btn-admin btn btn-primary mt-5 '  onClick={handleAddRow} >ADD USER</button>
                </div>
                {/* <form>
        <label>Email:
          <input type="text" name="name" value={newRowData.email} onChange={handleInputChange} />
        </label>
        <label>Mobile Number:
          <input type="text" name="age" value={newRowData.mobileNo} onChange={handleInputChange} />
        </label>
      
        <label>First name:
          <input type="text" name="name" value={newRowData.firstname} onChange={handleInputChange} />
        </label>
        <label>Last name:
          <input type="text" name="age" value={newRowData.lastname} onChange={handleInputChange} />
        </label>
       
        <label>Level:
          <input type="text" name="name" value={newRowData.level} onChange={handleInputChange} />
        </label>
        <label>Role:
          <input type="text" name="age" value={newRowData.role} onChange={handleInputChange} />
        </label>
        {/* Add other input fields as needed 
        <button type="button" onClick={handleAddRow}>Add Row</button>
      </form> */}
            </div>


        </div>
    )
}

export default AdminDashboard;