import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import NewsTriple from '../components/NewsCards.jsx';
import ChapterCards from '../components/ChapterCards.jsx';
import ContactSection from '../components/ContactSection.jsx';
import { Eyebrow, SectionHead } from '../components/Section.jsx';
import { useList, usePageTitle } from '../api.js';
import { FALLBACK_CHAPTERS } from '../config.js';

// Put your own photos in frontend/public/images/ using these names.
const SLIDES = [
  { label: 'Our campus · Jabalpur', title: 'Where curiosity takes root.', image: '/images/slide-1.jpg' },
  { label: 'Hands-on learning', title: 'Build. Test. Improve.', image: '/images/slide-2.jpg' },
  { label: 'Our community', title: 'Learning together.', image: '/images/slide-3.jpg' },
];

const DOING = [
  { icon: 'grad', title: 'Workshops', text: 'Hands-on sessions that turn ideas into skills.' },
  { icon: 'users', title: 'Talks', text: 'Conversations with engineers, researchers and alumni.' },
  { icon: 'globe', title: 'Projects', text: 'Student-led builds across software, hardware and research.' },
  { icon: 'award', title: 'Competitions', text: 'Challenges that reward creativity and teamwork.' },
];

const PEOPLE = [
  { to: '/committee', icon: 'users', title: 'Committee', text: 'The students shaping our community.', pill: 'Meet the team' },
  { to: '/mentors', icon: 'grad', title: 'IEEE Fellows / Faculty Mentors', text: 'Guidance for the next generation of engineers.', pill: 'View mentors' },
  { to: '/achievements', icon: 'award', title: 'Achievements', text: 'A record of ideas, effort and impact.', pill: 'See the record' },
];

export default function Home() {
  usePageTitle('');
  const news = useList('/posts/?limit=3');
  const chapters = useList('/chapters/', FALLBACK_CHAPTERS);
  const people = useList('/people/');
  const achievements = useList('/achievements/');

  const counts = {
    '/committee': people.items.filter((p) => p.category === 'committee').length,
    '/mentors': people.items.filter((p) => p.category === 'mentor').length,
    '/achievements': achievements.items.length,
  };
  const pillFor = (item, pending) => (counts[item.to] > 0 ? item.pill : pending);
  const pending = { '/committee': 'Roster pending', '/mentors': 'Profiles pending', '/achievements': 'Verified records pending' };

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Eyebrow>Curiosity. Community. Impact.</Eyebrow>
            <h1>IEEE Student Branch – Jabalpur Engineering College (JEC)</h1>
          </div>
          <div className="hero-side">
            <p className="lead">Empowering Innovation and Technology at Jabalpur Engineering College</p>
            <Link className="btn btn-primary" to="/#community">
              Explore our community <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>

      <HeroSlider slides={SLIDES} />

      <section className="section" id="news">
        <div className="wrap">
          <div className="section-row">
            <SectionHead eyebrow="Updates & announcements" title="Latest IEEE News" />
            <Link className="btn btn-outline btn-sm" to="/news">
              All news & events <Icon name="arrow" size={14} />
            </Link>
          </div>
          <NewsTriple posts={news.items} loading={news.loading} />
        </div>
      </section>

      <section className="section about" id="about">
        <div className="wrap about-grid">
          <div className="about-img" role="img" aria-label="Campus display aircraft" />
          <div>
            <Eyebrow>About IEEE SB JEC</Eyebrow>
            <h2>
              Learning together.
              <br />
              Building what's next.
            </h2>
            <p className="lead">
              We connect the students of Jabalpur Engineering College with the world of technology — and with each
              other. We champion technical learning, collaboration and leadership through workshops, talks, projects
              and competitions.
            </p>
            <div className="doing">
              {DOING.map((d) => (
                <div key={d.title} className="doing-item">
                  <Icon name={d.icon} size={20} />
                  <div>
                    <strong>{d.title}</strong>
                    <span>{d.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="chapters">
        <div className="wrap">
          <SectionHead
            eyebrow="Society chapters & affinity groups"
            title="Find your field. Expand your world."
            text="Explore IEEE's technical communities and shared interests. JEC chapter and affinity-group charter status is awaiting confirmation."
          />
          <ChapterCards chapters={chapters.items} />
        </div>
      </section>

      <section className="section tint" id="community">
        <div className="wrap">
          <SectionHead eyebrow="The people behind the ideas" title="A community, powered by people." />
          <div className="people-grid">
            {PEOPLE.map((p) => (
              <Link key={p.to} to={p.to} className="people-card">
                <div className="people-top">
                  <Icon name={p.icon} size={22} />
                  <Icon name="arrow" size={16} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <span className="pill">{pillFor(p, pending[p.to])}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
