import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { PageHero } from '../components/Section.jsx';
import { usePageTitle } from '../api.js';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <>
      <PageHero eyebrow="Error 404" title="We couldn't find that page." text="The link may be broken or the page may have moved." />
      <section className="section">
        <div className="wrap">
          <Link className="btn btn-primary" to="/">
            Back to home <Icon name="arrow" size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
