import React from "react";
import styles from "./App.module.scss";
import TodoList from "../TodoList/TodoList";

function App() {
  return (
    <div className={styles.App}>
      <TodoList />
    </div>
  );
}

export default App;
