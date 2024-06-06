import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginScreen from './modules/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
