import { addDoc, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firebaseFirestore } from './FirebaseService'; // Asegúrate de importar correctamente tu instancia de Firebase Firestore

// Función para agregar una nueva orden
export const addOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(firebaseFirestore, 'orders'), orderData);
    console.log('Orden agregada con ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error al agregar la orden:', error);
    throw error;
  }
};

// Función para consultar todos los documentos de la colección "orders"
export const getOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(firebaseFirestore, 'orders'));
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return orders;
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
      throw error;
    }
  };

// Función para consultar un documento de la colección "orders" por su ID
export const getOrderById = async (orderId) => {
    try {
      const orderRef = doc(firebaseFirestore, 'orders', orderId);
      const orderSnap = await getDoc(orderRef);
  
      if (orderSnap.exists()) {
        return { id: orderSnap.id, ...orderSnap.data() };
      } else {
        throw new Error('No se encontró la orden');
      }
    } catch (error) {
      console.error('Error al obtener la orden por ID:', error);
      throw error;
    }
  };