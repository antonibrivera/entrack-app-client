import React from 'react';
import './TaskItem.css';
import StateContext from '../Utils/StateContext';
import { Link } from 'react-router-dom'

export default class TaskItem extends React.Component {
  static contextType = StateContext;

  render() {
    const { handleDeleteTask } = this.context
    const { task, hours, minutes, date } = this.props
    return (
      <div className="task-item">
        <h3 className="task-name">{task.task_name}</h3>
        <p className="duration">{hours} hours and {minutes} minutes</p>
        <p className="description">{task.description}</p>
        <p className="date">{date}</p>
        <button onClick={() => handleDeleteTask(this.props.id)} >Delete</button>
        <Link to={{
          pathname: '/task/edit',
          state: {
            id: this.props.id
          }
        }}>
          <button>Edit</button>
        </Link>
      </div>
    )
  }
}