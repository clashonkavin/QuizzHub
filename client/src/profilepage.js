import { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "./navbar";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
    let temp = false
    const navigate = useNavigate()
    const handleHistory = ()=>{
            navigate('/history')
    }

    const [data,setData] = useState({})
    const getdata = async ()=>{
        const response = await axios.get('http://localhost:5000/profile', { withCredentials: true })
        setData(response.data)
        getQuizdata(response.data.id)
    }
    const [quizes,setQuizes] = useState(null)
    const getQuizdata = async (id) => {
        const response = await axios.get('http://localhost:5000/feed/' + id, { withCredentials: true });
        setQuizes(response.data) 
    }
    useEffect(()=>{
        axios.get('http://localhost:5000/',{withCredentials:true}).then((res)=>{
            if(res.data=='error'){
                navigate('/login')
            }
        })
        getdata()
    },[])
    
    return (
        <div >
            <Navbar/>
            <div className="container-fluid userdetails">
                <h2>Your Profile</h2>
                <p>Name : {data.name}</p>
                <p>Email : {data.email}</p>
                <p>UserId : {data.id}</p>
                <p>Quizes you have created :</p>
                {quizes && quizes.map(quiz => (
                    <div className="quiz-preview profilequiz" key={quiz._id} >
                        <Link to={`/quizes/${quiz._id}`}>
                            <h3>Quiz :  {quiz.quizname} {temp = true}</h3>
                            <p>Description : {quiz.descp}</p>
                        </Link>
                </div>

                ))}
                {(!temp) && <p>No Quizes</p>}
                <button id='historybtn' type="button" onClick={handleHistory}>History</button>
            </div>
        </div>
    );
}
 
export default UserProfile;