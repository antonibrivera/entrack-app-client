import React from 'react';
import './EditTask.css';
import TaskServices from '../../services/task-services';

export default class EditTask extends React.Component {
  state = {
    task_name: '',
    hours: '',
    minutes: '',
    description: '',
    task_date: null,
    error: null
  }

  generatePlaceholderDate(date) {
    const dateArray = date.split('-')
    const month = dateArray[1]
    const day = dateArray[2].split('T')[0]
    const year = dateArray[0]
    return `${year}-${month}-${day}`
  }

  

  populateTaskData(taskId) {
    return TaskServices.getById(taskId)
      .then(task => {
        const hours = (!task.duration.hours ? 0 : task.duration.hours)
        const minutes = (!task.duration.minutes ? 0 : task.duration.minutes)
        this.setState({
          task_name: task.task_name,
          hours: hours,
          minutes: minutes,
          description: task.description,
          task_date: this.generatePlaceholderDate(task.task_date)
        })
      })
  }

  componentDidMount() {
    return this.populateTaskData(this.props.location.state.id)
  }

  handleEditTask(ev) {
    ev.preventDefault()
    const { task_name, hours, minutes, description, task_date } = this.state
    const duration = `${hours}:${minutes}`
    const updatedTask = { task_name, duration, description, task_date }
    const { id } = this.props.location.state
    TaskServices.editTask(id, updatedTask)
      .then(res => {
        if (res.error) return this.setState({ error: res.error })
        this.setState({
          task_name: '',
          hours: '',
          minutes: '',
          description: '',
          task_date: null,
          error: null
        })
        this.props.history.push('/dashboard')
      })
      .catch(res => this.setState({ error: res.error }))
  }

  render() {
    const { task_name, hours, minutes, description, task_date, error } = this.state
    return (
      <section className="create-task-container">
        <header>
          Create a New Task
        </header>
        { error && <p>{error}</p> }
        <form onSubmit={ev => this.handleEditTask(ev)}>
          <label htmlFor="task_name">Task Name</label>
          <input type="text" name="task_name" id="task_name" required value={task_name} onChange={ev => this.setState({ task_name: ev.target.value })} />
          <label htmlFor="hours">Hours</label>
          <input type="number" name="hours" id="hours" min="0" max="24" required value={hours} onChange={ev => this.setState({ hours: ev.target.value })} />
          <label htmlFor="minutes">Minutes</label>
          <input type="number" name="minutes" id="minutes" min="0" max="59" required value={minutes} onChange={ev => this.setState({ minutes: ev.target.value })} />
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={description} onChange={ev => this.setState({ description: ev.target.value })} />
          <label htmlFor="task_date">Task Date</label>
          <input type="date" name="task_date" id="task_date" required value={task_date} onChange={ev => this.setState({ task_date: ev.target.value })} />
          <button type="submit">Update Task</button>
        </form>
      </section>
    )
  }
}