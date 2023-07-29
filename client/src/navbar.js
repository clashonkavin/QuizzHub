import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [notifs, setpendingConnection] = useState(null);
  const handleCreateQuiz = () => {
    navigate("/createQuiz/" + data.userid);
  };

  const handleLogout = () => {
    axios.get("http://localhost:5000/logout", { withCredentials: true });
    navigate("/login");
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/check-auth", { withCredentials: true })
      .then((res) => {
        if (res.data === "notloggedin") {
          navigate("/login");
        }
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error checking authentication:", error);
      });

    const fetchdata = async () => {
      const response = await axios.get(
        "http://localhost:5000/connections-data",
        {
          withCredentials: true,
        }
      );
      if (Array.isArray(response.data)) {
        const filteredData = response.data.filter(
          (item) => item.reciever_id === data.userid && item.status === "P"
        );
        console.log("notifs : ", filteredData, data.userid);
        setpendingConnection(filteredData);
      }
    };
    fetchdata();
  }, [data.userid]);

  const handleResponse = (id, status) => {
    axios
      .post(
        "http://localhost:5000/connection-response",
        { id, status },
        {
          withCredentials: true,
        }
      )
      .then(window.location.reload());
  };

  const [showEventForm, setShowEventForm] = useState(false);
  const handleShowForm = () => {
    setShowEventForm(true);
  };

  const handleCloseForm = () => {
    setShowEventForm(false);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="logo">QuizzHub</div>
      </Link>
      <div className="menu">
        <button onClick={handleShowForm}>Notifs</button>
        <a onClick={handleCreateQuiz}>CreateQuiz</a>
        <Link to="/history">History</Link>
        <Link to="/profile">{data.name} (Profile)</Link>
        <a onClick={handleLogout}>Logout</a>
      </div>
      {showEventForm && (
        <dialog className="notifbox" open>
          <div>
            {notifs &&
              notifs.map((connec) => (
                <p className="notif-preview" key={connec._id}>
                  <span>{connec.sender_name}</span> sent you a friendrequest
                  <button
                    className="responsebtn"
                    onClick={() => handleResponse(connec._id, "A")}
                  >
                    Accept
                  </button>
                  <button
                    className="responsebtn red"
                    onClick={() => handleResponse(connec._id, "D")}
                  >
                    Decline
                  </button>
                </p>
              ))}
            {notifs.length == 0 && (
              <p className="notif-preview">
                No friend requests for you {": ("}
              </p>
            )}
            <button className="closebtn" onClick={handleCloseForm}>
              Close
            </button>
          </div>
        </dialog>
      )}
    </nav>
  );
};

export default Navbar;
