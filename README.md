# PDF Storing & Testing

A full-stack application for uploading, storing, and testing PDF functionality.

## 🔧 Project Setup

### 📦 Clone the Repository

```bash
git clone https://github.com/sarnick005/pdf-storing-testing.git
cd pdf-storing-testing
```

## 🖥️ Backend (Server)

### 📁 Navigate to Server Directory

```bash
cd server
```

### 📦 Install Dependencies

```bash
npm install
```

### ⚙️ Environment Configuration

Create a `.env` file in the server directory and copy the contents from `.env.sample`:

```bash
cp .env.sample .env
# or manually create .env and copy contents from .env.sample
```

### 🚀 Run in Development Mode

```bash
npm run dev
```

This command runs the server using `nodemon` with TypeScript support.

### 🚀 Run in Production (Deployment)

### ⚙️ Production Configuration

When deploying to production, make sure to set the NODE_ENV environment variable to "production":

````bash
# In your .env file
NODE_ENV=production
````

1. **Build the Project**

```bash
npm run build
```

2. **Start the Production Server**

```bash
npm start
```

## 🌐 Frontend (Client)

### 📁 Navigate to Client Directory

```bash
cd client
```

### 📦 Install Dependencies

```bash
npm install
```

### 🚀 Run in Development Mode

```bash
npm run dev
```

### 🚀 Run in Production (Deployment)

> Note: Make sure to set environment variables and production build settings as needed (e.g., using `vite.config.js`).

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

For actual deployment (e.g., Netlify, Vercel, or your own server), upload the contents of the `dist` folder.

## 📁 Folder Structure

```
pdf-storing-testing/
├── client/        # Frontend - Vite + React
├── server/        # Backend - Node.js + TypeScript
```
