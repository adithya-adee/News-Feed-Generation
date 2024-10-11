# News Feed Generation Website

Welcome to the News Feed Generation Website! This application aggregates news articles from various sources and provides users with a personalized news reading experience.

## Features

- Fetches news articles from the News API based on user-selected categories and search queries.
- User authentication and profile management using Clerk API.
- User interest tracking through keyword management.
- Responsive design for optimal viewing on different devices.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **APIs**: News API, Clerk API

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (version >= 14)
- npm or yarn
- MongoDB instance (local or cloud)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/news-feed-generation.git
cd news-feed-generation
```

Environment Variables
Create a .env.local file in the root directory and add the following variables:
```bash

NEXT_PUBLIC_NEWS_API=your_news_api_key
CLERK_API_KEY=your_clerk_api_key

NEXT_PUBLIC_NEWS_API = your_news_api

DATABASE_URL=your_mongo_atlas_url
```

Create a .env file in the server directory and add the following variables:
```bash
REDIS_PORT=6379
REDIS_HOST=127.0.0.1
```

Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
# or
yarn install
```
Running the Application

Start the development server with:
```bash
cd server
nodemon app.js
```

To start with the frontend Next Js application

```bash

npm run dev
# or
yarn dev
```
Open your browser and navigate to http://localhost:3000 to view the application.

# Contributing
Contributions are welcome! If you have suggestions for improvements or find bugs, please create an issue or submit a pull request.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

# Acknowledgements
News API for providing the news articles.
Clerk for user authentication and management.
MongoDb

##
Feel free to replace placeholders like `yourusername` and `your_news_api_key` with actual values relevant to your project.
