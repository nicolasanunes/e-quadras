import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginScreen from './modules/login';
import CreateSportsCourt from './pages/sportsCourt/CreateSportsCourt';
import { GlobalProvider } from './shared/hooks/useGlobalContext';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateSportsCourt />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
