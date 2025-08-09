import { useTableSort } from '../hooks/useTableSort';
import DataTable, { type Column } from '../components/DataTable';
import { useEntityManagement } from '../hooks/useEntityManagement';
import { useState } from 'react';

interface Pombo {
    id: number;
    apelido: string;
    velocidadeMedia: number;
    fotoUrl?: string;
    ativo: boolean;
}

interface CreatePomboDto { apelido: string; velocidadeMedia: string; }


function PombosPage() {
    const initialCreateState = { apelido: '', velocidadeMedia: '' };

    const [foto, setFoto] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFoto(event.target.files ? event.target.files[0] : null);
    };

    const handleSubmitCriacao = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createItem(createFormData, foto);
            setFoto(null);
        } catch (error) {
            alert("Falha ao cadastrar pombo. Verifique o console.");
        }
    };

    const colunasPombos: Column<Pombo>[] = [

        {
            header: 'Foto',
            accessor: 'fotoUrl',
            render: (item) => {
                if (item.fotoUrl) {
                    return (
                        <img
                            src={`http://localhost:3000${item.fotoUrl}`}
                            alt={`Foto do pombo ${item.apelido}`}
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                    );
                }
                return 'Sem foto';
            },
        },
        { header: 'Apelido', accessor: 'apelido' },
        { header: 'Velocidade Média', accessor: 'velocidadeMedia' },
        {
            header: 'Status',
            accessor: 'ativo',
            render: (item) => (item.ativo ? 'Ativo' : 'Aposentado')
        },
        {
            header: 'Ações',
            accessor: 'id',
            render: (item) => (
                <div>
                    <button onClick={() => handleEditClick(item)}>Editar</button>
                </div>
            )
        },
    ];

    const {
        items: pombos,
        createFormData,
        entityInEdit: pomboEmEdicao,
        handleCreateFormChange,
        createItem,
        handleEditClick,
        handleEditFormChange,
        handleEditSubmit,
        cancelEdit,
    } = useEntityManagement<Pombo, CreatePomboDto>('/pombos', initialCreateState);

    const { sortedData } = useTableSort(pombos, 'id');

    return (
        <div>
            <h2>Gerenciamento de Pombos</h2>

            <form onSubmit={handleSubmitCriacao}>
                <h3>Cadastrar Novo Pombo</h3>
                <input name="apelido" value={createFormData.apelido} placeholder="Apelido" onChange={handleCreateFormChange} />
                <input name="velocidadeMedia" value={createFormData.velocidadeMedia} placeholder="Velocidade Média" onChange={handleCreateFormChange} />
                <label>Foto (opcional):</label>
                <input
                    type="file"
                    name="foto"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                />
                <button type="submit">Cadastrar</button>
            </form>

            <h3>Pombos Atuais</h3>
            <DataTable data={sortedData} columns={colunasPombos} />

            {pomboEmEdicao && (
                <form onSubmit={handleEditSubmit}>
                    <input name="apelido" value={pomboEmEdicao.apelido} onChange={handleEditFormChange} />
                    <input name="velocidadeMedia" value={pomboEmEdicao.velocidadeMedia} onChange={handleEditFormChange} />
                    <select name="ativo" value={String(pomboEmEdicao.ativo)} onChange={handleEditFormChange}>
                        <option value="true">Ativo</option>
                        <option value="false">Aposentado</option>
                    </select>
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={cancelEdit}>Cancelar</button>
                </form>
            )}
        </div>
    );
}

export default PombosPage;