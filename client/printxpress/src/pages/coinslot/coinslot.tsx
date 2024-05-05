import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000/coin-slot');

function CoinSlot() {
  const [data, setData] = useState('');

  useEffect(() => {
    socket.on('arduinoData', (newData) => {
      setData(newData);
    });
  }, []);

  return (
    <div className="App">
      <p>Data from Arduino: {data}</p>
    </div>
  );
}

export default CoinSlot;