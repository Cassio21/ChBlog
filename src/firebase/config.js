import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCirmvpxp8ve_e9p2pdgOFzl4bXHnC98Es',
  authDomain: 'charlieblog-3afe6.firebaseapp.com',
  projectId: 'charlieblog-3afe6',
  storageBucket: 'charlieblog-3afe6.appspot.com',
  messagingSenderId: '847282878734',
  appId: '1:847282878734:web:0d4229a200bdf08fc0ff5f',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
