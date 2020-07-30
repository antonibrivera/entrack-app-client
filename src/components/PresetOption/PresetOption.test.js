import React from 'react';
import ReactDOM from 'react-dom';
import PresetOption from './PresetOption';

describe('<CreateTask />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PresetOption />, div);
    ReactDOM.unmountComponentAtNode(div)
  })
})