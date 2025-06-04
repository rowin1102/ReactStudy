  // 파이어베이스 서비스에 연결하기 위한 임포트
import { getApps, initializeApp } from "firebase/app";
// realtime 데이터베이스 사용을 위한 임포트
import { getDatabase } from "firebase/database";

// .env 생성 후
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
  databaseURL : import.meta.env.VITE_databaseURL
}


const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];
// firestore 사용을 위한 객체 생성
const realtime = getDatabase(app, firebaseConfig.databaseURL);
// 익스토프(내보내기)
export { realtime };