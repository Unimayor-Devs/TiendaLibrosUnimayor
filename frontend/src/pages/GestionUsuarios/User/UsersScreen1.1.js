import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody } from 'reactstrap';
import { useNavigate  } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

import '../Users.css';
import { ImBin,ImPencil  } from 'react-icons/im';
import { RiAccountCircleFill } from "react-icons/ri";
import { FaUser, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const UsersScreen = () => {
  const [usuarioList, setUsersData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const db = getFirestore();
  const history = useNavigate();

  const fetchUsersData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsersData(usersData);
    } catch (error) {
      console.error('Error al obtener datos de usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [db]);
//modificar 
  const handleFirstButtonClick = (row) => {

    history(`/EditUserScreen/${row.userId}`, { state: { userData: row } });
  };
 
//eliminar
  const handleSecondButtonClick = (row) => {
    
    setSelectedUser(row);
    toggleModal();
  };

  const toggleModal_eliminar=()=>{
    const updatedUsers = usuarioList.filter(user => user.userId !== selectedUser.userId);
    setUsersData(updatedUsers);
    toggleModal();
  }



  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const columns = [
    { name: "ID", selector: row => row.userId },
    { name: "Name", selector: row => row.firstName },
    { name: "Last Name", selector: row => row.lastName },
    { name: "Email", selector: row => row.email },
    { name: "Telephone", selector: row => row.phoneNumber },
    { name: "City", selector: row => row.city },
    { name: "Departament", selector: row => row.department },
    {
      name: "Options",
      cell: row => (
        <div>
          <button onClick={() => handleFirstButtonClick(row)}><ImPencil /></button>
          
          <button  onClick={() => handleSecondButtonClick(row)} > <ImBin /></button>
        </div>
      )
    }
  ];

  return (
    <div className="form-container">
       <Navbar/> {/* Renderiza la barra de navegación */}
      <h2>usuario</h2>
  
      <ul>
      
      <button className='btnperfil' > <FaUser /></button>
   
                
      </ul>
      <DataTable
        columns={columns}
        data={usuarioList}
        customStyles={{
          headCells: {
            style: {
              backgroundColor: 'rgba(140, 103, 81, 1)', /* Color de encabezado */
              color: 'white',
            },
          },
          rows: {
            style: {
              '&:nth-child(odd)': {
                backgroundColor: '#f2f2f2', /* Color para filas pares */
              },
              '&:hover': {
                backgroundColor: '#ddd', /* Color al pasar el cursor por encima */
              },
            },
          },
        }}
      
      />

      
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalBody>
          <h5> "Se ha eliminado el usuario " ({selectedUser?.firstName})</h5>
        </ModalBody>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem' }}>
          <Button color="primary" onClick={toggleModal_eliminar}>Aceptar</Button>
          <Button color="secondary"  onClick={toggleModal}>Cancelar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default UsersScreen;
