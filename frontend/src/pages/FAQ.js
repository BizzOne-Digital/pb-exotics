import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Browse our shop, add items to your cart, and proceed to checkout. Fill in your delivery details, select your preferred delivery method, and submit. We will confirm your order and send E-Transfer instructions.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We currently accept E-Transfer only. Once your order is confirmed, you will receive instructions on where to send payment. Orders are dispatched after payment is received.'
  },
  {
    q: 'What are your delivery windows?',
    a: 'We offer three same-day delivery windows: 10AM–2PM, 2PM–6PM, and 6PM–10PM. You can also choose Next Day Courier (tracking provided) or Mail Order (shipped next morning after payment is confirmed).'
  },
  {
    q: 'How long does same-day delivery take?',
    a: 'Same-day delivery has a maximum wait of 1 hour and 30 minutes within your chosen window. Place a pre-order in advance to guarantee your slot.'
  },
  {
    q: 'Do you offer mail order shipping?',
    a: 'Yes. Orders will be packed and shipped out the following morning after your E-Transfer is confirmed. You will receive a tracking number upon dispatch.'
  },
  {
    q: 'What is your pricing structure for flower?',
    a: 'All flower follows standard pricing: Half-Quarter (3.5g) at $30, Quarter (7g) at $55, Half Ounce (14g) at $95, and Ounce (28g) at $150. Some specialty items may be contact-for-pricing only.'
  },
  {
    q: 'Do you have a minimum order amount?',
    a: 'There is no minimum order amount. However, delivery fees may apply depending on your location and order size. Details will be shown at checkout.'
  },
  {
    q: 'How can I track my next-day courier order?',
    a: 'Once your E-Transfer is confirmed, a tracking number will be generated and sent to you. You can use it to track your order from dispatch to delivery at your door.'
  },
  {
    q: 'Is my information kept private?',
    a: 'Absolutely. All customer information is handled with full discretion and is never shared with third parties. We take your privacy seriously.'
  },
  {
    q: 'How do I follow PB Exotics for new drops?',
    a: 'Follow us on Instagram at @pbexoticsinc for all updates on new product drops, deals, vendor info, and reviews.'
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ paddingTop: 100 }}>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <p className="section-subtitle">Common Questions</p>
          <h1 className="section-title" style={{ marginBottom: 8 }}>FAQ</h1>
          <p style={{ color: 'var(--pb-gray)', marginBottom: 48 }}>
            Everything you need to know about ordering from PB Exotics.
          </p>
          <div className={styles.list}>
            {faqs.map((item, i) => (
              <div key={i} className={`${styles.item} ${open === i ? styles.open : ''}`}>
                <button className={styles.question} onClick={() => setOpen(open === i ? null : i)}>
                  <span>{item.q}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {open === i && <p className={styles.answer}>{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
