import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

async function carregarLivros() {
  const lista = document.getElementById("book-list");
  const querySnapshot = await getDocs(collection(db, "livros"));
  lista.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const livro = doc.data();
    lista.innerHTML += `
      <div class="card">
        <img src="${livro.foto}" alt="${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p>${livro.descricao}</p>
      </div>
    `;
  });
}

carregarLivros();
