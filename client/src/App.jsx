import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import tezcodeLogo from './assets/tezcode-logo.png';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CatalogPage from './pages/CatalogPage';
import CourseReaderPage from './pages/CourseReaderPage';
import ChallengePage from './pages/ChallengePage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';

import './index.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes with navbar + footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/challenge" element={<ChallengePage />} />
            </Route>

            {/* Auth pages (standalone) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Course reader (standalone - full width) */}
            <Route path="/course/:id" element={
              <>
                <div className="sticky top-0 z-50">
                  <header style={{
                    backgroundColor: '#282A35',
                    height: '52px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px',
                    color: 'white',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                      <a href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none'
                      }}>
                        <img src={tezcodeLogo} alt="TezCode" style={{ height: '22px', width: 'auto', filter: 'invert(1)' }} />
                        <span style={{ color: 'white', fontSize: '22px', fontWeight: '800', letterSpacing: '-1px' }}>TezCode</span>
                      </a>

                      <div className="hidden md:flex" style={{ gap: '20px', fontSize: '15px', fontWeight: '500' }}>
                        <a href="/catalog" style={{ color: 'white', textDecoration: 'none' }}>Tutorials</a>
                        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Exercises</a>
                        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Certificates</a>
                        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Services</a>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                      </button>
                      <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                      </button>
                      <Link to="/login" style={{
                        backgroundColor: '#04AA6D',
                        color: 'white',
                        padding: '6px 20px',
                        borderRadius: '25px',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>Log in</Link>
                    </div>
                  </header>
                </div>
                <CourseReaderPage />
              </>
            } />

            {/* Dashboard routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
