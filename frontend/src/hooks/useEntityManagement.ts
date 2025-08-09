import { useState, useEffect } from 'react';
import api from '../services/api';

export function useEntityManagement<EntityType extends { id: number }, CreateDto>(
    endpoint: string,
    initialCreateFormState: CreateDto
) {
    const [items, setItems] = useState<EntityType[]>([]);
    const [entityInEdit, setEntityInEdit] = useState<EntityType | null>(null);
    const [createFormData, setCreateFormData] = useState<CreateDto>(initialCreateFormState);

    const fetchData = async () => {
        try {
            const response = await api.get<EntityType[]>(endpoint);
            setItems(response.data);
        } catch (error) {
            console.error(`Erro ao buscar dados de ${endpoint}:`, error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    const handleCreateFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreateFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const createItem = async (data: CreateDto, foto?: File | null) => {
        try {
            if (foto) {
                const formDataToSend = new FormData();
                for (const key in data) {
                    formDataToSend.append(key, data[key as keyof CreateDto] as string);
                }
                formDataToSend.append('foto', foto);

                await api.post(endpoint, formDataToSend);
            } else {
                await api.post(endpoint, data);
            }

            setCreateFormData(initialCreateFormState);
            fetchData();
        } catch (error) {
            console.error(`Erro ao criar item em ${endpoint}:`, error);
            throw error;
        }
    };

    const handleEditClick = (entity: EntityType) => {
        setEntityInEdit(entity);
    };

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!entityInEdit) return;
        const { name, value } = event.target;
        setEntityInEdit(prev => ({
            ...prev!,
            [name]: name === 'ativo' ? value === 'true' : value,
        }));
    };

    const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (entityInEdit) {
            try {
                const { id, ...dataToUpdate } = entityInEdit;
                const dataToSend = {
                    ...dataToUpdate,
                    velocidadeMedia: parseFloat(dataToUpdate.velocidadeMedia),
                };
                await api.patch(`${endpoint}/${id}`, dataToSend);
                setEntityInEdit(null);
                fetchData();
            } catch (error) {
                console.error(`Erro ao editar item em ${endpoint}/${entityInEdit.id}:`, error);
            }
        }
    };

    const cancelEdit = () => {
        setEntityInEdit(null);
    };

    return {
        items,
        createFormData,
        entityInEdit,
        handleCreateFormChange,
        createItem,
        handleEditClick,
        handleEditFormChange,
        handleEditSubmit,
        cancelEdit,
    };
}