import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('effect');
    axios.get('http://ceyloninfo.site/api/locations').then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <h1>Hello World</h1>
    </>
  );
}

export default App;
