import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Zap } from 'lucide-react';

const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com', icon: Facebook },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com', icon: Youtube },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
];

const COLUMNS = [
  { title: 'Company', links: [['About', '/contact#about'], ['Contact', '/contact#support'], ['Careers', '/contact#careers']] },
  { title: 'Customer Service', links: [['Shipping', '/contact#shipping'], ['Returns', '/contact#returns'], ['FAQ', '/contact#faq'], ['Support', '/contact#support']] },
  {
    title: 'Shop',
    links: ['Smartphones', 'Laptops', 'Gaming', 'Accessories'].map((c) => [c, `/shop?category=${encodeURIComponent(c)}`]),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand brand--light">
            <span className="brand__mark"><Zap size={18} aria-hidden="true" fill="currentColor" /></span>
            <span className="brand__name">ElectroMart</span>
          </Link>
          <p>Smart Technology. Better Shopping.</p>
          <ul className="socials" aria-label="Social media">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`ElectroMart on ${label}`}><Icon size={18} aria-hidden="true" /></a>
              </li>
            ))}
          </ul>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2>{col.title}</h2>
            <ul>
              {col.links.map(([label, to]) => (
                <li key={label}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} ElectroMart. All rights reserved. Demo store - no real payments are processed.</p>
        </div>
      </div>
    </footer>
  );
}
