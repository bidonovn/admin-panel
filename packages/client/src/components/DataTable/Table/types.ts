export interface TableColumnFromProps {
    field: string;
    headerName: string;
    type?: 'date' | 'number' | 'string';
    hide: boolean;
}

export interface TableRowFromProps {
    id: string | number;
    [key: string]: string | number | Date | null | undefined;
}

export interface TableCell extends TableColumnFromProps {
    value: string | number;
}

export interface TableRow {
    id: TableRowFromProps['id'];
    cells: TableCell[];
}

export interface FilterState {
    order: 'asc' | 'desc';
    orderBy: string;
    hidedColumns: string[];
}
