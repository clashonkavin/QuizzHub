import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({})
    const handleCreateQuiz = ()=>{
        navigate('/createQuiz/'+data.id)
    }
    const getdata = async ()=>{
        const response = await axios.get('http://localhost:5000/profile', { withCredentials: true })
        setData(response.data)
    }
    useEffect(()=>{
        getdata()
    },[])
    return ( 
        <nav className= 'navbar'>
            <Link to="/"><div className="logo">QuizzHub</div></Link>
            <div className="menu">
                <Link to="/">Home</Link>
                <a onClick={handleCreateQuiz}>CreateQuiz</a>
                <Link to="/history">History</Link>
                <Link to="/profile">{data.name} (Profile)</Link>
                <Link to="/logout">Logout</Link>
            </div>

        </nav>
     );
}
 
export default Navbar;