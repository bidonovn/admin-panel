import { Transaction } from './index';

export interface HeadCell {
    name: keyof Transaction;
    label: string;
    isActive: boolean;
}

export type Order = 'asc' | 'desc';
