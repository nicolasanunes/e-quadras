import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/login/Login';
import CreateSportsCourt from './pages/sportsCourt/CreateSportsCourt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sports-court" element={<CreateSportsCourt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
