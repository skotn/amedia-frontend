import React from 'react';
import './App.css';
import { useState } from 'react';
import { HandInterface } from './interface/HandInterface';
import Card from './components/card/Card';

function App() {
  const [hand, setHand] = useState<HandInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

  const fetchHand = async () => {
    setLoading(true);
    setError(null);
    const apiUrl = process.env.REACT_APP_BACKEND_CONSTANT + '/hands';
    
    //const apiUrl = 'http://localhost:8080/hands';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data: HandInterface = await response.json();
      setHand(data);

    } catch (err) {
      console.log(err);
      // Handle error in the API call
      setError('Something went wrong! Please try again.');
    } finally {
      setLoading(false); // Stop loading once the request is done
    }
  };

  return (
    <div className="App">
      <div className="btn-container">
        <h1>{hand ? `You Got ${hand.analysis}` : "Pokerhand simulator"}</h1>
        <button className="card-btn" onClick={fetchHand} disabled={loading}>
          {loading ? 'Creating...' : 'Create Hand'}
        </button>
      </div>
      <div className="card-container">
        {hand ? 
          <>
          {hand.cards.map((c, id) => (
              <Card key={id} card={c} />
            ))}
          </> : null
        }
      </div>      
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
