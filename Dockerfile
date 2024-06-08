FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

EXPOSE 5500

# Set the command to run your app
CMD ["node", "./src/index.js"]
