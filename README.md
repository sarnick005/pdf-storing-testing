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

### 🚀 Run in Development Mode
```bash
npm run dev
```
This command runs the server using `nodemon` with TypeScript support.

### 🚀 Run in Production (Deployment)
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