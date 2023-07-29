import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Userlist from "./userlist";
import Quizlist from "./quizlist";

const UserFeed = () => {
  const [quizes, setQuizes] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const users = await axios.get("http://localhost:5000/quizes", {
        withCredentials: true,
      });
      setQuizes(users.data);
      const quizes = await axios.get("http://localhost:5000/users", {
        withCredentials: true,
      });
      setUsers(quizes.data);
    };
    fetchData();
  }, []);

  const handleDeleteUser = (id) => {
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
  };
  const handleDeleteQuiz = (id) => {
    const newQuizes = quizes.filter((quiz) => quiz._id !== id);
    setQuizes(newQuizes);
  };

  return (
    <div>
      <Navbar />
      <div className="user-feed-container">
        <div className="feed-container">
          <h1>Feed</h1>
          {quizes && (
            <Quizlist quizes={quizes} handleDelete={handleDeleteQuiz} />
          )}
        </div>
        <div className="user-list-container">
          <h2>Users</h2>
          {users && <Userlist users={users} handleDelete={handleDeleteUser} />}
        </div>
      </div>
    </div>
  );
};

export default UserFeed;
