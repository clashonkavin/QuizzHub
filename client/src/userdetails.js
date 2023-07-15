import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const UserDetails = () => {
    const navigate = useNavigate()
    let temp
    const { id } = useParams();
    const [name,setname] = useState()
    const [email,setemail] = useState()
    const [userid,setuserid] = useState()
    const [time,settime] = useState()
    const getdata = async ()=>{
        const response = await axios.get('http://localhost:5000/users/'+id, { withCredentials: true })
        setname(response.data.name)
        setemail(response.data.email)
        setuserid(response.data._id)
        settime(response.data.createdAt)
    }

    const [quizes,setQuizes] = useState(null)
    const getQuizdata = async () => {
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
        getQuizdata()
    },[])
    return ( 
        <div>
            <Navbar/>
            <div className="container-fluid userdetails">
                <h1>User Details</h1>
                <p>Name : { name }</p>
                <p>Email : { email }</p>
                <p>UserID : { userid }</p>
                <p>CreatedAt : { time } {temp = false} </p>
                {quizes && <p>Quizes created by {name} :</p>}
                {quizes && quizes.map(quiz => (
                    <div className="quiz-preview profilequiz" key={quiz._id} >
                        <Link to={`/quizes/${quiz._id}`}>
                            <h3>Quiz :  {quiz.quizname} {temp = true}</h3>
                            <p>Description : {quiz.descp}</p>
                        </Link>
                </div>

                ))}
                {(!temp) && <p>No Quizes</p>}
            </div>
        </div>
     );
}
 
export default UserDetails;