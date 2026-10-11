import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Committee from './pages/Committee.jsx';
import Videos from './pages/Videos.jsx';
import Gallery from './pages/Gallery.jsx';
import Documents from './pages/Documents.jsx';
import Publications from './pages/Publications.jsx';
import Contact from './pages/Contact.jsx';
import Books from './pages/Books.jsx';
import BookPage from './pages/BookPage.jsx';
import ChapterReader from './pages/ChapterReader.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const reading = pathname.includes('/chapter/');
  useEffect(() => {
    const t = document.title;
    if (!reading) document.title = 'Indian Society of Bio Agro Chemical Sciences';
    return () => { document.title = t; };
  }, [reading]);
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:slug" element={<BookPage />} />
        <Route path="/books/:slug/chapter/:n" element={<ChapterReader />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!reading && <Footer />}
    </>
  );
}
