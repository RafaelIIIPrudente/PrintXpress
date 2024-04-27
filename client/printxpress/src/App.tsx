import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

function App() {
  const [message, setMessage] = useState({ message: '' });

  const getMessage = async () => {
    try {
      const response = await axios.get(API_URL + '/');
      setMessage(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <>
      <header>
        <h1>PrintXpress</h1>
      </header>
      <main>
        <p>Welcome to PrintXpress</p>
      </main>
      <div>
        {message.message}
      </div>

      <footer>
        <p>&copy; 2021 PrintXpress</p>
      </footer>

    </>
  );
}

export default App;
