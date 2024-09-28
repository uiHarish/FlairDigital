import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
// import { FloatLabel } from "primereact/floatlabel";
import "./Login.scss";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import googleIcon from "./../../Assets/googleIcon.svg";
import githubIcon from "./../../Assets/githubIcon.svg";
import facebookIcon from "./../../Assets/facebookIcon.svg";

const Login = ({ open, handleClose }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  const handleClick = (e) => {
    const { alt } = e.target;
    if (alt === "googleImage") {
      window.location.href = "https://accounts.google.com/signin";
    } else if (alt === "githubImage") {
      window.location.href = "https://github.com/login";
    } else if (alt === "facebookImage") {
      window.location.href = "https://www.facebook.com/login";
    }
  };
  const handleSubmit = async () => {
    // const usernameRegex     = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9_.-]*$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const usernameError =
      username === ""
        ? "Username is required"
        : !usernameRegex.test(username)
        ? "Invalid username format"
        : "";
    const passwordError =
      password === ""
        ? "Password is required"
        : !passwordRegex.test(password)
        ? "Invalid password format. Must contain at 8 characters. Ex: Abc@1234"
        : "";

    setErrors({ usernameError, passwordError });

    if (usernameError || passwordError) {
      return;
    } else {
      const loginData = {
        userName: username,
        password: password,
      };
      console.log("data", loginData);
      try {
        const response = await fetch(
          "https://auth-c7xw.onrender.com/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          }
        );
        const result = await response.json();
        console.log("res==>", result);
        if (result && result.error.includes("username")) {
          setErrors({ usernameError: result.error, passwordError: "" });
        } else if (result && result.error.includes("password")) {
          setErrors({ usernameError: "", passwordError: result.error });
        }
      } catch (err) {
        console.log("Error", err);
      }
    }
  };

  return (
    <Dialog
      header="LOGIN"
      visible={open}
      //   style={{ width: "50vw" }}
      onHide={() => {
        handleClose();
      }}
      className="loginDialog"
    >
      <div className="login">
        <div className="flex flex-column gap-3 inputText">
          {/* <FloatLabel> */}
          <label className="text-base" htmlFor="username">
            Username
          </label>
          <InputText
            id="username"
            className="inputText"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* </FloatLabel> */}

          {errors.usernameError && (
            <small id="username-help" style={{ color: "red" }}>
              {errors.usernameError}
            </small>
          )}
        </div>
        <div className="flex flex-column gap-2 inputText margin">
          {/* <FloatLabel> */}
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            className="inputText"
            // aria-describedby="password-help"
            // placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
          />
          {/* </FloatLabel> */}
          {errors.passwordError && (
            <small id="password-help" style={{ color: "red" }}>
              {errors.passwordError}
            </small>
          )}
        </div>

        {/* <InputText className="inputText" placeholder="Username" />
        <InputText className="inputText" placeholder="Password" /> */}
        <a href="/forgotPassword" className="fontColor">
          Forgot Password
        </a>
        <div className="loginButtons">
          <Button outlined onClick={handleSubmit}>
            Sign In
          </Button>
        </div>
        <p>or continue with</p>
        <div className="loginIcons">
          <Image
            src={googleIcon}
            alt="googleImage"
            onClick={(e) => handleClick(e)}
          />
          <Image
            src={githubIcon}
            alt="githubImage"
            onClick={(e) => handleClick(e)}
          />
          <Image
            src={facebookIcon}
            alt="facebookImage"
            onClick={(e) => handleClick(e)}
          />
        </div>
        <p>
          Don’t have an account yet?{" "}
          <a href="/signUP" className="fontColor">
            {" "}
            Sign up
          </a>
        </p>
      </div>
    </Dialog>
  );
};
export default Login;
