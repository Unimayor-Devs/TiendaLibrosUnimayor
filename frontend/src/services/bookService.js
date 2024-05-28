import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, addDoc } from 'firebase/firestore';
import { firebaseFirestore } from './FirebaseService';

// Función para agregar un nuevo libro
export const addBook = async (bookData) => {
  try {
    const docRef = await addDoc(collection(firebaseFirestore, 'books'), bookData);
    console.log('Libro agregado con ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar el libro:', error);
    throw error;
  }
};

// Función para editar un libro existente
export const editBook = async (bookId, updatedBookData) => {
  try {
    const bookDocRef = doc(firebaseFirestore, 'books', bookId);
    await updateDoc(bookDocRef, updatedBookData);
    console.log('Libro editado con éxito');
  } catch (error) {
    console.error('Error al editar el libro:', error);
    throw error;
  }
};

// Función para eliminar un libro
export const deleteBook = async (bookId) => {
  try {
    const bookDocRef = doc(firebaseFirestore, 'books', bookId);
    await deleteDoc(bookDocRef);
    console.log('Libro eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    throw error;
  }
};

// Función para obtener un libro específico por su ID
export const getBookById = async (bookId) => {
  try {
    const bookDocRef = doc(firebaseFirestore, 'books', bookId);
    const bookDocSnap = await getDoc(bookDocRef);

    if (bookDocSnap.exists()) {
      return {
        id: bookDocSnap.id,
        ...bookDocSnap.data()
      };
    } else {
      throw new Error(`Book with ID ${bookId} not found.`);
    }
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

// Función para consultar todos los libros
export const getAllBooks = async () => {
  try {
    const booksCollectionRef = collection(firebaseFirestore, 'books');
    const booksQuerySnapshot = await getDocs(booksCollectionRef);
    const books = [];
    booksQuerySnapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return books;
  } catch (error) {
    console.error('Error al consultar todos los libros:', error);
    throw error;
  }
};

// Función para borrar un libro por su ID
export const deleteBookById = async (bookId) => {
  try {
    const bookDocRef = doc(firebaseFirestore, 'books', bookId);
    await deleteDoc(bookDocRef);
    console.log('Libro eliminado con éxito');
  } catch (error) {
    console.error('Error al eliminar el libro:', error);
    throw error;
  }
};

// Función para actualizar el stock de un libro después de una compra
export const updateBookStock = async (bookId, newStock) => {
  try {
    const bookDocRef = doc(firebaseFirestore, 'books', bookId);
    await updateDoc(bookDocRef, { invCantStock: newStock });
    console.log('Stock del libro actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el stock del libro:', error);
    throw error;
  }
};


// Función para actualizar el estado de un libro
export const updateBookStatus = async (bookId, newStatus) => {
  try {
    const bookRef = doc(firebaseFirestore, 'books', bookId);
    await updateDoc(bookRef, { invStatus: newStatus });
    console.log(`Estado del libro con ID ${bookId} actualizado a "${newStatus}"`);
  } catch (error) {
    console.error('Error updating book status:', error);
    throw error;
  }
};