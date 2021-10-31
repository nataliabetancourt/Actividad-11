const firebaseConfig = {
    apiKey: "AIzaSyAfWtvUuXolA3jSU5ce9XHM6o7Cj5eShsk",
  authDomain: "eco-actividad11.firebaseapp.com",
  databaseURL: "https://eco-actividad11-default-rtdb.firebaseio.com",
  projectId: "eco-actividad11",
  storageBucket: "eco-actividad11.appspot.com",
  messagingSenderId: "87330698236",
  appId: "1:87330698236:web:251a4930cbf15fdc1fb879"
};

export function getFirebaseConfig(){
    if (!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    } else {
        return firebaseConfig;
    }
}
