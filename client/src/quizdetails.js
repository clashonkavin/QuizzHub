import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "./navbar";
import { Link, useNavigate } from "react-router-dom";

const QuizDetails = () => {
    const [name, setName] = useState();
    const navigate = useNavigate()

    const getName = async (id) => {
      try {
        const response = await axios.get('http://localhost:5000/users/' + id, { withCredentials: true });
        setName(response.data.name);
      } catch (error) {
        console.error('Error retrieving name');
      }
    }

    const handleclick = ()=>{
        navigate('/attemptQuiz/' + quizid)
    }


    const { id } = useParams();
    const [quizname,setquizname] = useState()
    const [descp,setdescp] = useState()
    const [quizid,setquizid] = useState()
    const [time,settime] = useState()
    const [creatorsId,setcreatorsid] = useState()
    const [attemptCount,setattemptcount] = useState()
    const [takenby,settakenby] = useState()
    const getdata = async ()=>{
        const response = await axios.get('http://localhost:5000/quizes/'+id, { withCredentials: true })
        setquizname(response.data.quizname)
        setdescp(response.data.descp)
        setquizid(response.data._id)
        settime(response.data.createdAt)
        setcreatorsid(response.data.creatorsId)
        setattemptcount(response.data.numberoftimestaken)
        settakenby(response.data.takenby)
        getName(response.data.creatorsId)
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
        <div>
            <Navbar/>
            <div className="container-fluid userdetails">
                <h1>Quiz Details</h1>
                <p>Quiz Name : { quizname }</p>
                <p>Description : { descp }</p>
                <p>Creator's Name : { name }</p>
                <h4>{attemptCount} people took this Quiz</h4>
                {(takenby)&& <h4>People who took this quiz :</h4> }
                {(takenby)&& 
                        takenby
                        .filter((record, index, self) => {
                            return self.findIndex(r => r[0] === record[0]) === index;
                          })
                        .map((record,recordIndex)=>(
                        <h4 key = {record[0]}><Link to= {`/users/${record[0]}`}>{record[1]}</Link></h4>
                    ))}
                <p>QuizId: { quizid }</p>
                <p>Creator's Id: { creatorsId }</p>
                <p>CreatedAt : { time }</p>
                <button type='button' onClick={handleclick}>Attempt Quiz</button>
            </div>
        </div>
     );
}
 
export default QuizDetails;