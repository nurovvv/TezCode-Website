import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import tezcodeLogo from './assets/tezcode-logo.png';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CatalogPage from './pages/CatalogPage';
import CourseReaderPage from './pages/CourseReaderPage';

import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ChallengesPage from './pages/ChallengesPage';
import ChallengeSolverPage from './pages/ChallengeSolverPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import PartnersPage from './pages/PartnersPage';

import './index.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter basename="/TezCode-Website/">
          <Routes>
            {/* Public routes with navbar + footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/catalog" element={<CatalogPage />} />

              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/profile/:id?" element={<ProfilePage />} />
              <Route path="/partners" element={<PartnersPage />} />
            </Route>

            <Route path="/challenges/:id" element={<ChallengeSolverPage />} />

            {/* Auth pages (standalone) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Course reader (standalone - full width) */}
            <Route path="/course/:id" element={
              <CourseReaderWrapper />
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

// Wrapper component to access useAuth hook
function CourseReaderWrapper() {
  const { user } = useAuth();

  return (
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
              <Link to="/catalog" style={{ color: 'white', textDecoration: 'none' }}>Tutorials</Link>
              <Link to="/challenges" style={{ color: 'white', textDecoration: 'none' }}>Exercises</Link>
              <Link to="/leaderboard" style={{ color: 'white', textDecoration: 'none' }}>Leaderboard</Link>
              <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Certificates</Link>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
            {!user && (
              <Link to="/login" style={{
                backgroundColor: '#04AA6D',
                color: 'white',
                padding: '6px 20px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600'
              }}>Log in</Link>
            )}
            {user && (
              <Link to="/profile" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#1E1E1E',
                overflow: 'hidden',
                textDecoration: 'none'
              }}>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                )}
              </Link>
            )}
          </div>
        </header>
      </div>
      <CourseReaderPage />
    </>
  );
}

export default App;
