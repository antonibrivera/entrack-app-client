import React from 'react';
import './CreateTask.css';
import TaskServices from '../../services/task-services';
import PresetTaskServices from '../../services/preset-task-services';
import PresetOption from '../PresetOption/PresetOption';
import { Link } from 'react-router-dom';

export default class CreateTask extends React.Component {
  state = {
    task_name: '',
    hours: 1,
    minutes: 30,
    task_date: null,
    error: null,
    presetTasks: [],
    presetId: null,
    newTask: false
  }

  componentDidMount() {
    return this.getPresetTasks()
  }

  getPresetTasks() {
    return PresetTaskServices.getAllPresetTasks()
      .then(presetTasks => {
        if (presetTasks.error) return this.setState({ error: presetTasks.error })
        this.setState({ presetTasks })
      })
      .catch(res => this.setState({ error: res.error }))
  }

  generateDurationPreview(time) {
    const hours = (!time.hours) ? 0 : time.hours
    const minutes = (!time.minutes) ? 0 : time.minutes
    return `${hours} hr, ${minutes} min`
  }

  generatePresetOptions() {
    const { task_date, presetTasks } = this.state
    if (presetTasks.length === 0) {
      return (
        <div>
          <header>
            <h2>You don't have any Preset Tasks</h2>
          </header>
          <button className="create-task-btn" onClick={() => this.setState({ newTask: true })}>Create New Task</button>
        </div>
      )
    }
    return (
      <div className="container">
        <header>
          <h2>Choose a Preset Task</h2>
        </header>
        <form className="preset-task-form">
          <select name="presetId" onChange={ev => this.setState({ presetId: ev.target.value })}>
            <option value='' hidden>Select a Preset</option>
            {presetTasks.map(task => {
              return <PresetOption key={task.id} id={task.id} task_name={task.task_name} duration={task.duration} genPreview={this.generateDurationPreview} />
            })}
          </select>
          <label htmlFor="preset_task_date">Task Date</label>
          <input type="date" name="preset_task_date" id="preset_task_date" required onChange={ev => this.setState({ task_date: ev.target.value })} />
          <button onClick={ev => this.handleAddPresetTask(ev)} disabled={!task_date || !presetTasks}>Add Task</button>
          <button onClick={ev => this.handleDeletePresetTask(ev)} disabled={presetTasks.length === 0}>Delete Preset</button>
          <Link to={{
            pathname: '/preset/edit',
            state: {
              id: this.state.presetId
            }
          }}>
            <button>Edit Preset</button>
          </Link>
        </form>
        <button className="create-task-btn" onClick={() => this.setState({ newTask: true })}>Create New Task</button>
      </div>
    )
  }

  generateNewTask() {
    const { task_name, hours, minutes, task_date } = this.state
    return (
      <div>
        <header>
          <h2>Create a New Task</h2>
        </header>
        <form className="new-task-form">
          <label htmlFor="task_name">Task Name</label>
          <input type="text" name="task_name" id="task_name" required onChange={ev => this.setState({ task_name: ev.target.value })} />
          <label htmlFor="hours">Hours</label>
          <input type="number" name="hours" id="hours" min="0" max="24" value={hours} required onChange={ev => this.setState({ hours: ev.target.value })} />
          <label htmlFor="minutes">Minutes</label>
          <input type="number" name="minutes" id="minutes" min="0" max="59" value={minutes} required onChange={ev => this.setState({ minutes: ev.target.value })} />
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" onChange={ev => this.setState({ description: ev.target.value })} />
          <label htmlFor="new_task_date">Task Date</label>
          <input type="date" name="new_task_date" id="new_task_date" required onChange={ev => this.setState({ task_date: ev.target.value })} />
          <button onClick={ev => this.handleAddNewTask(ev)} disabled={!task_name || !hours || !minutes || !task_date}>Add Task</button>
          <button onClick={ev => this.handleAddNewPresetTask(ev)} disabled={!task_name || !hours || !minutes || !task_date}>Create Preset</button>
        </form>
        <button onClick={() => this.setState({ newTask: false })}>Go Back</button>
      </div>
    )
  }

  handleDeletePresetTask(ev) {
    ev.preventDefault()
    const { presetId } = this.state
    PresetTaskServices.deletePresetTask(presetId)
      .then(res => {
        if (res.error) this.setState({ error: res.error })
        window.location.reload(false)
      })
  }

  handleAddPresetTask(ev) {
    ev.preventDefault()
    const { presetTasks, presetId, task_date } = this.state
    const presetTask = presetTasks.find(task => task.id == presetId)
    const { task_name, description } = presetTask
    const hours = (!presetTask.duration.hours) ? 0 : presetTask.duration.hours
    const minutes = (!presetTask.duration.minutes) ? 0 : presetTask.duration.minutes
    const duration = `${hours}:${minutes}`
    const presetTaskToAdd = { task_name, duration, description, task_date }
    TaskServices.addTask(presetTaskToAdd)
      .then(res => {
        if (res.error) return this.setState({ error: res.error })
        this.setState({
          task_name: '',
          duration: null,
          hours: 0,
          minutes: 30,
          task_date: null,
          error: null
        })
        this.props.history.push('/dashboard')
      })
      .catch(res => this.setState({ error: res.error }))
  }

  handleAddNewTask(ev) {
    ev.preventDefault()
    const { task_name, hours, minutes, description, task_date } = this.state
    const duration = `${hours}:${minutes}`
    const taskToAdd = { task_name, duration, description, task_date }
    TaskServices.addTask(taskToAdd)
      .then(res => {
        if (res.error) return this.setState({ error: res.error })
        this.setState({
          task_name: '',
          duration: null,
          hours: 0,
          minutes: 30,
          task_date: null,
          error: null
        })
        this.props.history.push('/dashboard')
      })
      .catch(res => this.setState({ error: res.error }))
  }

  handleAddNewPresetTask(ev) {
    ev.preventDefault()
    const { task_name, hours, minutes, description } = this.state
    const duration = `${hours}:${minutes}`
    const presetTaskToAdd = { task_name, duration, description }
    PresetTaskServices.addPresetTask(presetTaskToAdd)
      .then(res => {
        if (res.error) return this.setState({ error: res.error })
        this.setState({
          task_name: '',
          duration: null,
          hours: 0,
          minutes: 30,
          task_date: null,
          error: null
        })
        window.location.reload(false)
      })
      .catch(res => this.setState({ error: res.error }))
  }

  render() {
    const { newTask } = this.state
    return (
      <section className="create-task-container">
        { (!newTask) ? this.generatePresetOptions() : this.generateNewTask() }
      </section>
    )
  }
}