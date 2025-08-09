import './App.css';
import { useState } from 'react';
import PombosPage from './pages/PombosPage';
import ClientesPage from './pages/ClientesPage';
import CartasPage from './pages/CartasPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('pombos');

  return (
    <div className="App">
      <h1>Pombo Express</h1>

      <nav>
        <button onClick={() => setPaginaAtual('pombos')}>
          Gerenciar Pombos
        </button>
        <button onClick={() => setPaginaAtual('clientes')}>
          Gerenciar Clientes
        </button>
        <button onClick={() => setPaginaAtual('cartas')}>
          Envio de Cartas
        </button>
        <button onClick={() => setPaginaAtual('dashboard')}>
          Dashboard
        </button>
      </nav>
      <hr />

      {paginaAtual === 'pombos' && <PombosPage />}
      {paginaAtual === 'clientes' && <ClientesPage />}
      {paginaAtual === 'cartas' && <CartasPage />}
      {paginaAtual === 'dashboard' && <DashboardPage />}
    </div>
  );
}

export default App;