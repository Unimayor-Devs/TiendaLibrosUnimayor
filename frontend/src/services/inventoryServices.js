import { collection, getDocs, doc, updateDoc,  getDoc} from 'firebase/firestore';
import { firebaseFirestore } from './FirebaseService';

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

// Función para editar un libro y actualizar su inventario
export const editBookAndInventory = async (bookId, updatedBookData) => {
    try {
      const bookDocRef = doc(firebaseFirestore, 'books', bookId);
      await updateDoc(bookDocRef, updatedBookData);
      console.log('Libro editado con éxito');
    } catch (error) {
      console.error('Error al editar el libro:', error);
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

// Función para obtener un libro específico por su invID
export const getBookByInvId = async (invId) => {
  try {
    const booksCollectionRef = collection(firebaseFirestore, 'books');
    const booksQuerySnapshot = await getDocs(booksCollectionRef);
    let book = null;
    booksQuerySnapshot.forEach((doc) => {
      const bookData = doc.data();
      if (bookData.invID === invId) {
        book = { id: doc.id, ...bookData };
      }
    });
    return book;
  } catch (error) {
    console.error('Error fetching book by invID:', error);
    throw error;
  }
};

// Función para consultar todos los libros con el mismo tipo de libro
export const getBooksByType = async (bookType) => {
    try {
      const booksCollectionRef = collection(firebaseFirestore, 'books');
      const booksQuerySnapshot = await getDocs(booksCollectionRef);
      const filteredBooks = [];
      booksQuerySnapshot.forEach((doc) => {
        const bookData = doc.data();
        if (bookData.type === bookType) {
          filteredBooks.push({ id: doc.id, ...bookData });
        }
      });
      return filteredBooks;
    } catch (error) {
      console.error('Error al consultar los libros por tipo:', error);
      throw error;
    }
  };
  
  // Función para asignar un invBookId basado en el tipo de libro y la cantidad existente
    export const assignInvBookId = async (bookType) => {
        try {
        const filteredBooks = await getBooksByType(bookType);
        const existingInvIds = filteredBooks.filter(book => book.invBookId).map(book => book.invBookId);
        let invBookId = '';
        let typePrefix = bookType.substring(0, 3).toUpperCase();
    
        if (existingInvIds.length === 0) {
            // Si no hay ningún invBookId existente, asigna uno nuevo basado en el tipo de libro
            invBookId = `${typePrefix}-1`;
        } else {
            // Si hay invBookIds existentes, encuentra el número más alto y asigna uno nuevo basado en ese número
            const highestNumber = Math.max(...existingInvIds.map(id => {
            const parts = id.split('-');
            return parts.length > 1 && !isNaN(parts[1]) ? parseInt(parts[1], 10) : 0;
            }));
            invBookId = `${typePrefix}-${highestNumber + 1}`;
        }
        return invBookId;
        } catch (error) {
        console.error('Error al asignar invBookId:', error);
        throw error;
        }
    };
  
