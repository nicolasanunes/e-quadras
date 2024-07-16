import { useState } from 'react';
import Modal from 'react-modal';

import { URL_SPORTS_COURT } from '../../../shared/constants/urls';
import useRequest from '../../../shared/hooks/useRequest';

const CreateSportsCourtModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postRequest } = useRequest();
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
    });
  };

  const handleSubmit = (e) => {
    console.log('chmaou');
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);

    postRequest(URL_SPORTS_COURT, formDataObj);
    resetForm();
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>Criar Quadra</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 20,
            borderRadius: 10,
          },
        }}
        contentLabel="My Modal"
      >
        <h2>Criar Quadra</h2>
        <form onSubmit={handleSubmit}>
          <p>Nome:</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Digite o nome da quadra"
          />
          <button type="submit">Criar</button>
        </form>
        <button onClick={handleClose}>Close</button>
      </Modal>
    </div>
  );
};

export default CreateSportsCourtModal;
