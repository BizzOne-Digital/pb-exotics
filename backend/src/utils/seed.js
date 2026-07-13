const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const Product = require('../models/Product');
const Post = require('../models/Post');

const products = [
  // FLOWER
  {
    name: 'Pink Runtz',
    category: 'Flower',
    strain: 'Hybrid',
    genetics: 'Zkittlez x Gelato',
    thc: '24-27%',
    cbd: '0.1%',
    description: 'A premium hybrid delivering sweet, fruity aromas with a smooth, euphoric high. Dense, frosty buds with a rainbow of terpenes. PB Exotics grade — consistency guaranteed.',
    effects: ['Euphoric', 'Relaxed', 'Happy', 'Creative'],
    flavours: ['Sweet', 'Fruity', 'Candy'],
    images: [
      'https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=800&q=80',
      'https://images.unsplash.com/photo-1616687562973-1a8a05de1a1c?w=800&q=80'
    ],
    pricing: [
      { size: 'HQ', price: 30 },
      { size: 'Q', price: 55 },
      { size: 'Half Oz', price: 95 },
      { size: 'Oz', price: 150 }
    ],
    contactForPricing: false,
    inStock: true,
    featured: true,
    tags: ['premium', 'hybrid', 'sweet']
  },
  {
    name: 'Purple Punch',
    category: 'Flower',
    strain: 'Indica',
    genetics: 'Larry OG x Granddaddy Purple',
    thc: '20-23%',
    cbd: '0.1%',
    description: 'A hard-hitting indica that smells like a freshly opened bag of grape candy. Perfect for evening relaxation. Heavy body high with a calming cerebral effect.',
    effects: ['Relaxed', 'Sleepy', 'Happy', 'Body High'],
    flavours: ['Grape', 'Blueberry', 'Vanilla'],
    images: [
      'https://images.unsplash.com/photo-1530089711124-9be31d9728e5?w=800&q=80'
    ],
    pricing: [
      { size: 'HQ', price: 30 },
      { size: 'Q', price: 55 },
      { size: 'Half Oz', price: 95 },
      { size: 'Oz', price: 150 }
    ],
    contactForPricing: false,
    inStock: true,
    featured: true,
    tags: ['indica', 'relaxing', 'grape']
  },
  {
    name: 'Sour Diesel',
    category: 'Flower',
    strain: 'Sativa',
    genetics: 'Chemdawg x Super Skunk',
    thc: '22-26%',
    cbd: '0.2%',
    description: 'A fast-acting sativa that delivers energizing, dreamy cerebral effects. Classic fuel-forward terpene profile. Great for daytime use when you need to stay active and focused.',
    effects: ['Energetic', 'Uplifted', 'Creative', 'Focused'],
    flavours: ['Diesel', 'Earthy', 'Citrus'],
    images: [
      'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80'
    ],
    pricing: [
      { size: 'HQ', price: 30 },
      { size: 'Q', price: 55 },
      { size: 'Half Oz', price: 95 },
      { size: 'Oz', price: 150 }
    ],
    contactForPricing: false,
    inStock: true,
    featured: false,
    tags: ['sativa', 'daytime', 'energetic']
  },
  {
    name: 'Gelato #41',
    category: 'Flower',
    strain: 'Hybrid',
    genetics: 'Sunset Sherbet x Thin Mint GSC',
    thc: '25-28%',
    cbd: '0.1%',
    description: 'One of the most sought-after cuts of Gelato. Tight, colourful buds dripping in resin with a dessert-forward terpene profile. A balanced high that hits hard and lingers.',
    effects: ['Euphoric', 'Relaxed', 'Creative', 'Giggly'],
    flavours: ['Sweet', 'Mint', 'Citrus', 'Creamy'],
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80'
    ],
    pricing: [
      { size: 'HQ', price: 30 },
      { size: 'Q', price: 55 },
      { size: 'Half Oz', price: 95 },
      { size: 'Oz', price: 150 }
    ],
    contactForPricing: false,
    inStock: true,
    featured: true,
    tags: ['premium', 'hybrid', 'gelato']
  },
  {
    name: 'White Widow',
    category: 'Flower',
    strain: 'Hybrid',
    genetics: 'Brazilian Sativa x South Indian Indica',
    thc: '20-25%',
    cbd: '0.1%',
    description: 'A legendary strain that built its reputation on explosive potency and a thick coat of white resin crystals. A balanced high perfect for any time of day.',
    effects: ['Happy', 'Uplifted', 'Euphoric', 'Energetic'],
    flavours: ['Earthy', 'Woody', 'Spicy'],
    images: [
      'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&q=80'
    ],
    pricing: [
      { size: 'HQ', price: 30 },
      { size: 'Q', price: 55 },
      { size: 'Half Oz', price: 95 },
      { size: 'Oz', price: 150 }
    ],
    contactForPricing: false,
    inStock: true,
    featured: false,
    tags: ['classic', 'hybrid']
  },
  // EDIBLES
  {
    name: 'PB House Gummies',
    category: 'Edibles',
    strain: 'N/A',
    thc: '10mg per piece',
    description: 'PB Exotics branded gummies. 10mg THC per gummy, 10 pieces per pack. Lab-tested and precisely dosed. Available in mixed fruit flavours.',
    effects: ['Relaxed', 'Happy', 'Body High'],
    flavours: ['Mixed Fruit', 'Watermelon', 'Mango'],
    images: [
      'https://images.unsplash.com/photo-1582845512747-e42001c95638?w=800&q=80'
    ],
    pricing: [],
    contactForPricing: true,
    inStock: true,
    featured: false,
    tags: ['edibles', 'gummies', 'pb-brand']
  },
  // CONCENTRATES
  {
    name: 'Live Resin — Runtz',
    category: 'Concentrates',
    strain: 'Hybrid',
    genetics: 'Runtz derived',
    thc: '75-82%',
    description: 'Fresh-frozen live resin capturing the full terpene profile of Runtz at harvest. Sauce consistency with visible crystalline structures. Premium extraction for premium results.',
    effects: ['Euphoric', 'Relaxed', 'Potent'],
    flavours: ['Sweet', 'Candy', 'Fruity'],
    images: [
      'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&q=80'
    ],
    pricing: [],
    contactForPricing: true,
    inStock: true,
    featured: false,
    tags: ['concentrate', 'live-resin', 'premium']
  },
  // VAPES
  {
    name: 'Disposable Vape — Blueberry OG',
    category: 'Vapes',
    strain: 'Indica',
    thc: '85%',
    description: '1g disposable vape pen. Ceramic coil, no cutting agents. Smooth, flavourful draws with consistent potency from first hit to last. USB-C rechargeable.',
    effects: ['Relaxed', 'Sleepy', 'Happy'],
    flavours: ['Blueberry', 'OG', 'Sweet'],
    images: [
      'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80'
    ],
    pricing: [],
    contactForPricing: true,
    inStock: true,
    featured: false,
    tags: ['vape', 'disposable', 'indica']
  }
];

