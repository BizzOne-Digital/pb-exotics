import { LeafIcon, CheckIcon, TruckIcon, StarIcon } from '../components/common/Icons';
import styles from './About.module.css';
import testimonialStyles from './Testimonials.module.css';

const values = [
  { icon: LeafIcon, title: 'Quality First', desc: 'Every product is vetted against our internal standards before it reaches you. No exceptions.' },
  { icon: CheckIcon, title: 'Consistency', desc: 'Same quality, same experience, every single order. That\'s our promise to the community.' },
  { icon: TruckIcon, title: 'Affordability', desc: 'It\'s about more than a price tag — we keep costs down so the culture stays accessible to everyone.' },
];

// Placeholder reviews — replace with real customer testimonials once available.
const testimonials = [
  { name: 'J.', text: 'Fast delivery and the quality was exactly as described. Easy ordering process from start to finish.', rating: 5 },
  { name: 'M.', text: 'First order went smooth, window was on time and communication was clear the whole way through.', rating: 5 },
  { name: 'A.', text: 'Good pricing compared to what else is out there. Will be ordering again for sure.', rating: 5 },
  { name: 'R.', text: 'Appreciated the discretion and how straightforward the whole process was.', rating: 4 },
];

const About = () => (
  <div style={{ paddingTop: 100 }}>
    {/* Hero */}
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className="section-subtitle">Our Story</p>
            <h1 className="section-title">The Newest<br /><span>Lifestyle Brand</span></h1>
            <div className="red-line" />
            <p>
              After years of preparation and construction, we are proud to launch PB Exotics —
              promising quality, consistency, and most importantly, affordability. Because to our team
              it's about more than a bag and a price tag. It's about honouring the community and the culture.
            </p>
          </div>
          <div className={styles.heroImg}>
            <img src="/about.png" alt="PB Exotics Brand" />
          </div>
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className={styles.missionSection}>
      <div className="container">
        <div className={styles.missionQuote}>
          <span className={styles.quoteMark}>"</span>
          <p>
            We are a brand powered by smokers, for smokers. Our number one priority is building trust —
            and we hope to start here. Our dedicated team will continue to work tirelessly to assure all
            products meet company standards and expectations while keeping costs down to aid in accessibility
            for the consumer.
          </p>
          <span className={styles.quoteAuthor}>— PB Exotics</span>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section">
      <div className="container">
        <p className="section-subtitle">What We Stand For</p>
        <h2 className="section-title" style={{ marginBottom: 48 }}>Our <span>Values</span></h2>
        <div className={styles.valuesGrid}>
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <Icon size={28} style={{ color: 'var(--pb-red)' }} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Community */}
    <section className={styles.communitySection}>
      <div className="container">
        <div className={styles.communityInner}>
          <img
            src="/news.png"
            alt="Community"
            className={styles.communityImg}
          />
          <div className={styles.communityText}>
            <p className="section-subtitle">Community & Culture</p>
            <h2 className="section-title">Built For<br /><span>The Culture</span></h2>
            <div className="red-line" />
            <p>
              Follow us for all information on vendors, deals, reviews, and all upcoming drops.
              This is just the beginning — and we're building it with you.
            </p>
            <a
              href="https://instagram.com/pbexoticsinc"
              target="_blank"
              rel="noreferrer"
              className="btn btn-red"
              style={{ marginTop: 24, display: 'inline-flex' }}
            >
              Follow @pbexoticsinc
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section">
      <div className="container">
        <p className="section-subtitle">What People Say</p>
        <h2 className="section-title" style={{ marginBottom: 8 }}>Customer <span>Testimonials</span></h2>
        <p style={{ color: 'var(--pb-gray)', maxWidth: 560, marginBottom: 48 }}>
          We're just getting started — here's some early feedback from the community.
        </p>

        <div className={testimonialStyles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={testimonialStyles.card}>
              <div className={testimonialStyles.stars}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <StarIcon key={s} size={16} filled={s < t.rating} style={{ color: 'var(--pb-red)' }} />
                ))}
              </div>
              <p className={testimonialStyles.text}>&ldquo;{t.text}&rdquo;</p>
              <span className={testimonialStyles.name}>— {t.name}</span>
            </div>
          ))}
        </div>

        <p className={testimonialStyles.note}>
          Have you ordered with us? Leave a review on our Instagram <a href="https://instagram.com/pbexoticsinc" target="_blank" rel="noreferrer">@pbexoticsinc</a>.
        </p>
      </div>
    </section>
  </div>
);

export default About;
