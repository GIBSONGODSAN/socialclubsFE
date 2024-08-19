import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import AdminHome from './pages/AdminHome';
import StudentPage from './pages/StudentPage';
import OBFacultyPage from './pages/OBFacultyPage';
import AuthGuard from './components/authentication/AuthGuard';
import SignUp from './components/authentication/SignUp';
import Otp from './components/authentication/Otp';
import RegisterStudent from './components/authentication/RegisterStudent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/registerstudent" element={<RegisterStudent />} />
          <Route
            path="/adminhome"
            element={
              <AuthGuard>
                <AdminHome />
              </AuthGuard>
            }
          />
          <Route
            path="/studentpage"
            element={
              <AuthGuard>
                <StudentPage />
              </AuthGuard>
            }
          />
          <Route
            path="/obfaculty"
            element={
              <AuthGuard>
                <OBFacultyPage />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
