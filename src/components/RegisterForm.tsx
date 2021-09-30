import React, { useState } from "react";
import axios from "axios";
import styles from "./RegisterForm.module.scss";

const RegisterForm: React.FC<{ closeModal(): void }> = ({ closeModal }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    pwd1: "",
    pwd2: "",
  });
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formValues.pwd1 === formValues.pwd2) {
      try {
          const auth_details = {
            password: formValues.pwd1,
            username: formValues.username,
            email: formValues.email,
          };
        axios
          .post("/register", auth_details)
          .then((response) => {
            if (response.status === 201) {
                axios.post('/login', auth_details).then(response => {
                    const token = response.data.token;
                }
                )
              closeModal();
            } else {
              alert("Some error happened.");
            }
          }); 
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Passwords mismatch!");
    }
  };
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  return (
    <>
      <h3>Registration</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">What's your name?</label>
        <input
          type="text"
          placeholder="nickname"
          name="username"
          required
          onChange={handleInput}
          value={formValues["username"]}
        />
        <label htmlFor="email">Enter your email</label>
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          onChange={handleInput}
          value={formValues["email"]}
        />
        <label htmlFor="pwd1">Enter your password</label>
        <input
          type="password"
          placeholder="password"
          name="pwd1"
          required
          onChange={handleInput}
          value={formValues["pwd1"]}
        />
        <label htmlFor="pwd2">Enter your password again</label>
        <input
          type="password"
          placeholder="password again"
          name="pwd2"
          required
          onChange={handleInput}
          value={formValues["pwd2"]}
        />
        <input type="submit" value="Sign up" />
      </form>
    </>
  );
};

export default RegisterForm;
