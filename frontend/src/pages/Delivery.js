import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, ShopIcon, TruckIcon, PackageIcon } from '../components/common/Icons';
import styles from './Delivery.module.css';
import pricingStyles from './Pricing.module.css';

const deliveryServices = [
  { icon: ClockIcon, title: 'Same Day Delivery', desc: 'Max 1hr 30min wait, or pre-order within a delivery window. Price varies by delivery service.', tag: '$5' },
  { icon: TruckIcon, title: 'Next Day Courier', desc: 'Tracking will be provided the next day, once payment is confirmed.', tag: 'Free' },
  { icon: PackageIcon, title: 'Mail Order Shipping', desc: 'Packed and shipped the next morning after payment.', tag: '$20 Flat Rate' },
];

const dayHours = [
  { day: 'Monday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Tuesday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Wednesday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Thursday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Friday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 8:00 PM' },
  { day: 'Sunday', hours: '12:00 PM – 8:00 PM' },
];

const coverageAreas = [
  { title: 'Brampton & Mississauga', desc: 'Free delivery on orders over $80. Orders under the minimum have a $5 delivery fee.' },
  { title: 'Surrounding & Other Cities', desc: 'Free delivery on orders over $100. Orders under the minimum have a $5–$20 delivery fee.' },
];

const Delivery = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you shortly.');
    setSent(true);
  };

  const infoItems = [
    { icon: PhoneIcon, label: 'Phone', value: '1 (437) 329-7424', href: 'tel:14373297424' },
    { icon: MailIcon, label: 'Text / Email', value: 'maze@growiqtech.com', href: 'mailto:maze@growiqtech.com' },
    { icon: ShopIcon, label: 'Order Online', value: 'Order on our website', to: '/shop' },
    { icon: MapPinIcon, label: 'Location', value: 'Brampton, Ontario' },
  ];

  return (
    <div style={{ paddingTop: 100 }}>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <p className="section-subtitle">Fast & Discreet</p>
          <h1 className="section-title" style={{ marginBottom: 8 }}>Delivery <span>Info</span></h1>
          <p style={{ color: 'var(--pb-gray)', marginBottom: 56 }}>
            Everything you need to know about ordering and getting your delivery.
          </p>

          <div className={styles.layout}>
            {/* Info */}
            <div className={styles.info}>
              <div className={styles.infoCards}>
                {infoItems.map(({ icon: Icon, label, value, href, to }) => {
                  const Wrapper = to ? Link : 'a';
                  const wrapperProps = to
                    ? { to }
                    : href
                      ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' }
                      : {};
                  return (
                    <Wrapper key={label} className={styles.infoCard} {...wrapperProps}>
                      <div className={styles.infoIcon}>
                        <Icon size={20} style={{ color: 'var(--pb-red)' }} />
                      </div>
                      <div>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Brampton%2C+Ontario"
                target="_blank"
                rel="noreferrer"
                className={`btn btn-red ${styles.directionsBtn}`}
              >
                <MapPinIcon size={18} /> Get Directions
              </a>
            </div>

            {/* Hours */}
            <div className={styles.hours}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <ClockIcon size={18} style={{ color: 'var(--pb-red)' }} />
                <h3 className={styles.hoursTitle}>Opening Hours</h3>
              </div>
              {dayHours.map(({ day, hours }) => (
                <div key={day} className={styles.hoursRow}>
                  <span>{day}</span>
                  <strong>{hours}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Windows */}
          <div style={{ marginTop: 72 }}>
            <h2 className={styles.groupTitle}>Same Day <span>Delivery Windows</span></h2>
            <p className={styles.groupSubtitle}>Pick your window — we deliver to your door.</p>
            <div className={styles.windowsGrid}>
              {[
                { window: '10AM – 2PM', label: 'Morning Window' },
                { window: '2PM – 6PM', label: 'Afternoon Window' },
                { window: '6PM – 10PM', label: 'Evening Window' },
              ].map(({ window, label }) => (
                <div key={window} className={styles.windowCard}>
                  <ClockIcon size={28} style={{ color: 'var(--pb-red)' }} />
                  <strong>{window}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Shipping */}
          <div style={{ marginTop: 72 }}>
            <h2 className={pricingStyles.groupTitle}>Delivery & Shipping</h2>
            <div className={pricingStyles.servicesGrid}>
              {deliveryServices.map(({ icon: Icon, title, desc, tag }) => (
                <div key={title} className={pricingStyles.serviceCard}>
                  <div className={pricingStyles.serviceIcon}><Icon size={24} style={{ color: 'var(--pb-red)' }} /></div>
                  <div className={pricingStyles.serviceTag}>{tag}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage */}
          <div style={{ marginTop: 56 }}>
            <h2 className={pricingStyles.groupTitle}>Coverage & Delivery Areas</h2>
            <div className={pricingStyles.servicesGrid}>
              {coverageAreas.map(({ title, desc }) => (
                <div key={title} className={pricingStyles.serviceCard}>
                  <div className={pricingStyles.serviceIcon}><MapPinIcon size={24} style={{ color: 'var(--pb-red)' }} /></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.contactSection}>
            <p className="section-subtitle">Still Have Questions?</p>
            <h2 className="section-title" style={{ marginBottom: 32 }}>Send Us A <span>Message</span></h2>
            <div className={styles.formWrap}>
              {sent ? (
                <div className={styles.sentBox}>
                  <strong>Message Received</strong>
                  <p>We'll get back to you as soon as possible. Thank you for reaching out.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
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

export default Delivery;
