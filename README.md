
# Personal Finance App Backend

This is the backend of a Personal Finance Application built using **ExpressJS**, **TypeScript**, **MySQL**, and **Sequelize**. The application allows users to manage their finances by creating wallets, tracking transactions, setting budget goals, and saving goals.

## Features

- **User Authentication**: Users can register and log in.
- **Wallet Management**: Users can create multiple wallets, each with a balance and currency.
- **Transaction Tracking**: Users can record income and expense transactions for each wallet.
- **Budget Goals**: Users can create budget goals with categories and 'timeframes'.
- **Saving Goals**: Users can set saving targets and track their progress.

## API Documentation

Please read full documentation at [https://personal-finance.apidog.io/](https://personal-finance.apidog.io)

## Project Structure

```
├── dist
├── node_modules
├── src
│   ├── app
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── routes
│   │   └── services
│   ├── db
│   │   ├── configs
│   │   ├── helpers
│   │   ├── migrations
│   │   ├── models
│   │   └── seeders
│   ├── interfaces
│   ├── libs
│   ├── utils
│   └── index.ts
├── .env
├── .env.example
├── .gitignore
├── .sequelizerc
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── CONVENTION.md
├── ERD.md
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

<!-- ## ERD -->

<!-- The Entity Relationship Diagram (ERD) of the application can be visualized as follows: -->

<!-- ![ERD Diagram](link_to_your_erd_image) -->

## Getting Started

### Prerequisites

- Node.js
- MySQL
- TypeScript

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/personal-finance-backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following environment variables:

   ```bash
    DB_USERNAME=root
    DB_PASSWORD=
    DB_HOST=localhost
    DB_PORT=3306
    DB_DATABASE=finance_tracker_db
    DB_LOGGING=true
    DB_BENCHMARK=true

    HOSTNAME=0.0.0.0
    PORT=3001

    JWT_KEY=secret
    JWT_EXPIRATION=7d

    EMAIL_USERNAME=
    EMAIL_PASSWORD=
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3000`.

### Database Setup

1. Ensure that MySQL is installed and running.
2. Create a new database:

   ```bash
   CREATE DATABASE personal_finance_db;
   ```

3. Run the Sequelize migrations to create the required tables:

   ```bash
   npx sequelize-cli db:migrate
   ```

## Technologies Used

- **ExpressJS**: Web framework for building the API.
- **Sequelize**: ORM for managing the MySQL database.
- **MySQL**: Relational database for storing financial data.
- **TypeScript**: Type-safe JavaScript for building the server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
