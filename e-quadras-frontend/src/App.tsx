import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginScreen from './modules/login';
import CreateSportsCourt from './pages/sportsCourt/CreateSportsCourt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateSportsCourt />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
