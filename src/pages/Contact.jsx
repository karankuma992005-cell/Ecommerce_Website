import { useState } from 'react';
import { BadgeCheck, Clock, Mail, MapPin, Phone, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import FormField from '../components/FormField';
import { useStore } from '../context/StoreContext';
import { FAQS } from '../data/constants';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { validateContact } from '../utils/validators';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

const FEATURES = [
  { icon: Truck, title: 'Fast Delivery', text: 'Quick and reliable delivery.' },
  { icon: ShieldCheck, title: 'Secure Payment', text: 'Safe and secure checkout experience.' },
  { icon: BadgeCheck, title: 'Genuine Products', text: 'Authentic products from trusted brands.' },
  { icon: RotateCcw, title: 'Easy Returns', text: 'Simple and customer-friendly return policy.' },
];

export default function Contact() {
  const { notify } = useStore();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  useDocumentTitle('About & Contact', 'Learn about ElectroMart and get in touch with our support team.');

  const bind = (field) => ({
    value: values[field],
    error: errors[field],
    onChange: (e) => {
      const value = field === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
      setSent(false);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      setSent(false);
      document.getElementById(first)?.focus();
      return;
    }
    setValues(INITIAL);
    setSent(true);
    notify('Message sent successfully');
  };

  return (
    <>
      <section id="about" className="page-hero" aria-labelledby="about-title">
        <div className="container">
          <h1 id="about-title">About ElectroMart</h1>
          <p>
            ElectroMart is a modern electronics marketplace focused on providing genuine technology products, competitive
            prices, secure shopping and reliable customer service.
          </p>
        </div>
      </section>

      <section id="why-us" className="section container" aria-labelledby="why-title">
        <div className="section__head"><h2 id="why-title">Why choose us</h2></div>
        <div className="feature-grid">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="feature">
              <span className="feature__icon"><Icon size={24} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section section--tint" aria-labelledby="contact-title">
        <div className="container contact">
          <div className="contact__info">
            <h2 id="contact-title">Get in touch</h2>
            <p>Questions about an order or a product? Send us a message and we will reply within one business day.</p>
            <ul>
              <li><Mail size={20} aria-hidden="true" /><div><strong>Email</strong><a href="mailto:support@electromart.com">support@electromart.com</a></div></li>
              <li><Phone size={20} aria-hidden="true" /><div><strong>Phone</strong><a href="tel:+919876543210">+91 98765 43210</a></div></li>
              <li><MapPin size={20} aria-hidden="true" /><div><strong>Address</strong><span>New Delhi, India</span></div></li>
              <li><Clock size={20} aria-hidden="true" /><div><strong>Business Hours</strong><span>Monday – Saturday<br />9:00 AM – 7:00 PM</span></div></li>
            </ul>
          </div>

          <form id="support" className="contact__form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
            {sent && (
              <p className="form-success" role="status">Thank you! Your message has been sent successfully.</p>
            )}
            <div className="form-grid">
              <FormField id="name" label="Name" autoComplete="name" {...bind('name')} />
              <FormField id="email" label="Email" type="email" autoComplete="email" {...bind('email')} />
              <FormField id="phone" label="Phone" type="tel" inputMode="numeric" autoComplete="tel-national" hint="10-digit mobile number" {...bind('phone')} />
              <FormField id="subject" label="Subject" {...bind('subject')} />
              <FormField id="message" label="Message" as="textarea" rows={5} className="span-2" hint="At least 20 characters" {...bind('message')} />
            </div>
            <button type="submit" className="btn btn--primary btn--lg">Send Message</button>
          </form>
        </div>
      </section>

      <section className="section container help" aria-labelledby="help-title">
        <div className="section__head"><h2 id="help-title">Help &amp; policies</h2></div>
        <div className="help__grid">
          <article id="shipping">
            <h3>Shipping</h3>
            <p>Orders of ₹999 or more ship free. Smaller orders have a flat ₹49 delivery charge. Metro cities usually receive orders in 2 to 4 business days, other locations in up to 7.</p>
          </article>
          <article id="returns">
            <h3>Returns</h3>
            <p>If a product arrives damaged or is not as described, contact us within 7 days of delivery with your order ID and we will arrange a replacement or refund.</p>
          </article>
          <article id="careers">
            <h3>Careers</h3>
            <p>We have no open roles right now. Email support@electromart.com with the subject "Careers" and a short note about yourself, and we will keep it on file.</p>
          </article>
        </div>
        <div id="faq" className="faq">
          <h3>Frequently asked questions</h3>
          {FAQS.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
