import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcVAW6i41Ss2K8JvG6mwsGKsu1dKQqiW0",
  authDomain: "bookshare-3a815.firebaseapp.com",
  databaseURL: "https://bookshare-3a815-default-rtdb.firebaseio.com",
  projectId: "bookshare-3a815",
  storageBucket: "bookshare-3a815.firebasestorage.app",
  messagingSenderId: "284448011811",
  appId: "1:284448011811:web:abd5dcf34312b2f6f1e396",
  measurementId: "G-4KE49WKX23"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.getElementById("book-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const arquivo = document.getElementById("foto").files[0];

  const storageRef = ref(storage, "livros/" + arquivo.name);
  await uploadBytes(storageRef, arquivo);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "livros"), {
    titulo,
    descricao,
    foto: url
  });

  alert("📘 Livro adicionado com sucesso!");
  window.location.href = "index.html";
});

