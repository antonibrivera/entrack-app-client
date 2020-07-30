import React from 'react';
import ReactDOM from 'react-dom';
import EditPresetTask from './EditPresetTask';

describe('<CreateTask />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditPresetTask />, div);
    ReactDOM.unmountComponentAtNode(div)
  })
})