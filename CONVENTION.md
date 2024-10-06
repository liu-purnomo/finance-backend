# Development Conventions for Personal Finance Tracker

This document outlines the coding and development conventions followed in the **Personal Finance Tracker** project. It aims to ensure code quality, consistency, and maintainability. Please adhere to these conventions for a streamlined and efficient development process.

## 1. General Coding Guidelines

### 1.1 Use TypeScript
- All code must be written in TypeScript.
- Ensure strict type-checking (`strict: true`) is enabled in `tsconfig.json` for catching type errors early.

### 1.2 Code Formatting
- Use [Prettier](https://prettier.io/) for consistent code formatting.
- Follow these standards:
  - Indentation: 2 spaces.
  - Maximum line length: 100 characters.
  - Strings: Use single quotes (`'example'`) unless double quotes are necessary (e.g., in JSX).

### 1.3 Linting
- Use [ESLint](https://eslint.org/) to lint your code, following the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript) as a base configuration.

```bash
npm run lint
```

### 1.4 Comments
- Comment only when necessary to explain *why* a decision was made.
- Use JSDoc comments for functions and classes:

```typescript
/**
 * Fetches the user data from the database.
 * @param userId - The ID of the user
 * @returns {Promise<User>}
 */
async function getUser(userId: number): Promise<User> {
  // ...
}
```

## 2. Naming Conventions

### 2.1 Variables
- Use descriptive camelCase names for variables.
- Prefix boolean variables with `is` or `has` (e.g., `isActive`, `hasEmail`).

### 2.2 Functions
- Function names should clearly indicate the action or process they perform (e.g., `createTransaction`, `updateUserProfile`).

### 2.3 Classes and Interfaces
- Use PascalCase for class and interface names (e.g., `TransactionService`, `UserController`).

### 2.4 Files and Folders
- **Kebab-case** should be used for all file names (e.g., `user-service.ts`, `transaction-controller.ts`).
- Maintain the following folder structure:

  - **app/controllers**: Handles HTTP requests and sends responses. Controllers should call services rather than models directly.
  - **app/services**: Contains business logic and acts as a bridge between controllers and models.
  - **app/routes**: Defines API routes.
  - **app/middlewares**: Stores custom middleware functions.
  - **db/configs**: Holds database configuration files.
  - **db/models**: Stores Sequelize models.
  - **db/migrations**: Contains migration files for database schema changes.
  - **db/seeders**: Includes seed files for populating the database with initial data.
  - **interfaces**: TypeScript interfaces and types.
  - **libs**: External libraries and utilities.
  - **utils**: Helper functions.
  - **index.ts**: Entry point of the application.

### 2.5 Database Naming
- Use snake_case for database table and column names.
- Use plural names for tables (e.g., `users`, `transactions`).

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE
);
```

## 3. Project Structure

The following structure organizes the project for scalability:

```
├── dist                # Compiled output (generated automatically)
├── node_modules        # Installed npm packages
├── src                 # Source files
│   ├── app
│   │   ├── controllers # Controllers handle requests and responses
│   │   ├── middlewares # Custom middleware
│   │   ├── routes      # API routes definition
│   │   └── services    # Business logic and model interaction
│   ├── db
│   │   ├── configs     # Database configuration
│   │   ├── helpers     # Helper functions for database
│   │   ├── migrations  # Database migration files
│   │   ├── models      # Sequelize models
│   │   └── seeders     # Database seeding files
│   ├── interfaces      # TypeScript interfaces and types
│   ├── libs            # External libraries
│   ├── utils           # Helper utilities
│   └── index.ts        # Application entry point
├── .env                # Environment variables
├── .env.example        # Example environment variables
├── .gitignore          # Files to ignore in Git
├── .sequelizerc        # Sequelize configuration
├── CODE_OF_CONDUCT.md  # Code of conduct file
├── CONTRIBUTING.md     # Contribution guidelines
├── LICENSE             # License file
├── package-lock.json   # Lock file for npm dependencies
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation
└── tsconfig.json       # TypeScript configuration
```

## 4. Service Layer

- **Services** act as intermediaries between **controllers** and **models**.
- Controllers should only focus on handling HTTP requests/responses and delegate business logic to services.
- Services interact with Sequelize models and contain the business logic necessary to perform operations.

**Example:**

```typescript
// In src/app/controllers/user-controller.ts
import { UserService } from '../services/user-service';

class UserController {
  async createUser(req: Request, res: Response) {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
  }
}

// In src/app/services/user-service.ts
import { User } from '../../db/models/user';

class UserService {
  static async create(userData: any) {
    return await User.create(userData);
  }
}
```

## 5. ORM and Database Operations

### 5.1 Using Sequelize
- Use Sequelize ORM for database operations and model management.
- To generate models and migrations, use the Sequelize CLI commands.

**Example of creating a `User` model**:

```bash
sequelize model:generate --name User --attributes name:string,email:string
```

This will create:
- **Migration** in `db/migrations`.
- **Model** in `db/models`.

### 5.2 Migrations
- Always use migrations to modify the database schema.
- Run migrations using:

```bash
sequelize db:migrate
```

### 5.3 Seeders
- Use seeders to populate the database with initial data for testing or default setups.

```bash
sequelize db:seed:all
```

## 6. Git and Version Control

### 6.1 Commit Messages
Follow this format for commit messages:

```
<type>(<scope>): <subject>
```

**Types**:
- `feat`: Adding new features
- `fix`: Fixing bugs
- `docs`: Documentation updates
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

**Example**:
```
feat(user): add user registration feature
fix(transaction): correct currency format issue
```

### 6.2 Branching Strategy
- Use a feature-branching strategy. Main branches:
  - `main`: Production-ready code.
  - `develop`: Active development.
- Branch names should be descriptive:

```
feature/add-user-management
fix/user-authentication-bug
```

### 6.3 Pull Requests
- Pull requests should target the `develop` branch.
- Ensure that code passes linting and tests before submission.

## 7. API Conventions

- Follow RESTful conventions for API routes.
- Use appropriate HTTP status codes and descriptive URL paths.

```
POST /api/users          -> Create a new user
GET /api/users/:id       -> Get user details
POST /api/transactions   -> Create a transaction
```

## 8. Security

- Sanitize all user input to prevent SQL injection and cross-site scripting (XSS).
- Use bcrypt for hashing passwords.
- Store sensitive data in environment variables (`.env` file).
