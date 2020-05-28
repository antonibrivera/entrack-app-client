import config from '../config';
import TokenServices from './token-services';

const TaskServices = {
  getAllTasks() {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      headers: {'Authorization': `bearer ${TokenServices.getAuthToken()}`}
    })
    .then(res => (
      (res.error) ? res.error : res.json()
    ))
  },
  addTask(taskToAdd) {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenServices.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(taskToAdd)
    })
    .then(res => (
      (res.error) ? res.error : res.json()
    ))
  }
}

export default TaskServices;