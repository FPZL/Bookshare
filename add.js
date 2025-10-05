import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  // coloque aqui suas configs do Firebase
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
