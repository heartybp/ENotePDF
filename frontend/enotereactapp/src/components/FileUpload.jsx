import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ setPdfFile }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded:', response.data); // Debugging statement
      const filePath = `http://localhost:5000/uploads/${response.data.filename}`;
      console.log('Setting PDF file path:', filePath); // Debugging statement
      setPdfFile(filePath);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;


// 1. Define a React component named FileUpload which takes a prop named setPdfFile

// 2. Initialize a state variable named selectedFile with an initial value of null

// 3. Define a function named handleFileChange that takes an event as a parameter
//     3.1 Set selectedFile to the first file from the event's target files

// 4. Define an asynchronous function named handleFileUpload
//     4.1 Create a new FormData object named formData
//     4.2 Append the selectedFile to formData with the key 'file'
    
//     4.3 Try to:
//              Send a POST request to 'http://localhost:5000/upload' with formData as the payload
//              Set the request headers to include 'Content-Type' as 'multipart/form-data'
//              Wait for the response from the server
//              Call the setPdfFile function with the value `uploads/` concatenated with the filename from the response data
//     4.4 Catch any error
//              Log 'Error uploading file:' followed by the error to the console

// 5. Return a JSX structure with:
//          An input element of type 'file' with an onChange event handler set to handleFileChange
//          A button element with an onClick event handler set to handleFileUpload and text content 'Upload'
