import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CartView.css'; // Importa los estilos CSS
import { getDepartmentByName } from '../../../services/departmentsService'; // Importa la función para obtener el departamento por nombre
import { updateBookStock } from '../../../services/bookService'; // Importa la función para obtener el departamento por nombre 
import { fetchUser } from '../../../services/userService'; // Importa la función para obtener el departamento por nombre
import { getAuth } from 'firebase/auth';
import { addOrder } from '../../../services/ordersService'; // Importa la función para agregar una nueva orden
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const formatCurrency = (value) => {
  return `$ ${value.toLocaleString()}`;
};

const CartView = ({ cart, setCart, handleRemoveFromCart, isCartVisible, setIsCartVisible }) => {
  const [isQuantityValid, setIsQuantityValid] = useState(true); // Estado para controlar si la cantidad es válida
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [shippingValue, setShippingValue] = useState(0); // Estado para almacenar el valor del envío
  const [totalWithShipping, setTotalWithShipping] = useState(0); // Estado para almacenar el total a pagar con envío
  const [cardNumberWarning, setCardNumberWarning] = useState(''); // Estado para advertencia del número de tarjeta
  const [expiryDateWarning, setExpiryDateWarning] = useState(''); // Estado para advertencia de la fecha de expiración
  const [cvvWarning, setCvvWarning] = useState(''); // Estado para advertencia del CVV
  const [orderId, setOrderId] = useState(null);

  // Define información de tarjetas aceptadas y denegadas
  const acceptedCard = {
    cardNumber: '1111111111111111',
    expiryDate: '10/28',
    cvv: '111',
  };

  const deniedCard = {
    cardNumber: '2222222222222222',
    expiryDate: '10/28',
    cvv: '222',
  };

const handleAddOrder = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userData = await fetchUser(user.uid); // Obtener la información del usuario actual utilizando su UID

      const currentDate = new Date().toISOString();
      const orderData = {
        idUsuario: user.uid,
        fechaPedido: currentDate,
        estadoPedido: 'Completado',
        items: cart.map(item => ({
          idLibro: item.id,
          cantidad: item.quantity, // Utiliza la cantidad del libro en el carrito
          subtotal: item.value * item.quantity, // Calcula el subtotal multiplicando el valor del libro por la cantidad
        })),
        valorEnvio: shippingValue,
        total: totalWithShipping,
      };

      const orderId = await addOrder(orderData); // Agregar la orden
      setOrderId(orderId); // Guardar el ID de la orden en el estado

      console.log('Orden agregada con ID:', orderId);

      setIsPaymentComplete(true);
    } else {
      throw new Error('No se pudo obtener el usuario actual');
    }
  } catch (error) {
    console.error('Error al agregar la orden:', error);
  }
};


  // Dentro de useEffect
  useEffect(() => {
    const fetchShippingValue = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (user) {
          const userData = await fetchUser(user.uid); // Obtener la información del usuario actual utilizando su UID
          if (userData && userData.department) {
            const department = await getDepartmentByName(userData.department);
            if (department && department.shippingValue) {
              setShippingValue(department.shippingValue);
            } else {
              throw new Error('No se pudo obtener el valor de envío del departamento');
            }
          } else {
            throw new Error('No se encontró el departamento asociado al usuario');
          }
        } else {
          throw new Error('No se pudo obtener el usuario actual');
        }
      } catch (error) {
        console.error('Error al obtener el valor del envío:', error);
      }
    };

    fetchShippingValue();
  }, []);

  useEffect(() => {
    // Actualiza el total a pagar cuando cambia el valor del envío o el carrito
    const total = cart.reduce((acc, item) => acc + item.value * item.quantity, 0); // Incluye la cantidad en el cálculo del total
    setTotalWithShipping(total + shippingValue);
  
    // Si el carrito está vacío, ocultar el formulario de pago
    if (cart.length === 0) {
      setIsPaymentVisible(false);
    }
  }, [cart, shippingValue]);
  
  const toggleCartView = () => {
    setIsCartVisible(!isCartVisible); // Actualiza el estado de visibilidad del carrito en el componente principal
  };
  
  const isPaymentValid = () => {
    // Verificar que el número de tarjeta tenga 16 dígitos
    if (paymentInfo.cardNumber.length !== 16) {
      return false;
    }

    // Verificar que la fecha de expiración tenga 5 caracteres en formato MM/YY
    if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      return false;
    }

    // Verificar que el CVV tenga al menos 3 dígitos
    if (paymentInfo.cvv.length < 3) {
      return false;
    }

    // Si todas las validaciones pasan, retornar true
    return true;
  };

  const handleInputChange = (e, itemId) => {
    const { name, value } = e.target;
  
    // Reiniciar las advertencias en cada cambio
    setCardNumberWarning('');
    setExpiryDateWarning('');
    setCvvWarning('');
  
    // Verificar si el cambio corresponde a la cantidad de un ítem en el carrito
    if (name === 'quantity') {
      // Verificar si el valor es un número válido y no está vacío, de lo contrario, establecerlo en 1
      const parsedValue = value.trim() !== '' && !isNaN(value) ? Math.max(parseInt(value), 1) : 1;
      const updatedCart = cart.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: parsedValue };
        }
        return item;
      });
      setCart(updatedCart);
    } if (name === 'quantity') {
        // Obtener el libro correspondiente al ID del ítem
        const selectedItem = cart.find(item => item.id === itemId);
        if (selectedItem) {
          // Validar que la cantidad ingresada sea un número válido y no esté vacía
          const parsedValue = value.trim() !== '' && !isNaN(value) ? parseInt(value) : 0;
          // Validar que la cantidad ingresada no supere el stock disponible
          const updatedQuantity = parsedValue > selectedItem.invCantStock ? selectedItem.invCantStock : parsedValue;
          // Actualizar la cantidad en el carrito
          const updatedCart = cart.map(item => {
            if (item.id === itemId) {
              return { ...item, quantity: updatedQuantity };
            }
            return item;
          });
          setCart(updatedCart);
        }
      } else {
      // Validar y formatear el número de tarjeta de crédito, fecha de expiración y CVV
      if (name === 'cardNumber') {
        const formattedValue = value
          .replace(/\D/g, '') // Eliminar caracteres no numéricos
          .slice(0, 16); // Limitar a 16 caracteres
        setPaymentInfo({ ...paymentInfo, [name]: formattedValue });
  
        // Mostrar advertencia si el número de tarjeta es menor que 16 dígitos
        if (formattedValue.length < 16) {
          setCardNumberWarning('El número de tarjeta debe tener 16 dígitos');
        }
      } else if (name === 'expiryDate') {
        const formattedValue = value
          .replace(/\D/g, '') // Eliminar caracteres no numéricos
          .slice(0, 4) // Limitar a 4 caracteres
          .replace(/(\d{2})(\d{2})/, '$1/$2'); // Agregar una barra después de los primeros dos caracteres
        setPaymentInfo({ ...paymentInfo, [name]: formattedValue });
  
        // Mostrar advertencia si la fecha de expiración no tiene 4 dígitos
        if (formattedValue.length < 4) {
          setExpiryDateWarning('La fecha de expiración debe tener el formato MM/YY');
        }
      } else if (name === 'cvv') {
        const formattedValue = value.replace(/\D/g, '').slice(0, 4); // Eliminar caracteres no numéricos y limitar a 4 caracteres
        setPaymentInfo({ ...paymentInfo, [name]: formattedValue });
  
        // Mostrar advertencia si el CVV tiene menos de 3 dígitos
        if (formattedValue.length < 3) {
          setCvvWarning('El CVV debe tener al menos 3 dígitos');
        }
      } else {
        setPaymentInfo({ ...paymentInfo, [name]: value });
      }
    }
  };
  

  const handlePayment = async () => {
    // Verificar si los detalles de la tarjeta son válidos
    if (!isPaymentValid()) {
      // Verificar y establecer advertencias si las validaciones fallan
      if (paymentInfo.cardNumber.length !== 16) {
        setCardNumberWarning('El número de tarjeta debe tener 16 dígitos');
      }
  
      if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
        setExpiryDateWarning('La fecha de expiración debe tener el formato MM/YY');
      }
  
      if (paymentInfo.cvv.length < 3) {
        setCvvWarning('El CVV debe tener al menos 3 dígitos');
      }
  
      return;
    }
  
    try {
      // Verificar si los detalles de la tarjeta coinciden con acceptedCard
      if (
        paymentInfo.cardNumber === acceptedCard.cardNumber &&
        paymentInfo.expiryDate === acceptedCard.expiryDate &&
        paymentInfo.cvv === acceptedCard.cvv
      ) {
        setIsPaymentComplete(true);
        window.alert('¡Pago aceptado!'); // Mostrar alerta de pago aceptado
      } 
      // Verificar si los detalles de la tarjeta coinciden con deniedCard
      else if (
        paymentInfo.cardNumber === deniedCard.cardNumber &&
        paymentInfo.expiryDate === deniedCard.expiryDate &&
        paymentInfo.cvv === deniedCard.cvv
      ) {
        window.alert('¡Pago denegado!'); // Mostrar alerta de pago denegado
      } 
      else {
        // Si los detalles de la tarjeta no coinciden con ninguno de los casos de prueba
        // Aquí puedes realizar la lógica para procesar el pago en un entorno real
        await handleAddOrder(); // Llama a la función para agregar una nueva orden
  
        // Actualizar el stock de los libros comprados
        for (const item of cart) {
          const updatedStock = item.invCantStock - item.quantity;
          await updateBookStock(item.id, updatedStock);
        }
  
        setIsPaymentComplete(true);
        window.alert('¡Pago exitoso!'); // Mostrar alerta del navegador
        setCart([]); // Vaciar el carrito después del pago exitoso
        // También puedes reiniciar los detalles de pago después de completar el pago
        // setPaymentInfo({ cardNumber: '', expiryDate: '', cvv: '' });
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      // Manejar el error adecuadamente, mostrar una alerta o mensaje al usuario, etc.
    }
  };
  

