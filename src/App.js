import React, { useState, useEffect } from 'react';

export default function App() {
  const [countData, setCountData] = useState();

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:4001/rates');
    console.log('dataa ------------->', eventSource);

    eventSource.onmessage = (event) => {
      const countData = JSON.parse(event.data);
      console.log('dataa ------------->', countData);
    };

    eventSource.onerror = (error) => {
      console.error('Error with EventSource:', error);
      // Handle the error as needed
    };
    return () => eventSource.close();
  }, []);

  return (
    <div>
      <h1>Adam shaikh</h1>
      <p>S....</p>
    </div>
  );
}
