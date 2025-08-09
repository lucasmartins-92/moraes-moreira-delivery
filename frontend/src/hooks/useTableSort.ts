import { useState, useMemo } from 'react';

export function useTableSort<Tabela>(items: Tabela[], initialSortKey: keyof Tabela) {

    const [sortKey, setSortKey] = useState<keyof Tabela>(initialSortKey);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const sortedData = useMemo(() => {
        if (!sortKey) return items;

        const sortableItems = [...items];
        sortableItems.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];

            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return aValue - bValue;
            }
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.localeCompare(bValue);
            }
            return String(aValue).localeCompare(String(bValue));
        });

        if (sortDirection === 'desc') {
            return sortableItems.reverse();
        }
        return sortableItems;
    }, [items, sortKey, sortDirection]);

    const handleSort = (key: keyof Tabela) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc');
        }
    };

    return { sortedData, handleSort, sortKey, sortDirection };
}