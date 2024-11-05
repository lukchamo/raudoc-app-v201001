import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import { DocumentsPage } from '@/pages/documents';
import { DocumentDetailsPage } from '@/pages/document-details';
import { UploadPage } from '@/pages/upload';
import { ProcessingPage } from '@/pages/processing';
import { AutomationsPage } from '@/pages/automations';
import { InsightsPage } from '@/pages/insights';
import { SettingsPage } from '@/pages/settings';
import { PricingPage } from '@/pages/pricing';
import { OnboardingPage } from '@/pages/onboarding';
import { HelpPage } from '@/pages/help';
import { SearchPage } from '@/pages/search';
import { ReportsPage } from '@/pages/reports';
import { PQRDPage } from '@/pages/pqrd';
import { PQRDDetailsPage } from '@/pages/pqrd-details';
import { PQRDNewPage } from '@/pages/pqrd-new';
import { PQRDTrackPage } from '@/pages/pqrd-track';
import { PQRDTRDPage } from '@/pages/pqrd-trd';
import { PQRDWorkflowsPage } from '@/pages/pqrd-workflows';
import { DocumentProcessedPage } from '@/pages/document-processed';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for processed document view */}
        <Route path="/document/:id/processed" element={<DocumentProcessedPage />} />
        
        {/* Protected routes within MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DocumentsPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="documents/:id" element={<DocumentDetailsPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="processing" element={<ProcessingPage />} />
          <Route path="automations" element={<AutomationsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="onboarding" element={<OnboardingPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="reports/*" element={<ReportsPage />} />
          
          {/* PQRD Routes */}
          <Route path="pqrd" element={<PQRDPage />} />
          <Route path="pqrd/new" element={<PQRDNewPage />} />
          <Route path="pqrd/:id" element={<PQRDDetailsPage />} />
          <Route path="pqrd/track" element={<PQRDTrackPage />} />
          <Route path="pqrd/trd" element={<PQRDTRDPage />} />
          <Route path="pqrd/workflows" element={<PQRDWorkflowsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}