import { Routes, Route } from 'react-router-dom';
import { GroupsPage } from './pages/GroupsPage';
import 'normalize.css';

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Routes>
        <Route path="/" element={<GroupsPage />} />
      </Routes>
    </div>
  );
}