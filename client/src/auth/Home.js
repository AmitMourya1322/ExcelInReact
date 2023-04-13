import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <>
      <div className="container">
        <h1>Amit Mourya Works</h1>
        <div className="distance">
          <button>
            <Link to="/login" id="login-btn">
              Login
            </Link>
          </button>
          <button>
            <Link to="/signup" id="signup-btn">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
