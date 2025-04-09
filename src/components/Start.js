import React, { useContext, useState, useEffect } from "react";
import DataContext from "../context/dataContext";
import Auth from "./Auth"; 

const Start = ({ user, setUser }) => {
  const { startQuiz, showStart } = useContext(DataContext);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleStartQuiz = (level) => {
    if (!user) {
      setShowLoginPopup(true); // Hiện popup nếu chưa đăng nhập
    } else {
      startQuiz(level);
    }
  };

  return (
    <section className="text-center bg-dark" style={{ display: showStart ? "block" : "none" }}>
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <h1 className="fw-bold mb-4">Select Quiz Level</h1>
            {["Beginner", "Intermediate", "Advanced", "Expert", "Impossible"].map((level, index) => (
              <button
                key={index + 1}
                onClick={() => handleStartQuiz(index + 1)}
                className="btn d-block w-100 px-4 py-2 bg-light text-dark fw-bold mb-2"
              >
                {index + 1}. {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popup đăng nhập */}
      {showLoginPopup && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login Required</h5>
                <button className="btn-close" onClick={() => setShowLoginPopup(false)}></button>
              </div>
              <div className="modal-body">
                <Auth setUser={setUser} closeModal={() => setShowLoginPopup(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Start;
