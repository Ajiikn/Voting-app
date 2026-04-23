require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Candidate = require('./models/Candidate');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/university-voting';

const categories = [
  { name: 'Best Dressed' },
  { name: 'Most Popular' },
  { name: 'Best Student Leader' },
  { name: 'Most Hardworking' },
];

const candidates = [
  { name: 'Chidi Okafor', category: 'Best Dressed' },
  { name: 'Amara Nwosu', category: 'Best Dressed' },
  { name: 'Emeka Adeyemi', category: 'Most Popular' },
  { name: 'Ngozi Eze', category: 'Most Popular' },
  { name: 'Tunde Balogun', category: 'Best Student Leader' },
  { name: 'Ifeoma Okwu', category: 'Best Student Leader' },
  { name: 'Femi Adeleke', category: 'Most Hardworking' },
  { name: 'Chisom Obi', category: 'Most Hardworking' },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await Category.deleteMany({});
  await Candidate.deleteMany({});

  await Category.insertMany(categories);
  console.log('✅ Categories seeded');

  await Candidate.insertMany(candidates);
  console.log('✅ Candidates seeded');

  console.log('\n🎉 Database seeded successfully!');
  console.log('Visit http://localhost:3000 to see candidates');
  console.log('Admin login: username=admin password=admin123');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });