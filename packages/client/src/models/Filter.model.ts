import { HeadCell } from '@models';

export interface DateRangeInterface {
    startDate: string;
    endDate: string;
}

export interface Filter extends HeadCell {
    value?: string;
    date?: DateRangeInterface;
}
