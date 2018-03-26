## React Playground

Just a simple space for playing around with setting up a react focus web application.

The main purpose of this is getting a better understanding of the react framework.

Secondary purposes are to:
 - Research gitlab for CI/CD and docker builds
 - Improve AWS deployment processes

### Frontend

Currently only runs the development server.

Future improvement to change this to a simple Node.js server, and using CI/CD build the src and upload it to an S3 bucket, rather than hosting from the app itself.

### Backend

The backend is built using python and flask with uWSGI web server

Future improvement to setup an nginx server to route requests through to the webserver.


### Container registery

All docker images are stored on gitlab. To update the latest images run:

Login:
docker login registry.gitlab.com

*note that you will need to setup personal access token if you have 2fa set, and use it for the password*
https://gitlab.com/mjmcconnell.dev/react_playground/container_registry

Backend image:
docker build -t registry.gitlab.com/mjmcconnell.dev/react_playground/backend:latest . --file=Dockerfile.backend
docker push registry.gitlab.com/mjmcconnell.dev/react_playground/backend

Frontend image:
docker build -t registry.gitlab.com/mjmcconnell.dev/react_playground/frontend:latest . --file=Dockerfile.frontend
docker push registry.gitlab.com/mjmcconnell.dev/react_playground/frontend
