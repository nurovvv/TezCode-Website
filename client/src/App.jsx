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
              <div className="hidden md:flex" style={{ gap: '20px', fontSize: '15px', fontWeight: '500' }}>
                <Link to="/catalog" style={{ color: 'white', textDecoration: 'none' }}>Catalog</Link>
                <Link to="/challenges" style={{ color: 'white', textDecoration: 'none' }}>Challenges</Link>
                <Link to="/leaderboard" style={{ color: 'white', textDecoration: 'none' }}>Leaderboard</Link>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {user ? (
                <>
                  <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Dashboard</Link>
                  <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Profile</Link>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Log in</Link>
                  <Link to="/register" style={{
                    backgroundColor: '#04AA6D',
                    color: 'white',
                    padding: '6px 20px',
                    borderRadius: '25px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>Register</Link>
                </>
              )}
            </div>
        </header>
      </div>
      <CourseReaderPage />
    </>
  );
}

export default App;
