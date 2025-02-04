import './App.css';
import Input from './components/Input';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Help from './components/Help';

function App() {
  return (
    <Router>
    <div className="flex flex-col h-screen">
      <Navbar className="h-[10%]" />
      <Routes>
        <Route path="/" element={<Input className="flex-grow" />} />
        <Route path="/help" element={<Help/>} />
      </Routes>
      
      <Footer className="h-[10%]" />
    </div>
    </Router>
  );
}

export default App;
