import React from "react";
import "./App.scss";
import TodoBlock from "./components/TodoBlock";

const App: React.FC = () => {
  return (
    <>
      <main className="main">
        <TodoBlock />
      </main>
    </>
  );
};

export default App;
