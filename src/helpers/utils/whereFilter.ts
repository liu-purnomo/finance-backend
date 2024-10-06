import { Op } from 'sequelize';

// Define interface for the properties used in the where filter
export interface IWhereFilterProps {
    search: string | undefined | null; // Search string
    dataToFilter: { [key: string]: string | undefined | null }; // Object containing key-value pairs for filtering
}

// Function to normalize the search string
export const normalizeSearchString = (search: string): string => {
    return `%${search.replace(/\s/g, '%')}%`; // Replace spaces with '%' for Sequelize's LIKE operator
};

/**
 * Generate Sequelize WHERE clause based on filter criteria.
 * @param search The search string to be applied across all fields
 * @param dataToFilter Object containing key-value pairs for additional filtering
 * @returns Sequelize WHERE clause object
 */
export const whereFilter = ({ search, dataToFilter }: IWhereFilterProps) => {
    // Initialize the WHERE clause object with Op.or and Op.and arrays
    const where: any = {};

    // Iterate over each key-value pair in the dataToFilter object
    for (const key in dataToFilter) {
        const value = dataToFilter[key];

        // If a search string is provided, add it to the Op.or array for all fields
        if (search) {
            if (!where[Op.or]) {
                where[Op.or] = [];
            }

            where[Op.or].push({
                [key]: {
                    [Op.like]: normalizeSearchString(search)
                }
            });
        }

        // If a value is provided and it's not undefined, add it to the Op.and array
        if (value && value !== undefined) {
            if (!where[Op.and]) {
                where[Op.and] = [];
            }

            where[Op.and].push({
                [key]: {
                    [Op.like]: normalizeSearchString(value)
                }
            });
        }
    }

    return where; // Return the generated WHERE clause object
};
