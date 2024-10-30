# Use a lightweight Docker image with Docker Compose installed
FROM docker/compose:latest

# Set the working directory
WORKDIR /app

# Copy your entire project
COPY . .

# Run Docker Compose to start your services
CMD ["docker-compose", "up"]