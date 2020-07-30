import React from 'react';
import ReactDOM from 'react-dom';
import EditTask from './EditTask';

describe('<CreateTask />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditTask />, div);
    ReactDOM.unmountComponentAtNode(div)
  })
})