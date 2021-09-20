import React, { useState } from 'react';
import { useAxios } from '@axios/config';
import { Table, TableColumnFromProps } from './Table';

export const DataTable: React.FC = () => {
    const [query, setQuery] = useState({});
    const [{ data, loading, error }, refetch] = useAxios({
        url: '/api/transactions/list',
        method: 'POST',
        data: { query },
    });

    const columns = [
        { field: 'id', headerName: 'ID' },
        {
            field: 'firstName',
            headerName: 'Имя',
        },
        {
            field: 'lastName',
            headerName: 'Фамилия',
        },
        {
            field: 'age',
            headerName: 'Возраст',
            type: 'number',
        },
        {
            field: 'fullName',
            headerName: 'Полное имя',
        },
    ] as TableColumnFromProps[];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    return (
        <Table rows={rows} columns={columns} title="Какая то таблица"></Table>
    );
};

export default DataTable;
