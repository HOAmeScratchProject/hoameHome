import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import './styles/directory.scss';
import './styles/announcements.scss';
import './styles/login.scss';
const root = createRoot(document.getElementById('root'));

root.render(<App />);
