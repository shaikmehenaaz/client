import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post('http://127.0.0.1:5000/bfhl', parsedInput);
      setResponseData(response.data);
    } catch (error) {
      alert('Invalid JSON or server error');
    }
  };
  
  const handleFilterChange = (selected) => {
    setSelectedOptions(selected);
  };
  
  const filteredResponse = () => {
    if (!responseData) return null;
    let filtered = {};
    selectedOptions.forEach(option => {
      filtered[option.value] = responseData[option.value];
    });
    return filtered;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>BFHL Frontend</h1>
      <textarea
        rows="6"
        placeholder='Enter JSON here...'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        style={styles.textarea}
      />
      <br />
      <button onClick={handleSubmit} style={styles.button}>Submit</button>
      <br />
      {responseData && (
        <>
          <h2 style={styles.subHeader}>Select Data to Display:</h2>
          <Select
            options={options}
            isMulti
            onChange={handleFilterChange}
            styles={customSelectStyles}
          />
          <h3 style={styles.responseHeader}>Response Data:</h3>
          <pre style={styles.pre}>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </>
      )}
    </div>
  );
};

// Custom styles for the Select component
const customSelectStyles = {
  container: (provided) => ({
    ...provided,
    width: '300px',
    marginTop: '10px',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

// Styling object
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    maxWidth: '600px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  subHeader: {
    marginTop: '20px',
    color: '#555',
  },
  responseHeader: {
    marginTop: '20px',
    color: '#333',
  },
  pre: {
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '4px',
    maxWidth: '600px',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
  },
};

export default App;