const handleGoToPayment = () => {
    setIsPaymentVisible(true);
  };
  
    return (
        <div className={`cart-view-container ${isCartVisible ? '' : 'hidden'}`}>
        <div className="carrito-cerrar-container">
            <button className="button button-primary" onClick={toggleCartView} >
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
            
        <h2>Carrito</h2>
        <div className="cart-items">
            {cart.map(item => (
            <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>Precio: {formatCurrency(item.value)}</p>
                <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, item.id)}
                    placeholder="Cantidad"
                    min="1" // Limitar la cantidad mínima a 1
                />
                <button onClick={() => handleRemoveFromCart(item.id)} className="remove-button">Eliminar</button>
                </div>
            </div>
            ))}
        </div>
        <div className="total-container">
        {totalWithShipping - shippingValue > 0 && !isPaymentComplete ? ( // Verifica si el total parcial es mayor que cero y el pago no está completo
  <>
    <div className="total-container">
      <p>Total parcial: {formatCurrency(totalWithShipping - shippingValue)}</p>
      <p>Valor del envío: {formatCurrency(shippingValue)}</p>
      <p>Total a pagar: {formatCurrency(totalWithShipping)}</p>
    </div>
    {!isPaymentComplete && ( // Verifica si el pago no está completo
      <div className="payment-actions">
        {/* Deshabilita el botón si la cantidad no es válida */}
        <button onClick={handleGoToPayment} className="checkout-button" disabled={!isQuantityValid}>
          Ir a pagar
        </button>
      </div>
    )}
  </>
) : (
  (cart.length === 0 && !isPaymentComplete) && <p>Carrito vacío</p> // Muestra "Carrito vacío" solo si el carrito está vacío y el pago no está completo
)}

            {isPaymentVisible && !isPaymentComplete && cart.length > 0 && (
            <div className="payment-form" style={{ display: isPaymentVisible && !isPaymentComplete && cart.length > 0 ? 'block' : 'none' }}>
                <h3>Información de pago</h3>
                <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="Número de tarjeta"
                maxLength="16" // Limitar la longitud máxima del campo
                />
                {cardNumberWarning && <p className="warning">{cardNumberWarning}</p>}
                <input
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={handleInputChange}
                placeholder="Fecha de expiración (MM/YY)"
                maxLength="5" // Limitar la longitud máxima del campo (MM/YY)
                />
                {expiryDateWarning && <p className="warning">{expiryDateWarning}</p>}
                <input
                type="text"
                name="cvv"
                value={            paymentInfo.cvv}
                onChange={handleInputChange}
                placeholder="CVV"
                maxLength="4" // Limitar la longitud máxima del campo
                />
                {cvvWarning && <p className="warning">{cvvWarning}</p>}
                <button onClick={handlePayment} className="checkout-button" disabled={cardNumberWarning || expiryDateWarning || cvvWarning}>
                    Pagar
                </button>
            </div>
            )}
            {isPaymentComplete && orderId && (
            <div className="payment-success">
                <p>¡Pago completado!</p>
                <Link to={`/order/${orderId}`} className="checkout-button">
                Ver detalles del pedido
                </Link>
            </div>
            )}
        </div>
        </div>
    );
  };
  
  export default CartView;
  