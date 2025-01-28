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
#    - `isVerified` - Boolean
#    - `firstDayOfWeek` - String
#    - `firstDayOfTheMonth` - String
#    - `firstMonthOfTheYear` - String

#    - `createdAt` - Timestamp
#    - `updatedAt` - Timestamp

sequelize model:create --name User --attributes name:string,email:string,password:string,token:string,isVerified:boolean

# 2. **Wallet**
#    - `id` (PK) - UUID
#    - `name` - String
#    - `balance` - Decimal
#    - `currency` - String
#    - `description` - Text
#    - `userId` (FK to User) - UUID
#    - `createdAt` - Timestamp
#    - `updatedAt` - Timestamp

sequelize model:create --name Wallet --attributes name:string,balance:decimal,currency:string,description:text,userId:uuid

# 3. **Transaction**
#    - `id` (PK) - UUID
#    - `amount` - Decimal
#    - `description` - String
#    - `transactionDate` - Date
#    - `type` - Enum ('INCOME', 'EXPENSE')
#    - `category` - String
#    - `walletId` (FK to Wallet) - UUID
#    - `userId` (FK to User) - UUID
#    - `createdAt` - Timestamp
#    - `updatedAt` - Timestamp

sequelize model:create --name Category --attributes name:string

sequelize model:create --name SubCategory --attributes name:string,categoryId:uuid

sequelize model:create --name Transaction --attributes amount:decimal,description:string,transactionDate:date,type:enum,subCatgeoryId:uuid,walletId:uuid,userId:uuid

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

sequelize model:create --name Budget --attributes description:text,amount:decimal,periodStart:date,periodEnd:date,categoryId:uuid,userId:uuid

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