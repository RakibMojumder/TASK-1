
import { RouterProvider } from 'react-router-dom';
import './App.css';
import AuthProvider from './contexts/AuthProvider';
import router from './routes/routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen font-pt bg-slate-900 text-white relative">
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
      <Toaster position='top-right' />
    </div>
  );
}

export default App;
