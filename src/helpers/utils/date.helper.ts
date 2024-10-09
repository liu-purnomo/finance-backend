export class DateHelper {
    static getFirstDayOfWeek(date: Date, firstDayOfWeek: string): Date {
        const daysOfWeek = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        const currentDayIndex = date.getDay();
        const targetDayIndex = daysOfWeek.indexOf(firstDayOfWeek);
        const diff =
            currentDayIndex < targetDayIndex
                ? 7 - (targetDayIndex - currentDayIndex)
                : currentDayIndex - targetDayIndex;

        const firstDay = new Date(date);
        firstDay.setDate(date.getDate() - diff);
        return firstDay;
    }

    static getMonthFromName(monthName: string): number {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        return months.indexOf(monthName);
    }
}
