import { HeadCell } from 'models';

export interface Filter extends HeadCell {
    value?: string;
    date?: { startDate: string; endDate: string };
}

export interface DateRangeInterface {
    startDate: string;
    endDate: string;
}
