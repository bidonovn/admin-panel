export enum ColumnValueType {
    string = 'string',
    date = 'date',
    number = 'number',
}

export interface DateRange {
    start: string;
    end: string;
}

export interface TableColumnFromProps {
    field: string;
    headerName: string;
    type?: keyof typeof ColumnValueType;
    hide: boolean;
}

export interface TableRowFromProps {
    id: string | number;
    [key: string]: string | number | Date | null | undefined;
}

export interface TableCell extends TableColumnFromProps {
    /** Значение колонки */
    value: string | number;
}

export interface TableRow {
    /** id */
    id: TableRowFromProps['id'];
    /** Список содержащихся колонок */
    cells: TableCell[];
}

export interface FilterItem {
    /** Поле */
    field: string;
    /** id */
    id: string;
    /** Текстовое название отображаемое в шапке */
    headerName: string;
    /** Тип значения */
    type?: keyof typeof ColumnValueType;
    /** Значение */
    value: string | number | Date | DateRange | null;
}

export interface TableState {
    /** Вариант сортировки */
    order: 'asc' | 'desc';
    /** Колонка по которой производится сортировка */
    orderBy: string;
    /** Список скрытых колонок */
    hidedColumns: string[];
    /** Список фильтров */
    filters: FilterItem[];
    /** Текущая страница */
    currentPage: number;
    /** Строк на странице */
    rowsPerPage: number;
}

export interface TableProps {
    /** Callback вызываемый при изменении состояния таблицы */
    onChangeTableState?: (state: TableState) => void;
    /** Сallback вызываемый при клике на строку */
    onRowClick?: (row: TableRow) => void;
    /** Модель колнок */
    columns: TableColumnFromProps[];
    /** Модель строк */
    rows: TableRowFromProps[];
    /** Количество страниц */
    pagesCount: number;
    /** Текущая страница */
    currentPage: number;
    /** Элементов на странице */
    rowsPerPage?: number;
    /** Список возможных элементов на странцие [1, 10, 110] */
    rowsPerPageOptions?: number[];
    /** Общее количество элементов */
    totalItemsCount: number;
    /** Признак загрузки */
    loading?: boolean;
    /** Текст ошибки */
    error?: string;
    /** Название таблицы */
    title?: string;
}
