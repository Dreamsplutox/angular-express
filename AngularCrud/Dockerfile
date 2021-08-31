### STAGE 1: Build angular application ###

# First define the container to use, here we will use node alpine
FROM node:alpine AS build

# Choose your final workdir (path were our application will be stored in the container)
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the workdir folder
COPY package*.json ./

# Install all libraries
RUN npm install

# Copy the content of the current folder into our workdir
COPY . .

# Build the angular application (based on "build" section of package.json)
RUN npm run build

### STAGE 2: Run on nginx prod server ###

# Now define a nginx container to deploy the compiled app in prod
FROM nginx:alpine

# Copy the nginx configuration file to the right location
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy compiled files in the nginx server
COPY --from=build /usr/src/app/dist/AngularCrud /usr/share/nginx/html

# Open the port 8081 (already done in docker-compose)
EXPOSE 8081

# Ask the nginx process to stay in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]