import React, { useContext, useState } from 'react';
import DataContext from '../context/dataContext';

const Quiz = () => {
    const {
        showQuiz,
        quizs,
        showTheResult,
        setMarks,
        setShowQuiz,
    } = useContext(DataContext);

    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(quizs.length).fill(null));

    if (!showQuiz || !quizs[questionIndex]) return null;

    const question = quizs[questionIndex];

    const handleAnswerSelect = (answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answer;
        setAnswers(updatedAnswers);
    };

    const nextQuestion = () => {
        if (questionIndex < quizs.length - 1) {
            setQuestionIndex(questionIndex + 1);
        }
    };

    const previousQuestion = () => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1);
        }
    };

    const handleSubmit = () => {
        let score = 0;
        quizs.forEach((q, index) => {
            if (answers[index] === q.correctOption) {
                score += 5;
            }
        });
        setMarks(score);
        setShowQuiz(false);
        showTheResult();
    };

    return (
        <section className="bg-dark text-white" style={{ display: 'block' }}>
            <div className="container">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-4" style={{ background: '#3d3d3d', borderColor: '#646464' }}>
                            <div className="d-flex justify-content-between">
                                <h5 className="text-white">{question.questionText}</h5>
                                <h5 style={{ color: '#60d600' }}>{questionIndex + 1} / {quizs.length}</h5>
                            </div>
                            <div>
                                {[question.optionA, question.optionB, question.optionC, question.optionD].map((option, index) => (
                                    <button
                                        key={index}
                                        className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${answers[questionIndex] === option ? 'bg-primary' : ''}`}
                                        onClick={() => handleAnswerSelect(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    onClick={previousQuestion}
                                    disabled={questionIndex === 0}
                                >
                                    Previous
                                </button>
                                {questionIndex === quizs.length - 1 ? (
                                    <button type='button' className='btn btn-success' onClick={handleSubmit}>
                                        Submit
                                    </button>
                                ) : (
                                    <button type='button' className='btn btn-primary' onClick={nextQuestion}>
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quiz;
