import ChapterCards from '../components/ChapterCards.jsx';
import { PageHero } from '../components/Section.jsx';
import { useList, usePageTitle } from '../api.js';
import { FALLBACK_CHAPTERS } from '../config.js';

export default function Chapters() {
  usePageTitle('Society Chapters');
  const { items } = useList('/chapters/', FALLBACK_CHAPTERS);

  return (
    <>
      <PageHero
        eyebrow="Society chapters & affinity groups"
        title="Find your field. Expand your world."
        text="Explore IEEE's technical communities and shared interests. JEC chapter and affinity-group charter status is awaiting confirmation."
      />
      <section className="section">
        <div className="wrap">
          <ChapterCards chapters={items} />
        </div>
      </section>
    </>
  );
}
