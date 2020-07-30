import React from 'react';
import './Dashboard.css';
import TaskServices from '../../services/task-services';
import AuthApiServices from '../../services/auth-api-services';
import TaskItem from '../TaskItem/TaskItem';
import StateContext from '../Utils/StateContext';
import { Link } from 'react-router-dom';
export default class Dashboard extends React.Component {
  state={
    tasks: [],
    todaysTasks: [],
    filterTasks: false,
    user: {
      first_name: '',
      last_name: ''
    },
    todayHours: {},
    error: null
  }

  componentDidMount() {
    AuthApiServices.getUsersNames()
      .then(userNames => {
        if (userNames.error) return this.setState({ error: userNames.error })
        this.setState({
          user: {
            first_name: userNames.first_name,
            last_name: userNames.last_name
          }
        })
      })
    TaskServices.getAllTasks()
      .then(tasks => {
        if (tasks.error) return this.setState({ error: tasks.error })
        const hours = this.generateTodayWorkHours(tasks)
        this.setState({ tasks, todayHours: hours })
      })
      .catch(res => this.setState({ error: res.error }))
  }

  generateTodayWorkHours(tasks) {
    const formatDate = (date) => {
      const dateArray = date.toString().split(' ')
      const actualDate = dateArray.splice(0, 4).join(' ')
      return actualDate
    }
    let time = {
      hours: 0,
      minutes: 0,
    }
    const today = formatDate(new Date())
    const todaysTasks = tasks.filter(task => formatDate(new Date(task.task_date)) === today)
    this.setState({ todaysTasks })
    todaysTasks.forEach(task => {
      const hours = (!task.duration.hours) ? 0 : task.duration.hours
      const minutes = (!task.duration.minutes) ? 0 : task.duration.minutes
      time.hours += hours
      time.minutes += minutes
    })
    time.hours += Math.floor(time.minutes / 60)
    time.minutes = time.minutes % 60
    
    return time
  }

  generateWorkHoursText() {
    const { hours, minutes } = this.state.todayHours
    if (!hours && !minutes) return 'no hours of work today!'
    if (!hours && minutes) return `${minutes} minutes of work today.`
    if (hours && !minutes) return `${hours} hour(s) of work today.`
    if (hours && minutes) {
      return `${hours} ${(hours === 1) ? 'hour' : 'hours'} and ${minutes} ${(minutes === 1) ? 'minute' : 'minutes'} of work today.`
    }
    return `${hours} hour(s) and ${minutes} minute(s) of work today.`

  }

  generateMonth(number) {
    if (number === 1) return 'January'
    if (number === 2) return 'Febraury'
    if (number === 3) return 'March'
    if (number === 4) return 'April'
    if (number === 5) return 'May'
    if (number === 6) return 'June'
    if (number === 7) return 'July'
    if (number === 8) return 'August'
    if (number === 9) return 'September'
    if (number === 10) return 'October'
    if (number === 11) return 'November'
    if (number === 12) return 'December'
  }

  generateTaskDate(date) {
    const dateArray = date.split('-')
    const month = this.generateMonth(Number(dateArray[1]))
    const day = dateArray[2].split('T')[0]
    const year = dateArray[0]
    return `${month} ${day}, ${year}`
  }

  generateTasksList() {
    const { tasks, todaysTasks, filterTasks, error } = this.state
    if (filterTasks) {
      if (todaysTasks.length === 0) return (
        <div className="no-tasks-container">
          <p>You have to tasks today!</p>
        </div>
      )
      const tasksList = todaysTasks.map(task => {
        const hours = (!task.duration.hours) ? 0 : task.duration.hours
        const minutes = (!task.duration.minutes) ? 0 : task.duration.minutes
        const date = this.generateTaskDate(task.task_date)
        return (
        <TaskItem key={task.id} id={task.id} task={task} hours={hours} minutes={minutes} date={date} />
        )
      })
      return (
        <div className="todays-tasks-container">
          <p className="todays-tasks-total">You have {todaysTasks.length} task(s) today.</p>
          {tasksList}
        </div>
      )
    }
    if (tasks.length === 0) return (
      <div className="no-tasks-error">
        <p>{error}</p>
      </div>
    )
    else return (
      tasks.map(task => {
        const hours = (!task.duration.hours) ? 0 : task.duration.hours
        const minutes = (!task.duration.minutes) ? 0 : task.duration.minutes
        const date = this.generateTaskDate(task.task_date)
        return <TaskItem key={task.id} id={task.id} task={task} hours={hours} minutes={minutes} date={date} />
      })
    )
  }

  handleDeleteTask(taskId) {
    TaskServices.deleteTask(taskId)
      .then(res => {
        if (res.error) this.setState({ error: res.error })
        window.location.reload(false)
      })
  }

  render() {
    const { first_name } = this.state.user
    return (
      <StateContext.Provider value={{
        handleDeleteTask: this.handleDeleteTask,
      }}>
        <section className="task-list-section">
          <div className="today-header">
            <h2>{new Date().toDateString()}.</h2>
            <p>Hey there {first_name}! You have {this.generateWorkHoursText()} Good luck and have a great day!</p>
            <a href='/task/create'>
              <button className="add-task-btn">Add New Task</button>
            </a>
          </div>
          <div className="filter-view">
            <button onClick={() => this.setState({ filterTasks: true })}>View Today</button>
            <button onClick={() => this.setState({ filterTasks: false })}>View All</button>
            <h3>Filter</h3>
          </div>
          <div className="all-tasks">
            {this.generateTasksList()}
          </div>
        </section>
      </StateContext.Provider>
    )
  }
}