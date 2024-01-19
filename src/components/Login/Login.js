import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
const Reducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_PASS") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PASS_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: null };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [enteredName, setEnteredName] = useState("");
  const [nameIsValid, setNameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [state, dispatch] = useReducer(Reducer, { value: "", isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = state;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordIsValid && enteredName.trim().length > 2
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, enteredName]);

  const emailChangeHandler = (event) => {
    dispatch({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // )
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_PASS", val: event.target.value });

    // setFormIsValid(
    //   state.isValid && event.target.value.trim().length > 6
    // )
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const validateEmailHandler = () => {
    dispatch({ type: "INPUT_BLUR" });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASS_BLUR" });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const validateNameHandler = () => {
    setNameIsValid(enteredName.trim().length > 3);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.value, passwordState.value, enteredName);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={state.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>

        <div
          className={`${classes.control} ${
            nameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegeName">collegeName</label>
          <input
            type="text"
            id="collegename"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
          />
        </div>
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
