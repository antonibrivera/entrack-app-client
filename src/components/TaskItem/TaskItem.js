import React from 'react';
import './TaskItem.css';
import StateContext from '../Utils/StateContext';

export default class TaskItem extends React.Component {
  static contextType = StateContext;

  render() {
    const { handleDeleteTask, handleEditTask } = this.context
    const { task, hours, minutes, date } = this.props
    return (
      <li>
        <h3>{task.task_name}</h3>
        <p>{hours} hours and {minutes} minutes</p>
        <p>{task.description}</p>
        <p>{date}</p>
        <button onClick={() => handleDeleteTask(this.props.id)} >Delete</button>
        <button onClick={() => handleEditTask(this.props.id)}>Edit</button>
      </li>
    )
  }
}