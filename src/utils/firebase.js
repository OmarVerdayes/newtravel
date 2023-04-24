import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBygoGQ2rj_SKNSohG-gBVe-FNDFfKMn_A",
  authDomain: "travel-20213tn042.firebaseapp.com",
  projectId: "travel-20213tn042",
  storageBucket: "travel-20213tn042.appspot.com",
  messagingSenderId: "139470445297",
  appId: "1:139470445297:web:633ddd47a7cb0031276750"
};

export const initFirebase = initializeApp(firebaseConfig);