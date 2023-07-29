import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import friendrequestImage from "./add-friend.png";

const Userlist = ({ users, handleDelete }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [data, setData] = useState(null);
  const [pendingConnection, setPendingConnection] = useState(null);
  const [acceptedConnection, setacceptedConnection] = useState(null);
  const [declinedConnection, setdeclinedConnection] = useState(null);

  useEffect(() => {
    const filtered = users
      .sort((a, b) => {
        if (a._id === data?.userid) return -1;
        if (b._id === data?.userid) return 1;
        return 0;
      })
      .filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    setFilteredUsers(filtered);

    const fetchdata = async () => {
      const session = await axios.get("http://localhost:5000/check-auth", {
        withCredentials: true,
      });
      setData(session.data);
      const response = await axios.get(
        "http://localhost:5000/connections-data",
        {
          withCredentials: true,
        }
      );
      if (Array.isArray(response.data)) {
        const filteredpendingData = response.data.filter(
          (item) => item.status === "P"
        );
        console.log(filteredpendingData);
        setPendingConnection(filteredpendingData);
        const filteredacceptedData = response.data.filter(
          (item) => item.status === "A"
        );
        console.log(filteredacceptedData);
        setacceptedConnection(filteredacceptedData);

        const filtereddeclinedData = response.data.filter(
          (item) => item.status === "D"
        );
        console.log(filtereddeclinedData);
        setdeclinedConnection(filtereddeclinedData);
      }
    };

    fetchdata();
  }, [searchValue, users, data?.userid]);

  const handleSearchBar = (event) => {
    setSearchValue(event.target.value);
  };
  const handleFriendrequest = (reciever_name, reciever_id) => {
    axios
      .post(
        "http://localhost:5000/create-connection",
        { reciever_name, reciever_id },
        { withCredentials: true }
      )
      .then(console.log("friend request sent"))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  const renderFriendRequestButton = (user) => {
    if (pendingConnection && acceptedConnection && declinedConnection) {
      if (
        pendingConnection.find(
          (item) =>
            item.reciever_id === user._id && item.sender_id === data.userid
        )
      ) {
        return <h5 className="pendingicon">Request sent</h5>;
      } else if (
        pendingConnection.find(
          (item) =>
            item.sender_id === user._id && item.reciever_id === data.userid
        )
      ) {
        return <h5 className="pendingicon">Request recieved</h5>;
      } else if (
        acceptedConnection.find(
          (item) =>
            (item.sender_id === user._id && item.reciever_id === data.userid) ||
            (item.sender_id === data.userid && item.reciever_id === user._id)
        )
      ) {
        return <h5 className="pendingicon">friend {": ))"}</h5>;
      } else if (
        declinedConnection.find(
          (item) =>
            (item.sender_id === user._id && item.reciever_id === data.userid) ||
            (item.sender_id === data.userid && item.reciever_id === user._id)
        )
      ) {
        return <h5 className="pendingicon">request Declined {": ("}</h5>;
      } else {
        return (
          <a onClick={() => handleFriendrequest(user.name, user._id)}>
            <img src={friendrequestImage} alt="frq" className="frndreqicon" />
          </a>
        );
      }
    }
  };

  return (
    <div className="userList">
      <input
        id="searchbar"
        type="text"
        placeholder="Search_Users\~"
        onChange={handleSearchBar}
        value={searchValue}
      />
      {filteredUsers &&
        filteredUsers.map((user) => (
          <div className="previewbox" key={user._id}>
            <Link
              to={
                user._id === (data?.userid || "")
                  ? `/profile`
                  : `/users/${user._id}`
              }
            >
              <h3>
                {user.name}{" "}
                {user._id === (data?.userid || "") ? <span>(You)</span> : null}
              </h3>
              <p>{user.email}</p>
            </Link>
            <button onClick={() => handleDelete(user._id)}>Close</button>
            {user._id === (data?.userid || "") ? null : (
              <>{renderFriendRequestButton(user)}</>
            )}
          </div>
        ))}
    </div>
  );
};

export default Userlist;
