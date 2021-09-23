import React, { useState, useCallback, useContext, useEffect } from 'react';
import { DateRangePicker } from '@abdt/ornament';
import ruLocale from 'date-fns/locale/ru';
import { DateRange } from '@material-ui/pickers/DateRangePicker/RangeTypes';
import AdapterDateFns from '@date-io/date-fns';
import { transformDate, defaultDates } from '@utils';
import { AppContext } from '@context/AppContext.Provider';
import { find, indexOf } from 'lodash';
import { Filter, DateRangeInterface } from '@models';

interface DateFilterProps {
    name: string | undefined;
}

const staticDateAdapter = new AdapterDateFns({ locale: ruLocale });

export const DateFilter: React.FC<DateFilterProps> = ({ name }) => {
    const { filters, setFilters } = useContext(AppContext);
    const maxDate = React.useRef(Date.now());
    const [dateRange, setDateRange] = useState<DateRangeInterface>({
        startDate: defaultDates.start.toString(),
        endDate: defaultDates.end.toString(),
    });

    const saveFilter = (start: Date | unknown, end: Date | unknown) => {
        const newArr = filters;
        let filter = find(newArr, { name });
        const index = indexOf(newArr, filter);
        if (filter) {
            filter = {
                ...(filter as Filter),
                date: {
                    startDate: transformDate(start as Date, 'start'),
                    endDate: transformDate(end as Date, 'end'),
                },
            };
            newArr[index] = filter;
        }

        setFilters(newArr);
    };

    const datePickerOnChange = useCallback(
        (date: DateRange<Date | unknown>) => {
            const [start, end] = date;
            if (start && end) {
                setDateRange({
                    startDate: transformDate(start as Date, 'start'),
                    endDate: transformDate(end as Date, 'end'),
                });

                saveFilter(start as Date, end as Date);
            }
        },
        [dateRange]
    );

    const fieldValue = () => {
        return find(filters, ['name', name])?.date;
    };

    useEffect(() => {
        if (!fieldValue()) {
            saveFilter(
                defaultDates.start.toJSDate(),
                defaultDates.end.toJSDate()
            );
        }
    }, []);

    return (
        <DateRangePicker
            startText="Дата (с)"
            endText="Дата (по)"
            value={[
                fieldValue()?.startDate || dateRange.startDate,
                fieldValue()?.endDate || dateRange.endDate,
            ]}
            maxDate={maxDate}
            onChange={datePickerOnChange}
            dateAdapter={staticDateAdapter as any}
        />
    );
};

export default DateFilter;
