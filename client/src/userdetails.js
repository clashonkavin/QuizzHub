import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const UserDetails = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userid, setUserID] = useState("");
  const [time, setTime] = useState("");
  const [quizes, setQuizes] = useState([]);
  const [hasQuizes, setHasQuizes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/" + id, {
          withCredentials: true,
        });
        setName(response.data.name);
        setEmail(response.data.email);
        setUserID(response.data._id);
        setTime(response.data.createdAt);

        const quizesResponse = await axios.get(
          "http://localhost:5000/feed/" + id,
          {
            withCredentials: true,
          }
        );
        setQuizes(quizesResponse.data);
        setHasQuizes(quizesResponse.data.length > 0);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="profilebox">
        <h1>User Details</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <p>UserID : {userid}</p>
        <p>CreatedAt : {time}</p>
        {hasQuizes && <p>Quizes created by {name} :</p>}
        {hasQuizes &&
          quizes.map((quiz) => (
            <div className="quizbox" key={quiz._id}>
              <Link to={`/quizes/${quiz._id}`}>
                <h3>Quiz : {quiz.quizname}</h3>
                <p>Description : {quiz.descp}</p>
              </Link>
            </div>
          ))}
        {!hasQuizes && <p>No Quizes were created by {name}</p>}
      </div>
    </div>
  );
};

export default UserDetails;
