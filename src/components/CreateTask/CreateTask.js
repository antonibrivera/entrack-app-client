import React from 'react';
import './CreateTask.css';
import TaskServices from '../../services/task-services';

export default class CreateTask extends React.Component {
  state = {
    task_name: '',
    duration: null,
    hours: '',
    minutes: '',
    task_date: null,
    error: null
  }

  handleAddTask(ev) {
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
          hours: '',
          minutes: '',
          task_date: null,
          error: null
        })
        this.props.history.push('/dashboard')
      })
      .catch(res => this.setState({ error: res.error }))
  }

  render() {
    const { error } = this.state
    return (
      <section className="create-task-container">
        <header>
          Create a New Task
        </header>
        { error && <p>{error}</p> }
        <form onSubmit={ev => this.handleAddTask(ev)}>
          <label htmlFor="task_name">Task Name</label>
          <input type="text" name="task_name" id="task_name" required onChange={ev => this.setState({ task_name: ev.target.value })} />
          <label htmlFor="hours">Hours</label>
          <input type="number" name="hours" id="hours" min="0" max="24" required onChange={ev => this.setState({ hours: ev.target.value })} />
          <label htmlFor="minutes">Minutes</label>
          <input type="number" name="minutes" id="minutes" min="0" max="59" required onChange={ev => this.setState({ minutes: ev.target.value })} />
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" onChange={ev => this.setState({ description: ev.target.value })} />
          <label htmlFor="task_date">Task Date</label>
          <input type="date" name="task_date" id="task_date" required onChange={ev => this.setState({ task_date: ev.target.value })} />
          <button type="submit">Add Task</button>
        </form>
      </section>
    )
  }
}