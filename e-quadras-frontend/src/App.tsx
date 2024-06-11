import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FirtScreen from './modules/firtScreen';
import LoginScreen from './modules/login';
import SportsCourt from './modules/sportsCourt';
import { GlobalProvider } from './shared/hooks/useGlobalContext';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirtScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/sports-court" element={<SportsCourt />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
