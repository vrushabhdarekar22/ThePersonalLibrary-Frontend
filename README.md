# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 📚 Personal Library – Frontend

A React application built with Vite that connects to a NestJS backend to manage a collection of books.

This project demonstrates clean architecture, API integration using Redux Toolkit, and global state management.

## 🚀 Features

Fetch all books from backend

Add new books

Delete books

Update book ratings (1–5)

Filter books by genre

Toggle favorites (⭐)

Real-time favorite count in header

Loading and error handling

Responsive UI using Tailwind CSS

## 🛠 Tech Stack

React (Vite)

Redux Toolkit

RTK Query

Tailwind CSS

NestJS (Backend API)

## ⚙️ Setup
1️⃣ Clone the Repository
git clone https://github.com/vrushabhdarekar22/ThePersonalLibrary-Frontend.git
cd ThePersonalLibrary-Frontend

2️⃣ Install Dependencies
npm install

▶️ Run Development Server
npm run dev


## The application will run at:

http://localhost:5173
