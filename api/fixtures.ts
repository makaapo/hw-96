import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Skipping drop...');
  }
  await User.create(
    {
      email: 'malik@mail.local',
      password: '221096',
      role: 'user',
      displayName: 'Malik',
      avatar: 'fixtures/user.jpg',
      token: crypto.randomUUID(),
    },
    {
      email: 'makapo@mail.local',
      password: '12345',
      role: 'user',
      displayName: 'Makap',
      avatar: 'fixtures/user.jpg',
      token: crypto.randomUUID(),
    },
    {
      email: 'admin@mail.local',
      password: 'admin',
      role: 'admin',
      displayName: 'Admin',
      avatar: 'fixtures/admin.jpg',
      token: crypto.randomUUID(),
    },
  );

  await db.close();
};

void run();
