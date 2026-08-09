import { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  return (
    <div className="content">
      <Toaster position="top-right" reverseOrder={false} />
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
};

export default App;
