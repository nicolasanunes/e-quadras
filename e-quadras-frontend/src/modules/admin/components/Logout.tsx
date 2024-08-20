import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    // Limpa o token de autenticação
    localStorage.removeItem('AUTHORIZATION_KEY');

    // Redireciona para a página de login
    navigate('/login');

    // Atualiza o estado para refletir que o usuário foi desconectado
    setLoggedOut(true);
  };

  useEffect(() => {
    // Verifica se o usuário está logado ao montar o componente
    if (localStorage.getItem('AUTHORIZATION_KEY')) {
      setLoggedOut(false);
    } else {
      setLoggedOut(true);
    }
  }, []);

  return (
    <div>
      {loggedOut ? (
        <p>Você foi desconectado com sucesso!</p>
      ) : (
        <a
          href="#"
          onClick={handleLogout}
          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
        >
          Logout
        </a>
      )}
    </div>
  );
};

export default Logout;
