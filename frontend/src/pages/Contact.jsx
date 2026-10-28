import ContactSection from '../components/ContactSection.jsx';
import { usePageTitle } from '../api.js';

export default function Contact() {
  usePageTitle('Contact Us');
  return <ContactSection id="contact-page" />;
}
