import { useState } from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from '../components/common/Icons';
import toast from 'react-hot-toast';
import styles from './Contact.module.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production connect this to your backend or email service
    toast.success('Message sent! We\'ll get back to you shortly.');
    setSent(true);
  };

  return (
    <div style={{ paddingTop: 100 }}>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <p className="section-subtitle">Get In Touch</p>
          <h1 className="section-title" style={{ marginBottom: 8 }}>Contact <span>Us</span></h1>
          <p style={{ color: 'var(--pb-gray)', marginBottom: 56 }}>
            Have a question about an order, product, or delivery? Reach out — we respond fast.
          </p>

          <div className={styles.layout}>
            {/* Info */}
            <div className={styles.info}>
              <div className={styles.infoCards}>
                {[
                  { icon: PhoneIcon, label: 'Phone', value: '1 (437) 329-7424', href: 'tel:14373297424' },
                  { icon: MailIcon, label: 'Email', value: 'maze@growiqtech.com', href: 'mailto:maze@growiqtech.com' },
                  { icon: MapPinIcon, label: 'Website', value: 'pbexotics.ca', href: 'https://pbexotics.ca' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className={styles.infoCard} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <div className={styles.infoIcon}>
                      <Icon size={20} style={{ color: 'var(--pb-red)' }} />
                    </div>
                    <div>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </div>
                  </a>
                ))}
              </div>

              <div className={styles.hours}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <ClockIcon size={18} style={{ color: 'var(--pb-red)' }} />
                  <h3 className={styles.hoursTitle}>Delivery Windows</h3>
                </div>
                {[
                  { day: 'Window 1', hours: '10:00 AM – 2:00 PM' },
                  { day: 'Window 2', hours: '2:00 PM – 6:00 PM' },
                  { day: 'Window 3', hours: '6:00 PM – 10:00 PM' },
                ].map(({ day, hours }) => (
                  <div key={day} className={styles.hoursRow}>
                    <span>{day}</span>
                    <strong>{hours}</strong>
                  </div>
                ))}
                <p className={styles.hoursNote}>Place pre-orders in advance to guarantee your window.</p>
              </div>

              <div className={styles.social}>
                <p>Follow us for drops, deals & updates:</p>
                <a href="https://instagram.com/pbexoticsinc" target="_blank" rel="noreferrer" className={styles.socialLink}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                  @pbexoticsinc
                </a>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formWrap}>
              {sent ? (
                <div className={styles.sentBox}>
                  <strong>Message Received</strong>
                  <p>We'll get back to you as soon as possible. Thank you for reaching out.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h2 className={styles.formTitle}>Send a Message</h2>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Name *</label>
                      <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" />
                    </div>
                    <div className={styles.field}>
                      <label>Phone</label>
                      <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="Your phone" />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>Email *</label>
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div className={styles.field}>
                    <label>Message *</label>
                    <textarea required value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us what you need..." rows={5} />
                  </div>
                  <button type="submit" className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
