export class DateHelper {
    /**
     * Get the first day of the week based on a given date and the name of the first day of the week.
     * For example, if the first day of the week is 'Monday' and the current date is Wednesday, this method will return the date for the previous Monday.
     *
     * @param {Date} date - The current date from which the week calculation starts.
     * @param {string} firstDayOfWeek - The name of the first day of the week ('Sunday', 'Monday', etc.).
     * @returns {Date} - The date representing the first day of the week.
     *
     * Example:
     * ```typescript
     * const currentDate = new Date(); // Assume today is 'Wednesday, October 9th, 2024'
     * const firstDayOfWeek = 'Monday';
     * const firstDay = DateHelper.getFirstDayOfWeek(currentDate, firstDayOfWeek);
     * console.log(firstDay); // Outputs the date of the previous Monday
     * ```
     */
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
        const currentDayIndex = date.getDay(); // Get the index of the current day (0 = Sunday, 1 = Monday, etc.)
        const targetDayIndex = daysOfWeek.indexOf(firstDayOfWeek); // Find the index of the specified first day of the week
        const diff =
            currentDayIndex < targetDayIndex
                ? 7 - (targetDayIndex - currentDayIndex) // Calculate how far back the first day is from the current day
                : currentDayIndex - targetDayIndex; // If the target day is before the current day in the week

        const firstDay = new Date(date);
        firstDay.setDate(date.getDate() - diff); // Adjust the date to the first day of the week
        return firstDay;
    }

    /**
     * Get the index of the month from its name (0-based, January = 0, December = 11).
     *
     * @param {string} monthName - The full name of the month (e.g., 'January', 'February').
     * @returns {number} - The index of the month (0 for January, 11 for December). Returns -1 if the month name is invalid.
     *
     * Example:
     * ```typescript
     * const monthIndex = DateHelper.getMonthFromName('February');
     * console.log(monthIndex); // Outputs: 1 (February is the 2nd month, but it's 0-based)
     * ```
     */
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
        return months.indexOf(monthName); // Return the index of the month, or -1 if not found
    }
}
