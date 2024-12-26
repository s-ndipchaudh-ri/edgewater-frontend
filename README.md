# Edgewater Frontend

This repository contains the frontend implementation for the Edgewater project. The frontend is developed using React, Redux, and TypeScript. It provides a user-friendly interface to interact with the backend API and WebSocket for real-time updates. Below are the details about the setup, usage, and structure of the project.

Project Demo Video : https://drive.google.com/file/d/1ClUPHj7Ef_q6eghNr0sI5l-2mRwRdDRh/view?usp=sharing

 Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Components](#components)
- [API Integration](#api-integration)
- [WebSocket Integration](#websocket-integration)
- [Testing](#testing)
- [License](#license)

 Features

- User authentication: Login and registration.
- Pair selection: Users can subscribe to multiple pairs.
- Real-time data updates for prices, matches, and system status.
- System status: Display information about WebSocket subscriptions and active channels.
- Integration with REST API for user management and WebSocket for real-time pair data.

 Architecture Overview

- **React**: Core UI framework.
- **Redux Toolkit**: State management for user authentication, subscriptions, and WebSocket data.
- **TypeScript**: Strongly typed development for improved maintainability.
- **REST API**: Interaction with the backend for authentication and user data.
- **WebSocket**: Real-time updates for pair data and system status.

 Prerequisites

- Node.js (v18 or later)
- npm or yarn

 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/s-ndipchaudh-ri/edgewater-frontend.git
   cd edgewater-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


 Usage

# Development Mode

Run the application in development mode:
```bash
npm run dev
```

# Production Mode

Build and start the application:
```bash
npm run build
npm run preview
```

 Scripts

- `dev`: Starts the application in development mode.
- `build`: Builds the application for production.
- `preview`: Previews the production build.
- `lint`: Lints the codebase using ESLint.

 Project Structure

```plaintext
src/
├── App.tsx                # Root component
├── components/            # Reusable components
├── store/                 # Redux slices and store
├── assets/                # Static assets
├── websocketManager.ts    # WebSocket connection manager
├── axiosInstance.ts       # Axios configuration for REST API
├── main.tsx               # Application entry point
└── AppWrapper.tsx         # Wrapper for global providers
```

 Components

# Auth Components
- **Login**: User login form.
- **Register**: User registration form.
- **ProtectedRoute**: Restricts access to authenticated users.

# Dashboard Components
- **DynamicTable**: Displays dynamic pair data.
- **Layout**: Includes AppBar, LeftSidebar, RightSidebar, and MainContent.
- **PriceView**: Displays real-time bid and ask data.
- **MatchView**: Displays trade details with buy and sell differentiation.
- **System Status**: Shows WebSocket subscription information.

# Error Handling
- **ErrorFallback**: Graceful error handling component.

 API Integration

- REST API is used for:
  - User registration and login.
  - Managing pair subscriptions.

# Axios Configuration
The `axiosInstance.ts` file contains pre-configured Axios settings for interacting with the backend REST API.

 WebSocket Integration

- WebSocket is used for:
  - Receiving real-time updates for selected pairs.
  - Displaying system status information.

The `websocketManager.ts` file manages the WebSocket connection lifecycle and data handling.

 Testing

Currently, testing is not configured but can be added using a testing framework like Jest and React Testing Library.

 License

This project is licensed under the UNLICENSED license.

