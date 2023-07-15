import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import axios from "axios";

const UserLogout = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:5000/',{withCredentials:true}).then((res)=>{
            if(res.data=='error'){
                navigate('/login')
            }
        })
        axios.get('http://localhost:5000/logout', { withCredentials: true });
        navigate('/login')
    },[])
    return ( 
        <div></div>
     );
}
export default UserLogout;