import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
  } catch (e) {
    console.log('Skipping drop...');
  }
  const [user1, user2] = await User.create(
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
  await Cocktail.create(
    {
      name: 'Белый русский',
      receipt:
        'Наполни рокс кубиками льда доверху, Налей в бокал нежирные сливки 30 мл, кофейный ликер 30 мл и водку 30 мл. Размешай коктейльной ложкой, пока не замерзнут стенки',
      author: user1._id,
      isPublished: true,
      image: 'fixtures/white-russian.jpg',
      ingredients: [
        { name: 'Водка Царская', amount: '30ml' },
        { name: 'Кофейный ликер Fruko Schulz', amount: '30ml' },
        { name: 'Нежирные сливки', amount: '30ml' },
        { name: 'Лед в кубиках', amount: '120g' },
      ],
    },
    {
      name: 'Мохито',
      receipt:
        'Положи в хайбол лайм 3 дольки и подави мадлером. Возьми мяту 10 листиков в одну руку и хлопни по ним другой рукой .Положи мяту в хайбол. Наполни бокал дробленым льдом доверху. Добавь сахарный сироп 15 мл и белый ром 50 мл. Долей содовую доверху и аккуратно размешай коктейльной ложкой. Досыпь немного дробленого льда. Укрась веточкой мяты и долькой лайма',
      author: user1._id,
      isPublished: true,
      image: 'fixtures/mohito.jpg',
      ingredients: [
        { name: 'Белый ром', amount: '50ml' },
        { name: 'Сахарный сироп', amount: '15ml' },
        { name: 'Содовая', amount: '100ml' },
        { name: 'Лайм', amount: '80g' },
        { name: 'Мята', amount: '3g' },
        { name: 'Дробленный лед', amount: '200g' },
      ],
    },
    {
      name: 'Дайкири',
      receipt:
        'Налей в шейкер лаймовый сок 30 мл, сахарный сироп 15 мл и белый ром 60 мл. Наполни шейкер кубиками льда и взбей. Перелей через стрейнер в охлажденное шампанское блюдце',
      author: user2._id,
      isPublished: true,
      image: 'fixtures/day.jpg',
      ingredients: [
        { name: 'Белый ром', amount: '60ml' },
        { name: 'Сахарный сироп', amount: '15ml' },
        { name: 'Лаймовый сок', amount: '30ml' },
        { name: 'Лед в кубиках', amount: '200g' },
      ],
    },
    {
      name: 'Б-52',
      receipt:
        'Налей в стопку кофейный ликер 15 мл. Используя коктейльную ложку, уложи слой айриш крим 15 мл и слой ликера трипл сек 15 мл. Поджигай, вооружайся трубочками и угощай!',
      author: user2._id,
      image: 'fixtures/b52.jpg',
      ingredients: [
        { name: 'Кофейный ликер Fruko Schulz', amount: '15ml' },
        { name: 'Айриш крим', amount: '15ml' },
        { name: 'Трипл сек Fruko Schulz', amount: '15ml' },
      ],
    },
  );

  await db.close();
};

void run();
