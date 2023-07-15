import { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "./navbar";
import { Link, useNavigate } from "react-router-dom";

const UserHistroy = () => {

    const navigate = useNavigate()
    const [history,sethistory] = useState(false)

    const [data,setData] = useState({})
    const getdata = async ()=>{
        const response = await axios.get('http://localhost:5000/history', { withCredentials: true })
        setData(response.data)
        if(response.data.quizAttempted.length > 0) {sethistory(true)}
    }
    useEffect(() => {
        axios.get('http://localhost:5000/',{withCredentials:true}).then((res)=>{
            if(res.data=='error'){
                navigate('/login')
            }
            else{
                getdata()
            }
        })
      }, []);

    return (  
        <div>
             <Navbar/>
             <div className="container history">
                <h2 id='header' >Quiz Attempt History</h2>
                {history && data.quizAttempted.map((record,index) => (
                    <div className="historybox" key={`${record}-${index}`} >
                            <p>QuizName :  {record[0]}</p>
                            <p>Scored {record[2]} out of {record[3]}</p>
                    </div>
                ))}
                {!history && <p className="center">You did not attempt any quiz yet</p>}
             </div>
            </div>
    );
}
 
export default UserHistroy;