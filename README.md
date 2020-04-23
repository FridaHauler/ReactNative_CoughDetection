# Cough Recording App

[![Actions Status](/../../workflows/Build/badge.svg?branch=master)](/../../actions?query=workflow%3A%22Build%22+branch%3Amaster)


# Development
We develop in macOS, so somethings may need to be changed in order to run in Linux or Windows.
This project is created using react-native.

## Requirements  
* node 10 or 12 installed
* yarn (`npm install -g yarn`)
* download the firebase json credential files from `https://console.firebase.google.com/u/0/project/coughrecording/settings/general/` into the correct folders.
    * `ios/GoogleService-Info.plist`
    * `android/app/google-services.json`
* for Android:
    * Android Studio
    * Android SDK installed and paths exported  
    ```
    export ANDROID_HOME=/Users/{user}/Library/Android/sdk
    export ANDROID_SDK_ROOT=$ANDROID_HOME
    ```
* for iOS (only works in macOS):
    * Xcode installed
    * Cocoapods installed (`sudo gem install cocoapods`)


## Starting up
* `git clone` branch and `cd` into directory
* `yarn` to install dependencies
* `yarn ios` to run in ios emulator
* `yarn android` to run in Android emulator or device (the one visible by `adb`)

### others
* `yarn xcode` open xcode project
* `yarn pod` run cocoapod install
* `yarn test` to run the tests
* `yarn lint` run the linter
* `yarn lint --fix` autofix linter issues
* `yarn start` start the server side manually


## Release
Increment the version in `package.json`, iOS in xCode settings and Android in `android/app/build.gradle`

### iOS
Open xCode with `yarn xcode` and rebuild the project. After, archive and `Distribute App` with `App Store Connect` for Testflight or `Ad Hoc` for Firebase.

### Android
Configure `android/app/build.gradle` android -> release section to contain the datastore `storeFile` and `storePassword` and the Key `keyAlias` and `keyPassword`
Open in Android Studio `android` folder, and change the `Build Variants` to `release`. Then on the `Build` menu select `Build Bundle(s) / APK(s)` and choose the one needed (`apk` for Firebase or email distribution, `Build Bundle` for the Play Store)
