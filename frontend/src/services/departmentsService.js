import { collection, getDocs, where, query } from 'firebase/firestore';
import { firebaseFirestore } from './FirebaseService'; // Asegúrate de importar correctamente tu instancia de Firebase Firestore

// Función para obtener el departamento por nombre
export const getDepartmentByName = async (departmentName) => {
  try {
    const departmentsRef = collection(firebaseFirestore, 'departments');
    const q = query(departmentsRef, where('depName', '==', departmentName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error(`No se encontró ningún departamento con el nombre '${departmentName}'`);
    } else {
      const departmentData = querySnapshot.docs[0].data();
      return departmentData;
    }
  } catch (error) {
    console.error('Error al obtener el departamento:', error);
    throw error;
  }
};

// Aquí puedes definir otras funciones para interactuar con la colección "departments" si lo necesitas
