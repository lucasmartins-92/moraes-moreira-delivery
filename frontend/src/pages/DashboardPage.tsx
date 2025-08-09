import { useState, useEffect } from 'react';
import api from '../services/api';

interface TopPombo {
  nome: string;
  entregas: number;
}

interface TopCliente {
  nome: string;
  cartasEnviadas: number;
}

interface StatusOverview {
  status: string;
  _count: { status: number };
}

interface DashboardData {
  topPombos: TopPombo[];
  statusOverview: StatusOverview[];
  topClientes: TopCliente[];
}

function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<DashboardData>('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <p>Carregando estatísticas...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3>Pombos Mais Ativos (Top 5)</h3>
          <ol>
            {data.topPombos.map((pombo) => (
              <li key={pombo.nome}>
                {pombo.nome}: <strong>{pombo.entregas}</strong> entregas concluídas
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3>Resumo de Status das Cartas</h3>
          <ul>
            {data.statusOverview.map((item) => (
              <li key={item.status}>
                {item.status}: <strong>{item._count.status}</strong> cartas
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Clientes Mais Engajados (Top 5)</h3>
          <ol>
            {data.topClientes.map((cliente) => (
              <li key={cliente.nome}>
                {cliente.nome}: <strong>{cliente.cartasEnviadas}</strong> cartas enviadas
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;