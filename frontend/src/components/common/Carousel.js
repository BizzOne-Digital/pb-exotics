import { useRef } from 'react';
import { ArrowRightIcon } from './Icons';
import styles from './Carousel.module.css';

const Carousel = ({ children }) => {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstChild;
    const amount = card ? card.offsetWidth + 20 : 300;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className={styles.wrap}>
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scrollBy(-1)} aria-label="Previous">
        <ArrowRightIcon size={18} style={{ transform: 'rotate(180deg)' }} />
      </button>
      <div className={styles.track} ref={trackRef}>
        {children}
      </div>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scrollBy(1)} aria-label="Next">
        <ArrowRightIcon size={18} />
      </button>
    </div>
  );
};

export default Carousel;
