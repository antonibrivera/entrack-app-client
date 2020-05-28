import React from 'react';

export default function PresetOption(props) {
  return <option value={props.id}>{props.task_name} - {props.genPreview(props.duration)}</option>
}