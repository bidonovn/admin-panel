import { Transaction } from './index';

export interface CellOptions {
    label: string;
    value: any;
}

export interface HeadCell {
    /** Имя поля */
    name: keyof Transaction;
    /** Лейбл поля на кириллице */
    label: string;
    /** Признак активности (скрыто/не скрыто) */
    isActive: boolean;
    /** Тип фильтрации по данному полю */
    filterType: 'text' | 'date' | 'enum' | 'number';
    /** Варианты для выпадающего списка (если filterType = enum) */
    options?: CellOptions[];
}

export type Order = 'asc' | 'desc';
