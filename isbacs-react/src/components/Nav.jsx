import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const LINKS = [
  ['/', 'Home', true],
  ['/about', 'About Us'],
  ['/committee', 'Committee'],
  ['/videos', 'Videos'],
  ['/gallery', 'Gallery'],
  ['/documents', 'Documents'],
  ['/books', 'Books'],
  ['/publications', 'Publication'],
  ['/contact', 'Contact'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav>
      <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
        <div className="emblem">🌿</div>
        <span>
          Indian Society of
          <br />
          Bio Agro Chemical Sciences
        </span>
      </Link>
      <ul className={'nav-links' + (open ? ' open' : '')} id="navLinks">
        {LINKS.map(([to, label, end]) => (
          <li key={to}>
            <NavLink to={to} end={end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          </li>
        ))}
        <li>
          <a
            href="https://suryansha963-svg.github.io/megasrm/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-ext"
          >
            MGSRM26 ↗
          </a>
        </li>
      </ul>
      <button className="hamburger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