const posts = [
  {
    title: 'Welcome To The Beginning',
    tag: 'Launch',
    excerpt: 'After years of preparation, PB Exotics is live. Here\'s what we stand for and what to expect from us.',
    content: 'After years of preparation and construction, we are proud to launch PB Exotics — promising quality, consistency, and most importantly, affordability. Follow us for all information on vendors, deals, reviews, and all upcoming drops. Welcome to the beginning.',
    image: '/home.png',
    published: true
  },
  {
    title: 'How Our Delivery Windows Work',
    tag: 'Guide',
    excerpt: 'Same day, next day courier, or mail order — a breakdown of every delivery option and how to pick the right one.',
    content: 'Same Day Delivery has a max 1hr 30min wait, or you can pre-order within one of our windows: 10am-2pm, 2pm-6pm, or 6pm-10pm. Next Day Courier gives you a tracking number the morning after your E-Transfer is confirmed. Mail Order ships the next morning after payment.',
    image: '/hero.png',
    published: true
  },
  {
    title: 'Understanding Our Pricing',
    tag: 'Guide',
    excerpt: 'A quick look at our flower pricing tiers and why we keep costs down without compromising on quality.',
    content: 'All flower starts at: HQ $30, Q $55, Half Oz $95, Oz $150. Other categories like concentrates, vapes and edibles are priced individually — contact us for a quote.',
    image: '/news.png',
    published: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Post.deleteMany({});
    await User.deleteMany({ role: 'admin' });

    // Create admin user
    const admin = await User.create({
      name: 'PB Exotics Admin',
      email: process.env.ADMIN_EMAIL || 'admin@pbexotics.ca',
      password: process.env.ADMIN_PASSWORD || 'PBExotics@Admin2024',
      role: 'admin'
    });
    console.log(`Admin created: ${admin.email}`);

    // Seed products
    const seeded = await Product.insertMany(products);
    console.log(`${seeded.length} products seeded`);

    const seededPosts = await Post.insertMany(posts);
    console.log(`${seededPosts.length} posts seeded`);

    console.log('\n=== SEED COMPLETE ===');
    console.log(`Admin Email: ${admin.email}`);
    console.log(`Admin Password: ${process.env.ADMIN_PASSWORD || 'PBExotics@Admin2024'}`);
    console.log('Change password after first login!');

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedDB();
