import { useState, useEffect } from 'react';
import api from '../services/api';
import { useTableSort } from '../hooks/useTableSort';
import DataTable, { type Column } from '../components/DataTable';


interface Cliente {
    id: number;
    nome: string;
}

interface Pombo {
    id: number;
    apelido: string;
    ativo: boolean;
}

interface Carta {
    id: number;
    conteudo: string;
    remetenteId: number;
    nomeDestinatario: string;
    enderecoDestinatario: string;
    pomboId: number;
    criada: string;
    atualizada: string;
    status: string;
}

interface CartaFormData {
    conteudo: string;
    nomeDestinatario: string;
    enderecoDestinatario: string;
    remetenteId: string;
    pomboId: string;
}

function CartasPage() {
    const [cartas, setCartas] = useState<Carta[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [pombos, setPombos] = useState<Pombo[]>([]);

    const [formData, setFormData] = useState<CartaFormData>({
        conteudo: '',
        nomeDestinatario: '',
        enderecoDestinatario: '',
        remetenteId: '',
        pomboId: '',
    });

    const colunasCartas: Column<Carta>[] = [
        { header: 'Remetente', accessor: 'remetenteId', render: (item) => getNomeCliente(item.remetenteId) },
        { header: 'Destinatário', accessor: 'nomeDestinatario' },
        { header: 'Pombo', accessor: 'pomboId', render: (item) => getNomePombo(item.pomboId) },
        {
            header: 'Postagem',
            accessor: 'criada',
            render: (item) => new Date(item.criada).toLocaleString('pt-BR', { timeZone: 'UTC' })
        },
        {
            header: 'Última Atualização',
            accessor: 'atualizada',
            render: (item) => new Date(item.atualizada).toLocaleString('pt-BR', { timeZone: 'UTC' })
        },
        { header: 'Status', accessor: 'status', },
        {
            header: 'Modificar status',
            accessor: 'id',
            render: (item) => (
                <select
                    value={item.status}
                    disabled={item.status === 'ENTREGUE'}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                >
                    <option value="NA_FILA">Na Fila</option>
                    <option value="ENVIADO">Enviado</option>
                    <option value="ENTREGUE">Entregue</option>
                    <option value="REQUER_ATENCAO">Requer Atenção</option>
                </select>
            ),
        },
    ];

    const { sortedData } = useTableSort(cartas, 'id');

    const fetchData = async () => {
        try {
            const [cartasRes, clientesRes, pombosRes] = await Promise.all([
                api.get<Carta[]>('/cartas'),
                api.get<Cliente[]>('/clientes'),
                api.get<Pombo[]>('/pombos')
            ]);
            setCartas(cartasRes.data);
            setClientes(clientesRes.data);
            setPombos(pombosRes.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formData.remetenteId || !formData.pomboId) {
            alert('Por favor, selecione um remetente e um pombo.');
            return;
        }
        try {
            const dataToSend = {
                ...formData,
                remetenteId: parseInt(formData.remetenteId, 10),
                pomboId: parseInt(formData.pomboId, 10),
            };
            await api.post<Carta[]>('/cartas', dataToSend);
            fetchData();
            setFormData({
                conteudo: '',
                nomeDestinatario: '',
                enderecoDestinatario: '',
                remetenteId: '',
                pomboId: '',
            });
        } catch (error) {
            console.error("Erro ao cadastrar carta:", error);
            alert("Erro ao cadastrar carta. Verifique o console.");
        }
    };

    const getNomeCliente = (id: number) => clientes.find(c => c.id === id)?.nome || 'Desconhecido';
    const getNomePombo = (id: number) => pombos.find(p => p.id === id)?.apelido || 'Desconhecido';

    const handleStatusChange = async (cartaId: number, novoStatus: string) => {
        if (novoStatus === 'ENTREGUE') {
            const confirmado = window.confirm(
                "Tem certeza que deseja marcar esta carta como 'Entregue'? Esta ação não poderá ser desfeita."
            );
            if (!confirmado) {
                fetchData();
                return;
            }
        }

        try {
            await api.patch(`/cartas/${cartaId}`, { status: novoStatus });
            fetchData();
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            alert('Falha ao atualizar o status. Se a carta já foi entregue, não pode ser alterada.');
        }
    };

    return (
        <div>
            <h2>Gerenciamento de Cartas</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
                <h3>Cadastrar Nova Carta</h3>
                <div>
                    <select name="remetenteId" value={formData.remetenteId} onChange={handleInputChange} required>
                        <option value="">Selecione o Remetente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select name="pomboId" value={formData.pomboId} onChange={handleInputChange} required>
                        <option value="">Selecione o Pombo</option>
                        {pombos.filter(pombo => pombo.ativo).map(pombo => (
                            <option key={pombo.id} value={pombo.id}>{pombo.apelido}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input type="text" name="nomeDestinatario" placeholder="Nome do Destinatário" value={formData.nomeDestinatario} onChange={handleInputChange} required />
                </div>
                <div>
                    <input type="text" name="enderecoDestinatario" placeholder="Endereço do Destinatário" value={formData.enderecoDestinatario} onChange={handleInputChange} required />
                </div>
                <div>
                    <textarea name="conteudo" placeholder="Conteúdo da mensagem" value={formData.conteudo} onChange={handleInputChange} required />
                </div>
                <button type="submit">Cadastrar Carta</button>
            </form>

            <hr />

            <h3>Cartas Enviadas</h3>
            <DataTable data={sortedData} columns={colunasCartas} />
        </div>
    );
}

export default CartasPage;