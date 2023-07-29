import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./profilepage";
import UserFeed from "./feedpage";
import UserLogin from "./loginpage";
import UserRegister from "./registerpage";
import UserDetails from "./userdetails";
import Createquiz from "./createQuiz";
import QuizDetails from "./quizdetails";
import QuizDisplay from "./attemptquiz";
import UserHistroy from "./historypage";
import NotFound from "./notfoundpage";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element={<UserFeed />}></Route>
            <Route exact path="/profile" element={<UserProfile />}></Route>
            <Route exact path="/login" element={<UserLogin />}></Route>
            <Route exact path="/register" element={<UserRegister />}></Route>
            <Route exact path="/users/:id" element={<UserDetails />}></Route>
            <Route exact path="/quizes/:id" element={<QuizDetails />}></Route>
            <Route
              exact
              path="/attemptQuiz/:quizid"
              element={<QuizDisplay />}
            ></Route>
            <Route
              exact
              path="/createQuiz/:id"
              element={<Createquiz />}
            ></Route>
            <Route exact path="/history" element={<UserHistroy />}></Route>
            <Route exact path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
