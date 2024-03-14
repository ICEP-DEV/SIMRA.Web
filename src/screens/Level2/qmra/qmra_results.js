import { useEffect, useState } from "react";
import axios from "axios";


function Qmra_results(){
    const [QMRA_Group,setQMRA_Group] = useState([])
    const [QMRA_Results,setQMRA_Results] = useState([])


    useEffect(()=>{
        axios.get('http://localhost:3001/api/qmra_group').then((respond)=>{
        console.log(respond.data.results)
        setQMRA_Group(respond.data.results)
        }, err=>{console.log(err)})

        axios.get('http://localhost:3001/api/qmra_results').then((respond)=>{
        console.log(respond.data.results)
        setQMRA_Results(respond.data.results)
        }, err=>{console.log(err)})
    },[])
    return(
        <div>
            <div>
                {QMRA_Group.map((qmra_group, xid)=>(
                    <div key={xid}>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Qmra_results;