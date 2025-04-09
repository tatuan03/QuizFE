import React, { useContext, useState } from "react";
import { Modal, Button, Container, Navbar } from "react-bootstrap";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Auth from "./components/Auth"; // Form đăng nhập
import { DataProvider } from "./context/dataContext";
import DataContext from "./context/dataContext";

function AppContent({ user, setUser, showAuthModal, setShowAuthModal, handleLogout }) {
  const { showStart, showQuiz, showResult } = useContext(DataContext);

  return (
    <>
      <div className="container mt-3 d-flex justify-content-between align-items-center">
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">Quiz App</Navbar.Brand>
          </Container>
        </Navbar>
        {user ? (
          <div>
            <span className="me-3">Welcome, {user.name}</span>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Button variant="primary" onClick={() => setShowAuthModal(true)}>Login</Button>
        )}
      </div>

      {/* Hiển thị Auth Modal */}
      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Auth setUser={setUser} closeModal={() => setShowAuthModal(false)} />
        </Modal.Body>
      </Modal>

      {/* Các component chính */}
      {showStart && <Start user={user} setUser={setUser} />}
      {showQuiz && <Quiz />}
      {showResult && <Result />}
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <DataProvider>
      <AppContent
        user={user}
        setUser={setUser}
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
        handleLogout={handleLogout}
      />
    </DataProvider>
  );
}

export default App;
