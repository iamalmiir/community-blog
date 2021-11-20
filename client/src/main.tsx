import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './components/screen/Register';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<About />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
