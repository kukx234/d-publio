import React, { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

const FormTextEditor = ({ label_name, field_name, input_value, on_change, class_name='form-default-checkbox' }) => {
  const [html, setHtml] = useState(input_value);

  function onChange(e) {
    setHtml(e.target.value);
  }


  return (
    <div className={class_name}>
      <label>{label_name}</label>
      <Editor value={html} onChange={onChange} />
    </div>
  );
};

export default FormTextEditor;
