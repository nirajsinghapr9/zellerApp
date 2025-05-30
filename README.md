Step 1: Start the Metro Server
First, you will need to start Metro, the JavaScript bundler that ships with React Native.

To start Metro, run the following command from the root of your React Native project:

# using npm

npm start

# OR using Yarn

yarn start

Step 2: Start your Application
Let Metro Bundler run in its own terminal. Open a new terminal from the root of your React Native project. Run the following command to start your Android or iOS app:

For Android

# using npm

npm run android

# OR using Yarn

yarn android

For iOS

# using npm

npm run ios

# OR using Yarn

yarn ios
If everything is set up correctly, you should see your new app running in your Android Emulator or iOS Simulator shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

Step 3: Run Tests
This project uses Jest for testing.

Run tests with:

# using npm

npm test

# OR using Yarn

yarn test
Run tests in watch mode (rerun tests on file changes):
