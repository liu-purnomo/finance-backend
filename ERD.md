### Entity Relationship Diagram (ERD):

1. **User**
   - `id` (PK) - UUID
   - `name` - String
   - `email` - String (unique)
   - `password` - String
   - `token` - String
   - `isVerified ` - Boolean
   - `createdAt` - Timestamp
   - `updatedAt` - Timestamp

2. **Wallet**
   - `id` (PK) - UUID
   - `name` - String
   - `balance` - Decimal
   - `currency` - String
   - `description` - String
   - `userId` (FK to User) - UUID
   - `createdAt` - Timestamp
   - `updatedAt` - Timestamp

3. **Transaction**
   - `id` (PK) - UUID
   - `amount` - Decimal
   - `description` - String
   - `transactionDate` - Date
   - `type` - Enum ('INCOME', 'EXPENSE')
   - `category` - String
   - `walletId` (FK to Wallet) - UUID
   - `createdAt` - Timestamp
   - `updatedAt` - Timestamp

4. **Budget**
   - `id` (PK) - UUID
   - `name` - String
   - `description` - Text
   - `amount` - Decimal
   - `startDate` - Date
   - `endDate` - Date
   - `category` - String
   - `userId` (FK to User) - UUID
   - `createdAt` - Timestamp
   - `updatedAt` - Timestamp

5. **SavingGoal**
   - `id` (PK) - UUID
   - `name` - String
   - `description` - Text
   - `targetAmount` - Decimal
   - `currentAmount` - Decimal
   - `targetDate` - Date
   - `userId` (FK to User) - UUID
   - `createdAt` - Timestamp
   - `updatedAt` - Timestamp

### Relations:
1. **User** has many **Wallet**.
2. **Wallet** has many **Transaction**.
3. **User** has many **Budget**.
4. **User** has many **SavingGoal**.
