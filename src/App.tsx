import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './site/Layout'
import { AboutPage } from './site/pages/AboutPage'
import { CareersPage } from './site/pages/CareersPage'
import { ContactPage } from './site/pages/ContactPage'
import { CreditsPage } from './site/pages/CreditsPage'
import { HomePage } from './site/pages/HomePage'
import { InsightsPage } from './site/pages/InsightsPage'
import { LocationPage } from './site/pages/LocationPage'
import { NotFoundPage } from './site/pages/NotFoundPage'
import { PeoplePage, PersonRedirect } from './site/pages/PeoplePage'
import { PracticeAreaPage } from './site/pages/PracticeAreaPage'
import { PracticeAreasPage } from './site/pages/PracticeAreasPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="practice-areas" element={<PracticeAreasPage />} />
          <Route path="practice-areas/:slug" element={<PracticeAreaPage />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:slug" element={<PersonRedirect />} />
          <Route path="insights" element={<InsightsPage />} />
          {/* Our own articles have given way to LiveLaw's headlines; old article links land on the list. */}
          <Route path="insights/:slug" element={<Navigate to="/insights" replace />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="locations/:slug" element={<LocationPage />} />
          <Route path="credits" element={<CreditsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
