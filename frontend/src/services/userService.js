import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc, deleteField } from 'firebase/firestore';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, deleteUser as deleteUserAuth, updateEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseFirestore } from './FirebaseService';
import fetch from 'node-fetch';

  // Función para obtener los datos del usuario por su UID
  export const fetchUser = async (userId) => {
    try {
      const userDoc = doc(firebaseFirestore, 'users', userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        return userData;
      } else {
        throw new Error('No se encontró el usuario');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      throw error;
    }
  };

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

  //Agregar User Rol
  export const updateUserRole = async (userId, newRole) => {
    const userRef = doc(firebaseFirestore, 'users', userId);
  
    try {
      await updateDoc(userRef, {
        role: newRole
      });
      console.log(`User with ID ${userId} role updated to ${newRole} successfully.`);
      return true;
    } catch (error) {
      console.error(`Error updating user role: ${error}`);
      throw error;
    }
  };

  // Función para eliminar el campo "role" del documento del usuario
  export const deleteUserRoleField = async (userId) => {
    try {
      const userDocRef = doc(firebaseFirestore, 'users', userId);
      // Elimina el campo "role" del documento del usuario
      await updateDoc(userDocRef, {
        role: deleteField()
      });
    } catch (error) {
      throw new Error('Error deleting user role field: ' + error.message);
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

  // Función para actualizar el correo electrónico del usuario en Firestore y en la autenticación de Firebase
  export const updateUserEmail = async (oldEmail, password, newEmail) => {
    const auth = getAuth();
    try {
      // Iniciar sesión con el correo electrónico anterior y la contraseña
      await signInWithEmailAndPassword(auth, oldEmail, password);
  
      // Actualizar el correo electrónico en la autenticación de Firebase
      await updateEmail(auth.currentUser, newEmail);
  
      // Actualizar el correo electrónico en el documento de usuario en Firestore
      const userRef = doc(firebaseFirestore, 'users', auth.currentUser.uid); // Aquí asumo que tienes una colección 'users' y cada usuario tiene un documento con su UID como ID
      await updateDoc(userRef, { email: newEmail });
  
      console.log('Correo electrónico actualizado en Firestore y en la autenticación de Firebase.');
    } catch (error) {
      console.error('Error al actualizar el correo electrónico del usuario:', error);
      throw error;
    }
  };

  // Función para eliminar un usuario utilizando la función del backend
  const deleteUserFromBackend = async (userId) => {
    try {
      const response = await fetch('https://us-central1-tiendalibrosunimayor.cloudfunctions.net/deleteUserFromAuth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uid: userId })
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Mensaje de éxito
      } else {
        throw new Error('Error al eliminar usuario.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  export { deleteUserFromBackend };

  // Función para eliminar un usuario de Firestore
  const deleteUserFromFirestore = async (userId) => {
    try {
      // Obtener una referencia al documento del usuario en Firestore
      const userRef = doc(firebaseFirestore, 'users', userId);

      // Eliminar el documento del usuario
      await deleteDoc(userRef);

      console.log("Usuario eliminado correctamente de Firestore");
      return { success: true, message: "Usuario eliminado correctamente de Firestore" };
    } catch (error) {
      console.error("Error al eliminar usuario de Firestore:", error);
      return { success: false, error: "Error al eliminar usuario de Firestore" };
    }
  };

  export { deleteUserFromFirestore };


