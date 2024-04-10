# NestJS Assessment Project

## Description

This NestJS Assessment project encompasses authentication and form modules, alongside various features such as pipes, TypeORM with MySQL, Nest Throttle, JWT token, and Swagger.

## Features

- Authentication module with JWT token generation and validation
- Form module for managing form entities
- TypeORM integration for database management with MySQL
- Nest Throttle for rate limiting requests
- Swagger for API documentation

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/jignesh101086/nestjs.git
    ```

2. Install dependencies:

    ```bash
    cd yourproject_folder
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and configure the following environment variables:

    ```plaintext
    DB_HOST=your_hostname
    DB_PORT=3306
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    DB_DATABASE=nest_assessment
    ```

## Usage

1. Start the server:

    ```bash
    npm run start:dev
    ```

2. Access the API documentation:

    Open your browser and navigate to [http://localhost:3000/api](http://localhost:3000/api) to view the Swagger UI.

3. Utilize the API endpoints to interact with the application.

## API Endpoints

### Authentication:

- `POST /auth/login`: Log in and obtain a JWT token.

### Form Management:

- `POST /form`: Create a new form.
- `POST /fill_data?form_title=[form title]`: Fill form data.
- `GET /fill_data?form_title=:param`: Get forms by title.
