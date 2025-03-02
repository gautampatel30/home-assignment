# React Coding Assignment

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### Setup Instructions

#### Clone the Repository

```sh
git clone <repository-url>
cd <repository-name>
```

#### Start the Client

```sh
cd client
npm install
npm run dev
```

Client will run at: [http://localhost:5173](http://localhost:5173)

#### Start the Server

```sh
cd server
npm install
npm run dev
```

Server will listen on: [http://localhost:9800](http://localhost:9800)

## Assignment Features

### Frontend Component

The **DisplayComponent** is built to be modular and reusable, with the following features:

#### Data Fetching & Error Handling

- Fetches data from the backend API.
- Displays loading and error states.
- Implements retry logic.

#### Display Modes

- Supports **horizontal** and **vertical** display variants.
- A toggle button switches between the display modes dynamically.

#### Sorting & Filtering

- Supports sorting by at least one column (alphabetical/numerical).
- Includes a search bar for filtering displayed data.

#### Pagination

- Implements pagination with **Next** and **Previous** buttons.
- Allows selecting the page size (5, 10, 20 items per page).

#### Testing

- Unit tests for one React hook and one core function using **Jest** and **React Testing Library**.

## DevOps & CI/CD

### GitHub Actions Workflow

A **.github/workflows/ci.yml** file is included to automate testing and deployment:

1. Installs dependencies for both client and server.
2. Runs linting and unit tests.
3. Builds frontend and backend if tests pass.

### Dockerization

#### Build and Run Locally with Docker

```sh
docker-compose up --build
```

This will start both frontend and backend services.

#### Dockerfile - Frontend

```dockerfile
FROM node:18
WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client .
RUN npm run build
CMD ["npm", "run", "dev"]
```

#### Dockerfile - Backend

```dockerfile
FROM node:18
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server .
CMD ["npm", "run", "dev"]
```

#### docker-compose.yml

```yaml
version: '3'
services:
  frontend:
    build: ./client
    ports:
      - "5173:5173"
    depends_on:
      - backend

  backend:
    build: ./server
    ports:
      - "9800:9800"
```

### Deployment

#### Deploy using GitHub Actions Workflow

1. Push changes to GitHub.
2. GitHub Actions workflow will:
   - Run tests and linting.
   - Build and deploy the app.

#### Deploy to AWS Elastic Beanstalk & CloudFront

1. **Backend Deployment:**

   - Package the backend into a ZIP file.
   - Deploy it to **AWS Elastic Beanstalk** using the AWS CLI or Elastic Beanstalk console.

2. **Frontend Deployment:**

   - Build the frontend using `npm run build`.
   - Upload the build files to an **S3 bucket**.
   - Set up **AWS CloudFront** to serve the frontend via a CDN.
   - Frontend website: [http://react-take-home-frontend.s3-website-us-east-1.amazonaws.com/](http://react-take-home-frontend.s3-website-us-east-1.amazonaws.com/)

## Documentation

### Running Locally with Docker

1. Install Docker
2. Run `docker-compose up --build`
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Deploying with GitHub Actions

1. Configure AWS Elastic Beanstalk and CloudFront settings.
2. Push changes to trigger the workflow.



