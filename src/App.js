import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import AdminHome from './pages/AdminHome';
import StudentPage from './pages/StudentPage';
import OBFacultyPage from './pages/OBFacultyPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/studentpage" element={<StudentPage />} />
          <Route path="/obfaculty" element={<OBFacultyPage />}  />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
