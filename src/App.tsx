import React from "react";
import "./App.scss";
import TodoBlock from "./components/TodoBlock";
import Nav from './components/Nav';
const App: React.FC = () => {
  // const register = () => {
  //   try {

  //     const data = {
  //       email: "123",
  //       password: '123',
  //       username: 'username'
  //     }
  //     axios.post("/register", data).then(response => {
  //       console.log(response)
  //     });
  //   } catch(e) {
  //     console.log(e);

  //   }
  // }
  return (
    <>
      <Nav />

      <main className="main">
        <TodoBlock />
      </main>
    </>
  );
};

export default App;
