import React, { useState, useEffect } from 'react';
import MediSearch from "./MediSearch";

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
      <h1>Server side Event</h1>
      <h4>Adam shaikh</h4>
      <p>Web Socket examples</p>
      {/* <MediSearch /> */}
    </div>
  );
}
