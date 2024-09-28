import React, { useState } from "react";
import { Button } from "primereact/button";
import Login from "../Components/LoginComponent/Login";

import "./Home.scss";

const Home = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <div className="homeContent">
        <h1>Welcome to my home page</h1>
        <Button label="Login" onClick={handleLoginOpen} />
      </div>
      <Login open={loginOpen} handleClose={handleLoginClose} />
    </>
  );
};
export default Home;
