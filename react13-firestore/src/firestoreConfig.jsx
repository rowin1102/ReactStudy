  // 파이어베이스 서비스에 연결하기 위한 임포트
import { initializeApp } from "firebase/app";
// 파이어스토어 데이터베이스 사용을 위한 임포트
import { getFirestore } from "firebase/firestore";

// .env 생성 전
// 파이어베이스 콘솔에서 발급받은 API정보(SDK 정보)
// const firebaseConfig = {
//   apiKey: "AIzaSyAF2gRJXpRnuBMYOmkVL6nw7reDF-rTt_Q",
//   authDomain: "myreactapp-debab.firebaseapp.com",
//   projectId: "myreactapp-debab",
//   storageBucket: "myreactapp-debab.firebasestorage.app",
//   messagingSenderId: "1016327815493",
//   appId: "1:1016327815493:web:020d9fa61ce44c2830be2c",
//   measurementId: "G-N0N2F364Z0"
// };

// .env 생성 후
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
}

// firebase에 연결 후 앱 초기화
const app = initializeApp(firebaseConfig);
// firestore 사용을 위한 객체 생성
const firestore = getFirestore(app);
// 익스토프(내보내기)
export {firestore};