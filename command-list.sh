npm init

npm i express sequelize mysql2 dotenv cors jsonwebtoken nodemailer bcrypt

npm i -D typescript ts-node sequelize-cli @types/node @types/express nodemon @types/jsonwebtoken @types/cors @types/nodemailer

# install global sequelize-cli and nodemone

npm i -g sequelize-cli nodemon


# 1. **User**
#    - `id` (PK) - UUID
#    - `name` - String
#    - `email` - String (unique)
#    - `password` - String
#    - `token` - String
#    - `createdAt` - Timestamp
#    - `updatedAt` - Timestamp

sequelize model:create --name User --attributes name:string,email:string,password:string,token:string

# 2. **Wallet**
#    - `id` (PK) - UUID
#    - `name` - String
#    - `balance` - Decimal
#    - `currency` - String
#    - `description` - String
#    - `userId` (FK to User) - UUID
#    - `createdAt` - Timestamp
#    - `updatedAt` - Timestamp

sequelize model:create --name Wallet --attributes name:string,balance:decimal,currency:string,userId:uuid

# 3. **Transaction**
#    - `id` (PK) - UUID
#    - `amount` - Decimal
#    - `description` - String
#    - `transactionDate` - Date
#    - `type` - Enum ('INCOME', 'EXPENSE')
#    - `category` - String
#    - `walletId` (FK to Wallet) - UUID
#    - `createdAt` - Timestamp
#    - `updatedAt` - Timestamp

sequelize model:create --name Transaction --attributes amount:decimal,description:string,transactionDate:date,type:enum,category:string,walletId:uuid

# 4. **Budget**
#    - `id` (PK) - UUID
#    - `name` - String
#    - `description` - Text
#    - `amount` - Decimal
#    - `startDate` - Date
#    - `endDate` - Date
#    - `category` - String
#    - `userId` (FK to User) - UUID
#    - `createdAt` - Timestamp
#    - `updatedAt` - Timestamp

sequelize model:create --name Budget --attributes name:string,description:text,amount:decimal,startDate:date,endDate:date,category:string,userId:uuid

# 5. **SavingGoal**
#    - `id` (PK) - UUID
#    - `name` - String
#    - `description` - Text
#    - `targetAmount` - Decimal
#    - `currentAmount` - Decimal
#    - `targetDate` - Date
#    - `userId` (FK to User) - UUID
#    - `createdAt` - Timestamp
#    - `updatedAt` - Timestamp

sequelize model:create --name SavingGoal --attributes name:string,description:text,targetAmount:decimal,currentAmount:decimal,targetDate:date,userId:uuid

sequelize init