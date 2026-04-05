import { Route, Routes } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import LandingPage from '@/features/landing/LandingPage';
import ReportPage from '@/features/issues/ReportPage';
import IssuesPage from '@/features/issues/IssuesPage';
import IssueDetail from '@/features/issues/IssueDetail';
import MapPage from '@/features/map/MapPage';
import NetaMeterPage from '@/features/neta/NetaMeterPage';
import FiscalPage from '@/features/fiscal/FiscalPage';
import LeaderboardPage from '@/features/gamification/LeaderboardPage';
import StorePage from '@/features/gamification/StorePage';
import ProfilePage from '@/features/profile/ProfilePage';
import AuditPage from '@/features/audit/AuditPage';
import LoginPage from '@/features/auth/LoginPage';
import RequireAuth from '@/features/auth/RequireAuth';

const Router = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    
    <Route element={<RootLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="map" element={<MapPage />} />
      <Route path="report" element={<ReportPage />} />
      <Route path="issues" element={<IssuesPage />} />
      <Route path="issues/:id" element={<IssueDetail />} />
      <Route path="leaderboard" element={<LeaderboardPage />} />
      <Route path="store" element={<StorePage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="audit" element={<AuditPage />} />
      <Route path="fiscal" element={<FiscalPage />} />
      <Route path="neta" element={<NetaMeterPage />} />
    </Route>
  </Routes>
);

export default Router;

