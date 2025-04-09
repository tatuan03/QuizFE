import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Result = ({ goHome }) => {
    const {
        showResult,
        quizs,
        marks,
        startOver,
        setShowStart,
        setShowResult
    } = useContext(DataContext);

    const handleStartOver = () => {
        startOver();
        setShowStart(true);
        setShowResult(false);
    };

    const handleGoHome = () => {
        if (goHome) goHome();
        setShowResult(false);
        setShowStart(false);
    };

    return (
        <section
            className="bg-dark text-white vh-100 d-flex align-items-center justify-content-center"
            style={{ display: showResult ? 'block' : 'none' }}
        >
            <div className="container text-center">
                <div
                    className="col-lg-6 mx-auto p-5 rounded"
                    style={{
                        background: marks > (quizs.length * 5 / 2) ? '#28a745' : '#dc3545'
                    }}
                >
                    <h1 className='mb-3 fw-bold'>
                        {marks > (quizs.length * 5 / 2) ? 'Awesome!' : 'Oops!'}
                    </h1>
                    <h3 className='mb-4 fw-bold'>
                        Your score is {marks} out of {quizs.length * 5}
                    </h3>
                    <div className="d-flex justify-content-center gap-3">
                        <button onClick={handleStartOver} className='btn btn-light fw-bold px-4 py-2'>
                            Về lại trang chủ
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;
