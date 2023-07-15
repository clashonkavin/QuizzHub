import { useState , useEffect} from "react";
import axios from 'axios'
import Navbar from "./navbar";
import Userlist from "./userlist";
import { Link, useNavigate } from "react-router-dom";
import Quizlist from "./quizlist";

const UserFeed = () => {
    const navigate = useNavigate()
    const [quizes,setQuizes] = useState(null)
    const getQuizdata = async () => {
        const response = await axios.get('http://localhost:5000/feed', { withCredentials: true });
        setQuizes(response.data) 
    }

    const [users,setUsers] = useState(null)
    const getUserdata = async () => {
        const response = await axios.get('http://localhost:5000/', { withCredentials: true });
        setUsers(response.data)
 
    }
    useEffect(()=>{
        axios.get('http://localhost:5000/',{withCredentials:true}).then((res)=>{
            if(res.data=='error'){
                navigate('/login')
            }
            else{
                getUserdata()
                getQuizdata()
            }
        })
        
    },[])

    const handleDeleteUser = (id) => {
        const newUsers = users.filter(user => user._id !== id);
        setUsers(newUsers);
    }
    const handleDeleteQuiz = (id) => {
        const newQuizes = quizes.filter(quiz => quiz._id !== id);
        setQuizes(newQuizes);
    }

    return ( 
        <div>
            <Navbar/>
            <div className="container-solid">

                <div className="container-fluid" id="feed">
                    <h1>Feed</h1>
                    {quizes && <Quizlist quizes={quizes} handleDelete={handleDeleteQuiz}/>}
                </div>
                <div className="container-fluid" id='youmayknow'>
                    <h2>Users</h2>
                    {users && <Userlist users={users} handleDelete={handleDeleteUser} />}
                </div>
            </div>
        </div>
     );
}
 
export default UserFeed;