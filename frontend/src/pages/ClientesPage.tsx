import { useState, useEffect } from 'react';
import api from '../services/api';
import { useTableSort } from '../hooks/useTableSort';
import DataTable, { type Column } from '../components/DataTable';


interface Cliente {
    id: number;
    nome: string;
    email: string;
    dataNascimento: string;
    endereco: string;
}

interface ClienteFormData {
    nome: string;
    email: string;
    dataNascimento: string;
    endereco: string;
}

function ClientesPage() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [createFormData, setCreateFormData] = useState<ClienteFormData>({
        nome: '',
        email: '',
        dataNascimento: new Date().toISOString().split('T')[0],
        endereco: ''
    });

    const { sortedData } = useTableSort(clientes, 'id');

    const [clienteEmEdicao, setClienteEmEdicao] = useState<Cliente | null>(null);

    const fetchClientes = async () => {
        try {
            const response = await api.get<Cliente[]>('/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleCreateFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCreateFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditClick = (cliente: Cliente) => {
        setClienteEmEdicao(cliente);
    };

    const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await api.post<Cliente[]>('/clientes', {
                ...createFormData,
                dataNascimento: new Date(createFormData.dataNascimento).toISOString(),
            });
            setCreateFormData({
                nome: '',
                email: '',
                dataNascimento: new Date().toISOString().split('T')[0],
                endereco: ''
            });
            fetchClientes();
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
        }
    };

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!clienteEmEdicao) return;
        const { name, value } = event.target;
        setClienteEmEdicao(prev => ({
            ...prev!,
            [name]: value,
        }));
    };

    const handleEditarSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (clienteEmEdicao) {
            try {
                await api.patch(`/clientes/${clienteEmEdicao.id}`, {
                    nome: clienteEmEdicao.nome,
                    email: clienteEmEdicao.email,
                    dataNascimento: new Date(clienteEmEdicao.dataNascimento).toISOString(),
                    endereco: clienteEmEdicao.endereco
                });
                setClienteEmEdicao(null);
                fetchClientes();
            } catch (error) {
                console.error("Erro ao editar cliente:", error);
            }
        }
    };

    const colunasClientes: Column<Cliente>[] = [
        { header: 'Nome', accessor: 'nome' },
        { header: 'Email', accessor: 'email' },
        {
            header: 'Data de Nascimento',
            accessor: 'dataNascimento',
            render: (item) => new Date(item.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        },
        { header: 'Endereço', accessor: 'endereco' },
        {
            header: '',
            accessor: 'id',
            render: (item) => (
                <button onClick={() => handleEditClick(item)}>Editar Cliente</button>
            ),
        },
    ];

    return (
        <div>
            <h2>Gerenciamento de Clientes</h2>

            <form onSubmit={handleCreateSubmit}>
                <h3>Cadastrar Novo Cliente</h3>
                <input
                    id="nomeNew"
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={createFormData.nome}
                    onChange={handleCreateFormChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={createFormData.email}
                    onChange={handleCreateFormChange}
                    required
                />
                <input
                    type="date"
                    name="dataNascimento"
                    placeholder="Data de Nascimento"
                    value={createFormData.dataNascimento}
                    onChange={handleCreateFormChange}
                    required
                />
                <input
                    type="text"
                    name="endereco"
                    placeholder="Endereço"
                    value={createFormData.endereco}
                    onChange={handleCreateFormChange}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>

            <h3>Clientes Atuais</h3>
            <DataTable data={sortedData} columns={colunasClientes} />

            {clienteEmEdicao && (
                <form onSubmit={handleEditarSubmit}>
                    <h3>Editar Cliente</h3>
                    <label>  Nome:  </label>
                    <input
                        id="nomeEdit"
                        type="text"
                        name="nome"
                        value={clienteEmEdicao.nome}
                        onChange={handleEditFormChange}
                        required
                    />
                    <label>  Email:  </label>
                    <input
                        type="email"
                        name="email"
                        value={clienteEmEdicao.email}
                        onChange={handleEditFormChange}
                        required
                    />
                    <label>  Data de nascimento:  </label>
                    <input
                        type="date"
                        name="dataNascimento"
                        value={clienteEmEdicao.dataNascimento}
                        onChange={handleEditFormChange}
                        required
                    />
                    <label>  Endereço:  </label>
                    <input
                        type="text"
                        name="endereco"
                        value={clienteEmEdicao.endereco}
                        onChange={handleEditFormChange}
                        required
                    />
                    <button type="submit">Salvar Edições</button>
                    <button type="button" onClick={() => setClienteEmEdicao(null)}>Cancelar</button>
                </form>
            )}
        </div>
    );
}

export default ClientesPage;