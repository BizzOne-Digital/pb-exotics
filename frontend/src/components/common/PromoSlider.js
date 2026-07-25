import { useState } from 'react';
import { ArrowRightIcon } from './Icons';
import styles from './PromoSlider.module.css';

const PromoSlider = ({ slides }) => {
  const [index, setIndex] = useState(0);

  const go = (dir) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  };

  const slide = slides[index];
  const { img } = slide;

  return (
    <div className={styles.wrap}>
      <div className={styles.banner}>
        <img src={`${process.env.PUBLIC_URL}${img}`} alt="" className={styles.bannerImg} />

        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => go(-1)} aria-label="Previous">
          <ArrowRightIcon size={18} style={{ transform: 'rotate(180deg)' }} />
        </button>

        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => go(1)} aria-label="Next">
          <ArrowRightIcon size={18} />
        </button>
      </div>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;
