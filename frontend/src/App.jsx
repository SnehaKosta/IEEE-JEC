import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import NewsEvents from './pages/NewsEvents.jsx';
import People from './pages/People.jsx';
import Gallery from './pages/Gallery.jsx';
import Achievements from './pages/Achievements.jsx';
import Chapters from './pages/Chapters.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="news" element={<NewsEvents />} />
        <Route
          path="committee"
          element={
            <People
              category="committee"
              title="Committee"
              eyebrow="The students shaping our community"
              intro="Meet the student volunteers who plan, build and run everything the branch does."
              emptyText="The committee roster will be published here once it is confirmed."
            />
          }
        />
        <Route path="gallery" element={<Gallery />} />
        <Route
          path="mentors"
          element={
            <People
              category="mentor"
              title="IEEE Fellows / Faculty Mentors"
              eyebrow="Guidance for the next generation of engineers"
              intro="The faculty and IEEE members who guide the branch."
              emptyText="Mentor profiles will be published here once they are confirmed."
            />
          }
        />
        <Route path="achievements" element={<Achievements />} />
        <Route path="chapters" element={<Chapters />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
