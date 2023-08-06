import { createRoot } from 'react-dom/client';
import { Dashboard } from './components/Dashboard';

const elementToBind = document.getElementById('popupApp')

if (!!elementToBind){
    // Render your React component instead
    const root = createRoot(elementToBind);
    root.render(<Dashboard/>);
}