# The Keyoshi Project

**Open Source. Open Story. Bringing Avatar: The Last Airbender chronicles to Hebrew speakers.**

---

## Purpose

The Keyoshi Project is an open-source initiative with a clear mission: **to make the stories of Avatar: The Last Airbender accessible to Hebrew speakers worldwide**. By translating and sharing these beloved chronicles, we aim to bridge cultural and language gaps, foster community collaboration, and celebrate the Avatar universe. This project is built by fans, for fans, and thrives on contributions from translators, developers, and enthusiasts alike.

---

## Overview

The Keyoshi Project is a full-stack web application that allows users to browse, read, and contribute to Hebrew translations of Avatar: The Last Airbender books and chapters. It features a modern React frontend and a robust Express backend, with MongoDB as the database. The project is community-driven, open source, and designed to preserve the spirit and nuance of the original stories.

---

## Features

- 📚 **Book & Chapter Management:** Browse books and their chapters, each with Hebrew translations.
- 🌐 **Open Source:** All translations and code are public and free to use.
- 🤝 **Community Driven:** Collaborate with fans and linguists worldwide.
- 📖 **Faithful Translations:** Preserving the spirit and nuance of the original stories.
- 🔥 **For Fans, By Fans:** Built by Avatar fans for the Hebrew-speaking community.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, React Router, TanStack Query
- **Backend:** Express, TypeScript, Mongoose (MongoDB)
- **Database:** MongoDB

---

## Project Structure

```
/Client   # Frontend (React + Vite)
/Server   # Backend (Express + TypeScript)
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/your-org/the-keyoshi-project.git
cd the-keyoshi-project
```

#### 2. Install dependencies

```bash
cd Server
npm install
cd ../Client
npm install
```

#### 3. Configure Environment Variables

In `/Server`, create a `.env` file with your MongoDB credentials:

```
MONGO_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/keyoshi
MONGO_USERNAME=your-username
MONGO_PASSWORD=your-password
```

#### 4. Run the Backend

```bash
cd Server
npm run dev
```
The server will start on [http://localhost:3000](http://localhost:3000).

#### 5. Run the Frontend

```bash
cd Client
npm run dev
```
The frontend will start on [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## API Overview

### Books

- `GET /api/v1/books` — List all books
- `GET /api/v1/books/:id` — Get a book by ID
- `GET /api/v1/books/slug/:slug` — Get a book by slug
- `POST /api/v1/books` — Create a new book

### Chapters

- `GET /api/v1/chapters` — List all chapters
- `GET /api/v1/chapters/:id` — Get a chapter by ID
- `POST /api/v1/chapters` — Create a new chapter
- `PUT /api/v1/chapters/:id` — Update a chapter
- `DELETE /api/v1/chapters/:id` — Delete a chapter

---

## Frontend Structure

- **Home Page:** Project introduction, features, and call to action.
- **Books Page:** Browse all available books.
- **Book Page:** View details and chapters of a selected book.
- **About/Contact:** Project background and contact info.
- **Docs:** Markdown-based documentation.

---

## Contributing

We welcome contributions! Please open issues or pull requests for features, bug fixes, or translations.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgements

- Inspired by the Avatar: The Last Airbender community.
- Thanks to all contributors and translators!
