import React from 'react';
import './Dashboard.css';
import TaskServices from '../../services/task-services';
import { Link } from 'react-router-dom';
export default class Dashboard extends React.Component {
  state={
    tasks: [],
    error: null
  }

  componentDidMount() {
    return TaskServices.getAllTasks()
      .then(tasks => (
        (tasks.error)
          ? this.setState({ error: tasks.error })
          : this.setState({ tasks })
      ))
  }

  generateTaskDate(date) {
    const dateArray = date.split('-')
    const month = dateArray[1]
    const day = dateArray[2].split('T')[0]
    const year = dateArray[0]
    return `${month}/${day}/${year}`
  }

  generateTasksList() {
    return (this.state.error)
    ? <p>{this.state.error}</p>
    : this.state.tasks.map(task => {
      const hours = (!task.duration.hours) ? 0 : task.duration.hours
      const minutes = (!task.duration.minutes) ? 0 : task.duration.minutes
      const date = this.generateTaskDate(task.task_date)
      return <li>
        <h3>{task.task_name}</h3>
        <p>{hours} hours and {minutes} minutes</p>
        <p>{task.description}</p>
        <p>{date}</p>
      </li>
    })
  }

  render() {
    return (
      <div>
        <Link to='/create-task'>Add Task</Link>
        <ul>
          {this.generateTasksList()}
        </ul>
      </div>
    )
  }
}