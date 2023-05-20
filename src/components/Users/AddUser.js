import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "./../UI/Button";
import ErrorModel from "../UI/ErrorModel";

const AddUser = (props) => {
  const [enterUsername, setEnterUsername] = useState("");
  const [enterAge, setEnterAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enterUsername.trim().length === 0 || enterAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid input (Non empty values)",
      });
      return;
    }
    if (+enterAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age ( > 0 )",
      });
      return;
    }
    props.onAddUser(enterUsername, enterAge);
    setEnterUsername("");
    setEnterAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnterUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnterAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enterUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enterAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
