import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser as deleteUserAuth } from 'firebase/auth';
import { firebaseFirestore } from './FirebaseService';

  //Función Obtener Usuarios
  export const getUsers = async () => {
    try {
      const userCollection = collection(firebaseFirestore, 'users');
      const querySnapshot = await getDocs(userCollection);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  // Función para obtener un usuario específico por su ID
  export const getUser = async (userId) => {
    try {
      const userDocRef = doc(firebaseFirestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        return {
          id: userDocSnap.id,
          ...userDocSnap.data()
        };
      } else {
        throw new Error(`User with ID ${userId} not found.`);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  // Función para eliminar un usuario de Firestore y de Authentication
  export const deleteUser = async (userId) => {
    const auth = getAuth();

    try {
      // Obtener el usuario actualmente autenticado
      const currentUser = auth.currentUser;

      if (currentUser && currentUser.uid === userId) {
        // Si el usuario autenticado es el que se va a eliminar, realizar la reautenticación
        const email = currentUser.email; // Obtener el correo electrónico del usuario autenticado

        // Eliminar el usuario del servicio de autenticación (Authentication)
        await deleteUserAuth(currentUser);

        // Eliminar el documento del usuario de Firestore
        await deleteDoc(doc(firebaseFirestore, 'users', userId));

        // Si se completa con éxito, devuelve true
        return true;
      } else {
        throw new Error('User not authenticated or does not match the provided userId.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  //Función Modificar
  export const updateUser = async (userId, updatedUserData) => {
    try {
      const userRef = doc(firebaseFirestore, 'users', userId);
      await updateDoc(userRef, updatedUserData);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  //Función Usar Documentos de Firestore
  export const useFirestoreDoc = async (collectionName, docId) => {
    const docRef = doc(firebaseFirestore, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  };

  // Función para cambiar la contraseña del usuario
  export const changeUserPassword = async (email, currentPassword, newPassword) => {
    const auth = getAuth();
    const credential = EmailAuthProvider.credential(email, currentPassword);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User is not authenticated.');
      }

      // Reautenticar al usuario con la contraseña actual
      await reauthenticateWithCredential(currentUser, credential);

      // Actualizar la contraseña del usuario
      await updatePassword(currentUser, newPassword);

      // Si todo fue exitoso, devuelve true u otro valor significativo
      return true;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };