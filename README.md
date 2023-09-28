# Wallet System

Wallet Application for Transactions

## Run Locally

Clone the project

```bash
  git clone https://github.com/sreeni-pando/Wallet-service
```
Go to the project directory

```bash
  cd /path/to/Wallet-service
```
Run Make Bootstrap

```bash
  make bootstrap
```
Run Migrations

```bash
  cd /root/Wallet-service/service
  npx sequelize-cli db:migrate
```

Following are the Backend Service in Wallet Module.
- Wallet Service


Go to the Wallet Serivce Folder from Root Folder to run the Backend Services

```bash
  cd wallet-service/
```

To Run Wallet Service
```bash
  yarn start:wallet
```


Go to the Frontend Folder from Root Folder to run the Frontend Services
```bash
  cd frontend/
```

To Run shipper frontend
```bash
  cd shipper/
  yarn serve
```