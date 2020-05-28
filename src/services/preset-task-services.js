import config from '../config';
import TokenServices from './token-services';

const PresetTaskServices = {
  getAllPresetTasks() {
    return fetch(`${config.API_ENDPOINT}/preset-tasks`, {
      headers: {'Authorization': `bearer ${TokenServices.getAuthToken()}`}
    })
    .then(res => (
      (res.error) ? res.error : res.json()
    ))
  },
  getById(taskId) {
    return fetch(`${config.API_ENDPOINT}/preset-tasks/${taskId}`, {
      headers: {'Authorization': `bearer ${TokenServices.getAuthToken()}`},
    })
    .then(res => (
      (res.error) ? res.error : res.json()
    ))
  },
  addPresetTask(taskToAdd) {
    return fetch(`${config.API_ENDPOINT}/preset-tasks`, {
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
  },
  deletePresetTask(taskId) {
    return fetch(`${config.API_ENDPOINT}/preset-tasks/${taskId}`, {
      method: 'DELETE',
      headers: {'Authorization': `bearer ${TokenServices.getAuthToken()}`}
    })
    .then(res => (
      (res.error) ? res.error : res.json()
    ))
  },
  editPresetTask(taskId, updatedTask) {
    return fetch(`${config.API_ENDPOINT}/preset-tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `bearer ${TokenServices.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    .then(res => (
      (res.error) ? res.error : res.json()
    ))
  }
}

export default PresetTaskServices;