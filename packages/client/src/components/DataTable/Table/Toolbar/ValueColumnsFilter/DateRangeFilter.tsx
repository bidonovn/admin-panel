import React, { useState, useCallback, useEffect } from 'react';
import { DateRangePicker, DateRangePickerProps } from '@abdt/ornament';
import ruLocale from 'date-fns/locale/ru';
import AdapterDateFns from '@date-io/date-fns';
import { transformDate, defaultDates } from '@utils';
import { isEqual } from 'lodash';
import { DateRange } from '../../types';

interface DateRangeFilterProps {
    value?: DateRange;
    onChange: (date: DateRange) => void;
}

const staticDateAdapter = new AdapterDateFns({ locale: ruLocale });

const DateRangeFilterComponent: React.FC<DateRangeFilterProps> = ({
    value,
    onChange,
}) => {
    const [dateRange, setDateRange] = useState<DateRange>({
        start: defaultDates.start.toString(),
        end: defaultDates.end.toString(),
    });

    const maxDate = React.useRef(Date.now());

    const datePickerOnChange: DateRangePickerProps['onChange'] = useCallback(
        (date) => {
            const [start, end] = date;

            if (start && end) {
                setDateRange({
                    start: transformDate(start as Date, 'start'),
                    end: transformDate(end as Date, 'end'),
                });
            }
        },
        [dateRange]
    );

    useEffect(() => {
        onChange(dateRange);
    }, [dateRange]);

    return (
        <DateRangePicker
            startText="Дата (с)"
            endText="Дата (по)"
            value={[
                value?.start || dateRange?.start,
                value?.end || dateRange?.end,
            ]}
            maxDate={maxDate}
            onChange={datePickerOnChange}
            dateAdapter={staticDateAdapter as any}
        />
    );
};

export const DateRangeFilter = React.memo(DateRangeFilterComponent, isEqual);
