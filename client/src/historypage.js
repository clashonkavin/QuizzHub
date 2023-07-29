import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";

const UserHistroy = () => {
  const [history, sethistory] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const getdata = async () => {
      const response = await axios.get("http://localhost:5000/history", {
        withCredentials: true,
      });
      setData(response.data);
      if (response.data.quizAttempted.length > 0) {
        sethistory(true);
      }
    };
    getdata();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="profilebox">
        <h2 id="header">Your quiz attempt histroy : {"))"}</h2>
        {history &&
          data.quizAttempted.map((record, index) => (
            <div className="historybox" key={`${record}-${index}`}>
              <h3>QuizName : {record[0]}</h3>
              <h4>
                Scored {record[2]} out of {record[3]}
              </h4>
            </div>
          ))}
        {!history && <p className="center">You did not attempt any quiz yet</p>}
      </div>
    </div>
  );
};

export default UserHistroy;
