## How I worked on this project

My goal was to simulate a social network single-page application. Just for fun :). I lately developed and integrated some social network features in a marketing application, and wanted to see how these features play together in a social app.

- I used React and Material-UI libraries for the frontend. This is work-in-progress as with time I intend to build a fully responsive frontend using styled-components.
- And I used Node.js, Express.js and MongoDB for the backend

## How to navigate this project

### Frontend

- Frontend Routing: [Click here](https://github.com/Lambertyubin/social_media_frontend/blob/main/src/MainRouter.js#L11)
- Some stateful logic: [Click here](https://github.com/Lambertyubin/social_media_frontend/blob/main/src/components/post/NewPost.js#L62)
- UI components: [Post Component](https://github.com/Lambertyubin/social_media_frontend/blob/main/src/components/post/Post.js#L53)

- The application fetches data from a backend API that I built as part of the project.
- Requests to API for authentication: [Click here](https://github.com/Lambertyubin/social_media_frontend/blob/main/src/components/auth/api-auth.js#L3)
- Requests to API for CRUD operations with MongoDB database: [Post API requests](https://github.com/Lambertyubin/social_media_frontend/blob/main/src/components/post/api-post.js#L61)

- Integration tests using React Testing Library [link to example test]

### Backend

- [Link to Backend built on Node.js](https://github.com/Lambertyubin/social_media_backend)

## Why I built the project this way

### Frontend

- I used React as the major frontend library because its virtual DOM feature provides a smooth user experience whereby only necessary parts of each component are updated when state changes.

### Backend

- I choose Node.js due to it does a great job at handling concurrent requests due to its asynchronous event-driven IO. A backend that is fast at processing requests and providing responses without blocking incoming requests was critical for this social media app.
- I also used Express.js due to its popularity at managing middleware needed to manipulate the request and response objects during a request-response cycle. With express, I was able to build a fast RESTful API with all CRUD operations linking to the database.
- MongoDB was used because I needed some flexibility in type of data to store for each user's data, as well as scalability as the system grow.

Testing is an essential part of production applications. Testing Library is the go-to library in the React community. I covered the essential features of the app with tests.

## During my extra time, I intend to improve the following:

- Complete the frontend to have a fully-responsive UI based on some cool Figma designs
- Set up continuous integration to run the tests
- Add end-to-end tests with Cypress

## Available Scripts

### Frontend

- `npm start` to run the application
- `npm test` to run tests

### Backend

- `npm start` to run the application, as it's still in dev stage.
