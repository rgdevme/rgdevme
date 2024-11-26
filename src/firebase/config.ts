// Import the functions you need from the SDKs you need
import { initializeFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'
import { initializeApp } from 'firebase/app'
import { FireBorm } from 'fireborm'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCHJdqYGjsXWlciLt21lN5i8qheX6tBqoQ',
	authDomain: 'rgdevme.firebaseapp.com',
	projectId: 'rgdevme',
	storageBucket: 'rgdevme.firebasestorage.app',
	messagingSenderId: '615649263196',
	appId: '1:615649263196:web:26c5e77cf3c4f56de1f099',
	measurementId: 'G-7P0LGV13FP'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = initializeFirestore(app, {})
const storage = getStorage(app)

const fireborm = FireBorm({ firestore, storage })

export { fireborm, firestore }
