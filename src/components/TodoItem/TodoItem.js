import React from "react";
import styles from "./TodoItem.module.scss";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { title, done } = this.props.item;
    return (
      <div
        className={[styles.TodoItem, done && styles.active].join(" ")}
        onDoubleClick={this.props.remove}
      >
        <span
          onClick={this.props.done}
          className={[styles.check].join(" ")}
        ></span>
        <span className={styles.title}>{title}</span>
      </div>
    );
  }
}

export default TodoItem;
