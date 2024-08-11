import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import AdminHome from './pages/AdminHome';
import StudentPage from './pages/StudentPage';
import OBFacultyPage from './pages/OBFacultyPage';
import AuthGuard from './components/authentication/AuthGuard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
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
