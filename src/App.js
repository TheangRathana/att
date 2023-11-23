import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { request, gql } from 'graphql-request';

function App() {
  const [isChecked, setIsChecked] = useState(true);
  const [data, setData] = useState(null);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const containerStyle = {
    marginTop: 80,
    display: 'flex',
    justifyContent: 'center',
    height: '100vh', // Adjust the height as needed
  };
  const contentStyle = {
    // Additional styles for your content
  };

  const handleUpdate = async () => {
    const endpoint = 'http://localhost:2400/graphql'; // Replace with your GraphQL endpoint

    // Define the GraphQL mutation
    const mutation = gql`
     mutation CheckAtt($shift: String!) {
  checkAtt(shift: $shift) {
    status
    date
  }
}
    `;

    // Set the variables for the mutation
    const variables = {
      shift: isChecked ? 'morning' : 'afternoon'
    };

    try {
      // Perform the GraphQL mutation
      const result = await request(endpoint, mutation, variables);
      console.log('Updated user:', result);
      setData(result)
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
            />
            Toggle Switch
          </label>

          <p>Switch to {isChecked ? 'Morning Shift' : 'Afternoon Shift'}</p>
        </div>
        <div>
          <button onClick={handleUpdate}>Check Att</button>

        </div>
        <div>{data?.checkAtt?.status}</div>
      </div>
    </div>
  );
}

export default App;
