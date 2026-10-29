import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './site/Layout'
import { AboutPage } from './site/pages/AboutPage'
import { ArticlePage } from './site/pages/ArticlePage'
import { CareersPage } from './site/pages/CareersPage'
import { ContactPage } from './site/pages/ContactPage'
import { EventsPage } from './site/pages/EventsPage'
import { HomePage } from './site/pages/HomePage'
import { InsightsPage } from './site/pages/InsightsPage'
import { LocationPage } from './site/pages/LocationPage'
import { NotFoundPage } from './site/pages/NotFoundPage'
import { PeoplePage } from './site/pages/PeoplePage'
import { PersonPage } from './site/pages/PersonPage'
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
          <Route path="people/:slug" element={<PersonPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="insights/:slug" element={<ArticlePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="locations/:slug" element={<LocationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
