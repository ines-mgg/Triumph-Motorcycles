import { useState } from 'react';
import './assets/css/App.css';
import Button from './components/Buttons/Button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button label={'test'} ariaLabel={'test'} />
    </>
  );
}

export default App;
