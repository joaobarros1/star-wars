# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting Started

### Prerequisites

Make sure you have Docker and Docker Compose installed on your machine.

### Running the Project

1. **Build and run the Docker container**:

    Open your terminal and navigate to the root of your project, then run the following commands:

    `docker-compose build`
    `docker-compose up`

    Your application will be available in http://localhost/

2. **Access the application:**

    Once the container is up and running, you can access the application by navigating to http://localhost:5173 in your web browser.
    The credentials are:

    - user
    - password

3. **Stoping the App:**

    To stop the Docker container, press Ctrl+C in the terminal where docker-compose up is running, or run the following command in another terminal:

    `docker-compose down`
