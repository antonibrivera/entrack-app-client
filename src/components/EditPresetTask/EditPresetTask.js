import React from 'react';
import './EditPresetTask.css';
import PresetTaskServices from '../../services/preset-task-services';
import { Link } from 'react-router-dom';

export default class EditTask extends React.Component {
  state = {
    task_name: '',
    hours: '',
    minutes: '',
    description: '',
    error: null
  }

  generatePlaceholderDate(date) {
    const dateArray = date.split('-')
    const month = dateArray[1]
    const day = dateArray[2].split('T')[0]
    const year = dateArray[0]
    return `${year}-${month}-${day}`
  }

  populatePresetTaskData(taskId) {
    return PresetTaskServices.getById(taskId)
      .then(task => {
        const hours = (!task.duration.hours) ? 0 : task.duration.hours
        const minutes = (!task.duration.minutes) ? 0 : task.duration.minutes
        this.setState({
          task_name: task.task_name,
          hours: hours,
          minutes: minutes,
          description: task.description,
        })
      })
      .catch(res => this.setState({ error: res.error }))
  }

  componentDidMount() {
    return this.populatePresetTaskData(this.props.location.state.id)
  }

  handleEditPresetTask(ev) {
    ev.preventDefault()
    const { task_name, hours, minutes, description } = this.state
    const duration = `${hours}:${minutes}`
    const updatedTask = { task_name, duration, description }
    const { id } = this.props.location.state
    PresetTaskServices.editPresetTask(id, updatedTask)
      .then(res => {
        if (res.error) return this.setState({ error: res.error })
        this.setState({
          task_name: '',
          hours: '',
          minutes: '',
          description: '',
          error: null
        })
        this.props.history.goBack()
      })
      .catch(res => this.setState({ error: res.error }))
  }

  render() {
    const { task_name, hours, minutes, description, error } = this.state
    return (
      <section className="create-task-container">
        <header>
          <h2>Edit your Preset Task</h2>
        </header>
        { error && <p>{error}</p> }
        <form onSubmit={ev => this.handleEditPresetTask(ev)}>
          <label htmlFor="task_name">Task Name</label>
          <input type="text" name="task_name" id="task_name" required value={task_name} onChange={ev => this.setState({ task_name: ev.target.value })} />
          <label htmlFor="hours">Hours</label>
          <input type="number" name="hours" id="hours" min="0" max="24" required value={hours} onChange={ev => this.setState({ hours: ev.target.value })} />
          <label htmlFor="minutes">Minutes</label>
          <input type="number" name="minutes" id="minutes" min="0" max="59" required value={minutes} onChange={ev => this.setState({ minutes: ev.target.value })} />
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" value={description} onChange={ev => this.setState({ description: ev.target.value })} />
          <button type="submit">Update Task</button>
        </form>
        <Link to='/dashboard'>
          <button>Go Back</button>
        </Link>
      </section>
    )
  }
}