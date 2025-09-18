// scripts/seedTests.js
import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';

import connectDB from '../configs/db.js';
import TestCatalog from '../models/TestCatalog.js';

const META_PATH = path.resolve('scripts/tests.json');

async function main() {
  await connectDB();

  const raw = await fs.readFile(META_PATH, 'utf-8');
  const items = JSON.parse(raw);

  for (const item of items) {
    try {
      await TestCatalog.findOneAndUpdate(
        { name: item.name },
        {
          name: item.name,
          description: item.description,
          fees: item.fees,
          isActive: true
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`✅ Saved: ${item.name}`);
    } catch (err) {
      console.error(`❌ ${item?.name || 'Unknown'}: ${err?.message || err}`);
    }
  }

  await mongoose.connection.close();
  console.log('🎉 Done seeding medical tests');
}

main().catch((err) => {
  console.error('Seeder crashed:', err?.message || err);
  process.exit(1);
});
