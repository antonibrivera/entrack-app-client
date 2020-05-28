import React from 'react';
import './Dashboard.css';
import TaskServices from '../../services/task-services';
import TaskItem from '../TaskItem/TaskItem';
import StateContext from '../Utils/StateContext';
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
      return <TaskItem key={task.id} id={task.id} task={task} hours={hours} minutes={minutes} date={date} />
    })
  }

  handleEditTask(taskId) {
    
  }

  handleDeleteTask(taskId) {
    TaskServices.deleteTask(taskId)
      .then(res => {
        if (res.error) this.setState({ error: res.error })
        window.location.reload(false)
      })
  }

  render() {
    const { error } = this.state
    return (
      <StateContext.Provider value={{
        handleDeleteTask: this.handleDeleteTask
      }}>
        <div>
          <Link to='/create-task'>Add Task</Link>
          { (error) && <p>{error}</p> }
          <ul>
            {this.generateTasksList()}
          </ul>
        </div>
      </StateContext.Provider>
    )
  }
}