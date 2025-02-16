import React, { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

const FormTextEditor = ({ label_name, field_name, input_value, on_change, class_name='form-default-checkbox' }) => {
  return (
    <div className={class_name}>
      <label>{label_name}</label>
      <Editor value={input_value} name={field_name} onChange={on_change} />
    </div>
  );
};

export default FormTextEditor;
