# Launch the rest API

# First define the container to use, here we will use node alpine
FROM node:alpine

# Choose your final workdir (path were our application will be stored in the container)
WORKDIR /usr/src/app

# Save current path in a log file (not mandatory, but can be usefull to debug)
RUN pwd > /tmp/debug.txt

# Copy package.json and package-lock.json into the workdir folder
COPY package*.json ./

# Install all libraries
RUN npm install

# Copy the content of the current folder into our workdir
COPY . .

# Make the 8080 port available (already done in docker-compose)
EXPOSE 8080

# Launch the rest API (based on the "start" config inside package.json) 
CMD [ "npm", "start" ]
