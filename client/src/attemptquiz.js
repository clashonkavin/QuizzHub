

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const QuizDisplay = () => {
    const navigate = useNavigate()
    const { quizid } = useParams();
    const [quizData, setquizData] = useState([]);
    const [isOwner, setisOwner] = useState(false);
    const [chosenOptions, setChosenOptions] = useState([]);
    const [submitted, setsubmitted] = useState(false)
    const [Score, setScore] = useState(0);
    const [numbertaken, setnumbertaken]=useState()
    const [prevAttempts, settakenBy]=useState([])
    const [qName,setqName]=useState('')
    const [qdesc,setqdesc]=useState('')
    let temp
    useEffect(() => {
        axios.get('http://localhost:5000/',{withCredentials:true}).then((res)=>{
            if(res.data=='error'){
                navigate('/')
            }
        })
        axios
            .get(`http://localhost:5000/quizeswithuserdetails/${quizid}`, { withCredentials: true })
            .then((res) => {
                const {quizname, descp, creatorsId, questions, numberoftimestaken, takenby} = res.data[1];
                setquizData(questions);
                setqName(quizname)
                setqdesc(descp)
                if(res.data[0]== creatorsId ){
                    setnumbertaken(numberoftimestaken)
                    settakenBy(takenby)
                    setisOwner(true)
                }else{
                    setisOwner(false)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [quizid]);

    const handleOptionChange = (questionIndex, event, optionIndex) => {
        const updatedOptions = [...chosenOptions];
        updatedOptions[questionIndex] = optionIndex + 1;
        setChosenOptions(updatedOptions);
    };

    const handleSubmit = () => {
        if (!submitted) {
            temp = 0
            for (let i = 0; i < chosenOptions.length; i++) {
                if (chosenOptions[i] == parseInt(quizData[i].correctOption)) {
                    temp++
                }
            }
            setsubmitted(true)
            setScore(temp)
            axios.post(`http://localhost:5000/quizes/${quizid}`, { score: temp , qName ,total : quizData.length}, { withCredentials: true }).then((res) => console.log(res))
        }  };

    return (
        <div className="quizpage">
            <Navbar />
            {isOwner && <div className="container historyofquiz">
                        <h2>(You created this Quiz)</h2>
                        <h1>History</h1>
                        <h4>{numbertaken} people took your Quiz</h4>
                        <p className="margin-y">Attempts by Users:</p>
                        {(numbertaken>0)&& 
                        
                            prevAttempts.map((record,recordIndex)=>(
                            <p key = {`${record[0]}-${recordIndex}`}><Link to= {`/users/${record[0]}`}>{record[1]}</Link> with a score of {record[2]}</p>
                        ))}
                        {(numbertaken==0)&& 
                            <p>No Record</p>
                        }

                </div>}
            {submitted && <h2 className="submission container">Submitted, You scored {Score} out of {quizData.length} </h2>}
            {!isOwner && !submitted && (
                <div className="container takequiz">
                    <h2>{qName}</h2>
                    <h3>{qdesc}</h3>
                    {quizData.map((questionData, questionIndex) => (
                        <div className='takequestion' key={questionIndex}>
                            <h2>Question : {questionData.question}</h2>
                            <ul>
                                {questionData.options.map((option, optionIndex) => (
                                    <div className='takeoption' key={optionIndex}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`question${questionIndex}`}
                                                value={option}
                                                checked={chosenOptions[questionIndex] === optionIndex + 1}
                                                onChange={(event) => handleOptionChange(questionIndex, event, optionIndex)}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <button type="button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizDisplay;
