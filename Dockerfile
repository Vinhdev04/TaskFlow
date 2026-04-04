# Stage 1: Build source code
FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
# Copy build files from stage 1 to Nginx default public directory
COPY --from=build /app/frontend/dist /usr/share/nginx/html
# Copy custom Nginx config if available
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
