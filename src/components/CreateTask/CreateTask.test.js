import React from 'react';
import ReactDOM from 'react-dom';
import CreateTask from './CreateTask';

describe('<CreateTask />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreateTask />, div);
    ReactDOM.unmountComponentAtNode(div)
  })
})