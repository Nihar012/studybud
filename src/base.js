import firebase from 'firebase';
import 'firebase/storage';

export const app = firebase.initializeApp({
    "projectId": "studybud-42ff1",
    "appId": "1:233972892855:web:0483a9a142ff59cd803932",
    "databaseURL": "https://studybud-42ff1.firebaseio.com",
    "storageBucket": "studybud-42ff1.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyDNU2abAU5D7TFblntN0RDNjJBU-PxKAgU",
    "authDomain": "studybud-42ff1.firebaseapp.com",
    "messagingSenderId": "233972892855",
    "measurementId": "G-26QX8L8K4D"
  });