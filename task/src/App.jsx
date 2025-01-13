import { StrictMode } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Admin from '../Admin';
import FeedbackForm from './FeedbackForm';
import AdminPanel from './AdminPanel';


function App() {
  return (
  <StrictMode>

    <BrowserRouter>
 
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/feedbackform" element={<FeedbackForm />} />
    <Route path="/adminpanel" element={<AdminPanel />} />
    </Routes>

    </BrowserRouter>

  </StrictMode>
  );
}

export default App;
