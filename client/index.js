import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import './styles/directory.scss'
import './styles/announcments.scss'
const root = createRoot(document.getElementById('root'));

root.render(<App />);
