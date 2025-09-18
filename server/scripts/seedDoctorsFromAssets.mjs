import 'dotenv/config';
import path from 'path';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

import connectDB from '../configs/db.js';
import connectCloudinary from '../configs/cloudinary.js';
import Doctor from '../models/Doctor.js';

const IMAGES_DIR = path.resolve('scripts/doctor_images');   // adjust if your folder is elsewhere
const META_PATH  = path.resolve('scripts/doctors.json');

const must = (name, v) => {
  if (!v) throw new Error(`Missing required env: ${name}`);
  return v;
};

async function main() {
  console.log('IMAGES_DIR =', IMAGES_DIR);
  console.log('META_PATH  =', META_PATH);

  // quick env sanity check
  must('CLOUDINARY_CLOUD_NAME', process.env.CLOUDINARY_CLOUD_NAME);
  must('CLOUDINARY_API_KEY', process.env.CLOUDINARY_API_KEY);
  must('CLOUDINARY_API_SECRET', process.env.CLOUDINARY_API_SECRET);
  must('MONGODB_URI', process.env.MONGODB_URI);

  await connectDB();
  await connectCloudinary();

  const raw = await fs.readFile(META_PATH, 'utf-8');
  const items = JSON.parse(raw);

  for (const item of items) {
    try {
      if (!item.imageFile) throw new Error(`imageFile missing for ${item.name}`);
      const filePath = path.join(IMAGES_DIR, item.imageFile);

      // ensure file exists before upload
      await fs.access(filePath).catch(() => {
        throw new Error(`File not found: ${filePath}`);
      });

      const uploaded = await cloudinary.uploader.upload(filePath, {
        resource_type: 'image',
        folder: 'medicare/doctors',
      });

      await Doctor.findOneAndUpdate(
        { name: item.name },
        {
          name: item.name,
          speciality: item.speciality,
          degree: item.degree,
          experience: item.experience,
          about: item.about,
          fees: item.fees ?? 0,
          address: item.address,
          image: uploaded.secure_url,
          isActive: true,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`✅ Saved: ${item.name}`);
    } catch (err) {
      // ✅ correct variable + full dump so we see the true cause
      console.error(`❌ ${item?.name || 'Unknown'}: ${err?.message || err}`);
      if (err && err.stack) console.error(err.stack);
    }
  }

  await mongoose.connection.close();
  console.log('🎉 Done seeding doctors');
}

main().catch((err) => {
  console.error('Seeder crashed:', err?.message || err);
  if (err?.stack) console.error(err.stack);
  process.exit(1);
});
