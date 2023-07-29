import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const handleHistory = () => {
    navigate("/history");
  };

  const [data, setData] = useState({});
  const [quizes, setQuizes] = useState([]);
  const [hasQuizzes, setHasQuizzes] = useState(true);
  const [acceptedConnection, setacceptedConnection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/check-auth", {
          withCredentials: true,
        });
        setData(response.data);
        const quizesResponse = await axios.get(
          "http://localhost:5000/feed/" + response.data.userid,
          {
            withCredentials: true,
          }
        );
        setQuizes(quizesResponse.data);
        setHasQuizzes(quizesResponse.data.length > 0);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }

      const response = await axios.get(
        "http://localhost:5000/connections-data",
        {
          withCredentials: true,
        }
      );
      if (Array.isArray(response.data)) {
        const filteredacceptedData = response.data.filter(
          (item) => item.status === "A"
        );
        console.log(filteredacceptedData);
        setacceptedConnection(filteredacceptedData);
      }
    };
    fetchData();
  }, []);

  const [showEventForm, setShowEventForm] = useState(false);
  const handleShowForm = () => {
    setShowEventForm(true);
  };

  const handleCloseForm = () => {
    setShowEventForm(false);
  };
  return (
    <div>
      <Navbar />
      <div className="profilebox">
        <h2>Your Profile</h2>
        <p>Name : {data.name}</p>
        <p>Email : {data.email}</p>
        <p>UserId : {data.userid}</p>
        <p>Quizzes you have created :</p>
        {hasQuizzes ? (
          quizes.map((quiz) => (
            <div className="quizbox" key={quiz._id}>
              <Link to={`/quizes/${quiz._id}`}>
                <h3>Quiz : {quiz.quizname}</h3>
                <p>Description : {quiz.descp}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No Quizzes</p>
        )}
        <button id="historybtn" onClick={handleHistory}>
          History
        </button>
        <button id="friendsbtn" onClick={handleShowForm}>
          Your friends
        </button>
        {showEventForm && (
          <dialog className="friendbox" open>
            <h3>Friend List</h3>
            <button className="closebtn" onClick={handleCloseForm}>
              close
            </button>
            {acceptedConnection &&
              acceptedConnection.map((connec) => (
                <p key={connec._id}>
                  {connec.sender_id === data.userid ||
                  connec.reciever_id === data.userid ? (
                    <span>
                      {connec.sender_name === data.name
                        ? null
                        : connec.sender_name}
                      {connec.reciever_name === data.name
                        ? null
                        : connec.reciever_id_name}
                    </span>
                  ) : (
                    <></>
                  )}
                </p>
              ))}
          </dialog>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
