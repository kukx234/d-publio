import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone'


const FormImportImage = ({ label_name, field_name, input_value, on_change, class_name='form-default-checkbox' }) => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    return (
        <div className={class_name}>
            <label>{label_name}</label>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>
    )
};

export default FormImportImage;
