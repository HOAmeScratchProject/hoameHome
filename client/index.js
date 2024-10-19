import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App';
import './styles/main.scss';
import './styles/directory.scss';
import './styles/announcements.scss';
import './styles/login.scss';
import './styles/dashboard.scss';
import './styles/documents.scss';
const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    {/* Wrap your App in BrowserRouter */}
    <App />
  </BrowserRouter>
);