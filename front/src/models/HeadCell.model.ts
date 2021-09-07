import { Transaction } from './index';

export interface HeadCell {
    name: keyof Transaction;
    label: string;
}

export type Order = 'asc' | 'desc';
