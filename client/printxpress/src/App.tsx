import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function App() {
  const [message, setMessage] = useState({ message: '' });

  const getMessage = async () => {
    fetch(API_URL + '/')
      .then((response) => response.json())
      .then((data) => setMessage(data));
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
