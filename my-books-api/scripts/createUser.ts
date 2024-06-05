import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createUser = async (email: string, password: string): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await addDoc(collection(db, 'users'), {
      email,
      password: hashedPassword
    });
    console.log(`User ${email} created.`);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;

if (email && password) {
  createUser(email, password).catch(console.error);
} else {
  console.error('USER_EMAIL or USER_PASSWORD is not defined in .env');
}
