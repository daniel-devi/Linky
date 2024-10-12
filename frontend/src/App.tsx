import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LinkTreePage from './pages/LinkTreePage';
import EmailListPage from './pages/EmailListPage';
import LinkPage from './pages/LinkPage';
import handleLogout from './pages/Logout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';

/**
 * App component
 * @returns {JSX.Element} The main application component
 */

function App() {
    return (
        <Router>
            {/* Use Routes instead of Switch for React Router v6 */}
            <Routes>
                {/* Define routes for different pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/logout" element={<handleLogout />} />
                <Route path="/email/:id" element={<EmailListPage />} />
                <Route path="/linktree/:uuid" element={<LinkTreePage />} />
                <Route path="/link/:uuid" element={<LinkPage />} />

                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;