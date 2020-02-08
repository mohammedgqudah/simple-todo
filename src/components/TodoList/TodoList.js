import React from "react";
import styles from "./TodoList.module.scss";
import TodoItem from "../TodoItem/TodoItem";
import empty from "../../discord_checkmark-transparent.png";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      list: JSON.parse(localStorage.getItem("data") || "[]")
    };
  }
  save = () => {
    // timeout so we dont save before SetState
    setTimeout(() => {
      localStorage.setItem("data", JSON.stringify(this.state.list));
      console.log("after save", JSON.stringify(this.state.list));
    }, 500);
  };
  keyPress = e => {
    let { value, list } = this.state;
    if (e.key === "Enter" && value.trim() !== "") {
      list.unshift({ title: value, id: Math.random() + Date.now() });
      this.setState({ list, value: "" });
      this.save();
    }
  };
  onChange = ({ target }) => {
    this.setState({ value: target.value });
  };
  done = idx => {
    let { list } = this.state;
    list = list.map((i, _idx) => {
      if (idx === _idx) i.done = !i.done;
      return i;
    });
    this.setState({ list });
    this.save();
  };
  remove = key => {
    let { list } = this.state;
    this.setState({ list: list.filter(i => i.id !== key) });
    this.save();
  };
  render() {
    let { value, list } = this.state;
    return (
      <div className={styles.TodoList}>
        <header>
          <h2 className={styles.head}>{"Awesome list"}</h2>
        </header>
        <div className={styles.input_con}>
          <input
            type="text"
            value={value}
            className={styles.input}
            onChange={this.onChange}
            onKeyPress={this.keyPress}
            autoFocus
          />
        </div>
        <div
          className={styles.list}
          style={{ backgroundImage: list.length === 0 && `url(${empty})` }}
        >
          {list.map((i, idx) => (
            <TodoItem
              item={i}
              key={idx}
              done={() => {
                this.done(idx);
              }}
              remove={() => {
                this.remove(i.id);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TodoList;
