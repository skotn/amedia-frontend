# Stage 1: Build the React app using Node
FROM node:20-alpine as build

ARG REACT_APP_BACKEND_CONSTANT
ENV REACT_APP_BACKEND_CONSTANT=$REACT_APP_BACKEND_CONSTANT

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN echo "REACT_APP_BACKEND_CONSTANT=$REACT_APP_BACKEND_CONSTANT" > .env
RUN npm run build


# Stage 2: Serve the app with Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
