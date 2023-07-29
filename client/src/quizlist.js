import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Quizlist = ({ quizes, handleDelete }) => {
  const [names, setNames] = useState({});

  const getName = async (id) => {
    try {
      const response = await axios.get("http://localhost:5000/users/" + id, {
        withCredentials: true,
      });
      const name = response.data.name;
      setNames((prevState) => ({ ...prevState, [id]: name }));
    } catch (error) {
      console.error("Error retrieving name:", error);
    }
  };
  const [selectedValue, setselectedValue] = useState(null);
  const handleDropdown = () => {
    const dropdown = document.getElementById("selection");
    setselectedValue(dropdown.value);
  };

  useEffect(() => {
    setselectedValue("popular");
    quizes.forEach((quiz) => {
      if (!names[quiz.creatorsId]) {
        getName(quiz.creatorsId);
      }
    });
  }, [quizes]);

  return (
    <div className="quiz-list">
      <select onChange={handleDropdown} id="selection">
        <option value="popular">Most Popular</option>
        <option value="recent">Most Recent</option>
      </select>
      {selectedValue == "popular" &&
        quizes
          .sort((a, b) => {
            return b.numberoftimestaken - a.numberoftimestaken;
          })

          .map((quiz) => (
            <div className="previewbox" key={quiz._id}>
              <Link to={`/quizes/${quiz._id}`}>
                <h3>Quiz : {quiz.quizname}</h3>
                <p>Description : {quiz.descp}</p>
              </Link>
              <p>Created by {names[quiz.creatorsId]}</p>
              <button onClick={() => handleDelete(quiz._id)}>Close</button>
            </div>
          ))}
      {selectedValue == "recent" &&
        quizes
          .sort((a, b) => {
            const date1 = new Date(a.createdAt);
            const date2 = new Date(b.createdAt);
            return date2 - date1;
          })
          .map((quiz) => (
            <div className="previewbox" key={quiz._id}>
              <Link to={`/quizes/${quiz._id}`}>
                <h3>Quiz : {quiz.quizname}</h3>
                <p>Description : {quiz.descp}</p>
              </Link>
              <p>Created by {names[quiz.creatorsId]}</p>
              <button onClick={() => handleDelete(quiz._id)}>Close</button>
            </div>
          ))}
    </div>
  );
};

export default Quizlist;
