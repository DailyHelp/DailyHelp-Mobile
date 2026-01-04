# DailyHelp Mobile App

A React Native mobile application for connecting service providers with customers. The app supports dual user types (Customer and Provider) with features including job management, real-time chat, video/voice calls, analytics, and more.

## 📱 Project Overview

DailyHelp is a service marketplace mobile application built with React Native. It enables customers to find and hire service providers for various tasks, while providers can manage their availability, accept jobs, and track their earnings.

### Key Features

- **Dual User Types**: Separate experiences for Customers and Service Providers
- **Job Management**: Create, accept, and manage service jobs
- **Real-time Communication**: In-app chat with video and voice call support
- **Analytics Dashboard**: Track earnings, jobs, and performance metrics
- **Location Services**: Save and manage multiple service locations
- **Payment Integration**: Bank account management and wallet functionality
- **Push Notifications**: Real-time notifications for jobs and messages
- **Identity Verification**: KYC compliance for service providers

## 🛠 Tech Stack

### Core Technologies

- **React Native**: `0.79.1`
- **React**: `19.0.0`
- **TypeScript**: `5.0.4`
- **Node.js**: `>=18`

### Key Libraries

- **Navigation**: `@react-navigation/native` with bottom tabs and stack navigators
- **State Management**: 
  - `@tanstack/react-query` for server state
  - `mobx` and `mobx-react-lite` for client state
- **UI Components**: 
  - `react-native-paper` for Material Design components
  - `@gorhom/bottom-sheet` for bottom sheets
  - `react-native-actions-sheet` for action sheets
- **Real-time**: 
  - `socket.io-client` for WebSocket connections
  - `react-native-agora` for video/voice calls
- **Firebase**: 
  - `@react-native-firebase/app` and `@react-native-firebase/messaging` for push notifications
- **Authentication**: `@react-native-google-signin/google-signin`
- **Storage**: `react-native-mmkv` for local storage
- **Forms**: `formik` with `class-validator` for form validation
- **Date Handling**: `dayjs`
- **Charts**: `react-native-chart-kit` for analytics visualization

## 📁 Project Structure

```
DailyHelp/
├── android/                 # Android native code
│   ├── app/
│   │   ├── build.gradle    # Android app configuration
│   │   └── src/            # Android source files
│   └── fastlane/           # Android Fastlane configuration
│       ├── Appfile         # Google Play Store credentials
│       └── Fastfile        # Android build and deployment lanes
├── ios/                     # iOS native code
│   ├── DailyHelp/          # iOS app source
│   ├── DailyHelp.xcodeproj # Xcode project
│   ├── DailyHelp.xcworkspace
│   ├── Podfile             # CocoaPods dependencies
│   └── fastlane/           # iOS Fastlane configuration
│       ├── Appfile         # App Store Connect credentials
│       └── Fastfile        # iOS build and deployment lanes
├── src/                     # Main application source code
│   ├── @types/             # TypeScript type definitions
│   │   ├── index.d.ts      # Global types (ApiResponse, etc.)
│   │   ├── props.d.ts      # Component prop types
│   │   └── routes.d.ts     # Navigation route types
│   ├── assets/             # Static assets
│   │   ├── fonts/          # Custom fonts (Geist, Cabinet Grotesk, Figtree)
│   │   ├── img/            # Images
│   │   ├── svg/            # SVG icons (109 files)
│   │   └── video/          # Video assets
│   ├── components/         # Reusable UI components
│   │   ├── button/         # Button components
│   │   ├── container/      # Container/Box components
│   │   ├── customHeader/   # Navigation headers
│   │   ├── customInput/    # Form input components
│   │   ├── offers/         # Offer-related components
│   │   ├── pushNotification/
│   │   ├── skeleton/         # Loading skeleton components
│   │   └── ...             # Other shared components
│   ├── routes/             # Navigation configuration
│   │   ├── app/            # Main app routes (Home, Jobs, Chat, More)
│   │   └── auth/           # Authentication routes
│   ├── screens/            # Screen components
│   │   ├── app/            # Main app screens
│   │   │   ├── chat/       # Chat, video/voice call screens
│   │   │   ├── helpers/    # Provider-specific screens
│   │   │   ├── more/       # Settings, analytics, profile screens
│   │   │   └── user/       # Customer-specific screens
│   │   ├── auth/           # Authentication screens
│   │   │   └── compliance/ # KYC and profile setup
│   │   └── onboarding/    # Onboarding flow
│   └── shared/             # Shared utilities and services
│       ├── services/       # API service classes
│       │   ├── Http.ts     # Base HTTP client
│       │   ├── Auth.ts     # Authentication API
│       │   ├── Home.ts     # Home/dashboard API
│       │   ├── Jobs.ts     # Job management API
│       │   ├── Chat.ts     # Chat API
│       │   ├── More.ts     # Analytics, wallet, etc.
│       │   ├── WebSocket.ts # WebSocket service
│       │   └── Endpoints.ts # API endpoint definitions
│       ├── errors/         # Error handling
│       ├── themes/         # Theme configuration (colors, typography)
│       ├── stores/         # MobX stores
│       ├── AppStorage.ts   # Local storage wrapper
│       ├── Constant.ts    # Constants and enums
│       ├── Scaling.ts     # Responsive scaling utilities
│       └── Utils.tsx       # Utility functions
├── .env                     # Environment variables (not in repo)
├── babel.config.js          # Babel configuration
├── metro.config.js          # Metro bundler configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # NPM dependencies and scripts
├── Gemfile                  # Ruby dependencies (CocoaPods, Fastlane)
└── README.md               # This file
```

### Key Directories Explained

#### `src/screens/app/`
Contains the main application screens organized by feature:
- **chat/**: Real-time messaging, video/voice calls, checkout, reporting
- **helpers/**: Provider-specific screens (home dashboard, job management)
- **more/**: Settings, analytics, bank accounts, disputes, feedback
- **user/**: Customer-specific screens (home, job search, job management)

#### `src/shared/services/`
API service layer using a class-based architecture:
- All services extend `Http` base class
- Services handle authentication, error handling, and response parsing
- Uses `@tanstack/react-query` for data fetching and caching

#### `src/components/`
Reusable UI components following a consistent design system:
- Custom components built on top of React Native primitives
- Typography, Container, Button components with consistent styling
- Skeleton loaders for loading states

## 🚀 Installation

### Prerequisites

- **Node.js**: >= 18
- **Yarn**: Package manager
- **Ruby**: >= 2.6.10 (for CocoaPods and Fastlane)
- **iOS Development**: 
  - macOS with Xcode
  - CocoaPods
- **Android Development**:
  - Android Studio
  - JDK 11 or higher
  - Android SDK

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd DailyHelp
```

### Step 2: Install Dependencies

```bash
# Install Node.js dependencies
yarn install

# Install Ruby dependencies (CocoaPods, Fastlane)
# Note: If you encounter bundler version issues, see Troubleshooting section
bundle install
```

**Important**: This project requires Ruby 3.2.2 and Bundler 2.7.2. If you're using system Ruby, you'll need a Ruby version manager (see Troubleshooting).

### Step 3: iOS Setup

```bash
# Navigate to iOS directory
cd ios

# Install CocoaPods dependencies
bundle exec pod install

# Return to root directory
cd ..
```

### Step 4: Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
BASE_URL=your_api_base_url
STORAGE_ENCRYPTION_KEY=your_encryption_key
GOOGLE_API_KEY=your_google_api_key
WEB_CLIENT_ID=your_web_client_id
CLOUDINARY_URL=your_cloudinary_url
AGORA_APP_ID=your_agora_app_id
AGORA_CHANNEL_NAME=your_agora_channel
```

### Step 5: Android Setup

1. Create a `local.properties` file in the `android/` directory:
   ```properties
   sdk.dir=/path/to/your/android/sdk
   ```

2. For production builds, set up signing:
   - Create a keystore file
   - Update `android/app/build.gradle` with signing configuration

## 🏃 Running the App

### Development Mode

#### Start Metro Bundler

```bash
yarn start
# or
yarn start --port 8082
```

#### Run on Android

```bash
yarn android
```

#### Run on iOS

```bash
yarn ios
# or with specific simulator
yarn ios --simulator='iPhone 16 Pro'
```

### Other Useful Commands

```bash
# Install iOS pods and run
yarn pod

# Build Android APK (release mode)
yarn apk

# Run linter
yarn lint

# Run tests
yarn test
```

## 📦 Fastlane Setup

Fastlane is configured for automated building and deployment to both iOS App Store and Google Play Store.

### Initial Setup

#### 1. Install Fastlane

```bash
yarn fastlane:install
# or
bundle install
```

#### 2. iOS Configuration

Edit `ios/fastlane/Appfile`:

```ruby
app_identifier("com.dailyhelp")
apple_id("your-apple-id@example.com")  # Your Apple Developer email
team_id("YOUR_TEAM_ID")                 # Your Apple Developer Team ID
```

**Authentication Options:**

- **App Store Connect API Key** (Recommended):
  1. Create API key in App Store Connect
  2. Download `.p8` file
  3. Note Key ID and Issuer ID
  4. Update Fastfile to use API key authentication

- **Apple ID Authentication**:
  - Fastlane will prompt for credentials
  - Use app-specific passwords if 2FA is enabled

**Code Signing Setup:**

For production builds, set up Match:

```bash
cd ios
bundle exec fastlane match init
```

This manages certificates and provisioning profiles automatically.

#### 3. Android Configuration

Edit `android/fastlane/Appfile`:

```ruby
json_key_file("path/to/google-play-service-account-key.json")
package_name("com.dailyhelp")
```

**Google Play Service Account Setup:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing
3. Enable "Google Play Android Developer API"
4. Create a Service Account
5. Download the JSON key file
6. In Google Play Console:
   - Go to Settings → API access
   - Grant "Release Manager" or "Admin" role to the service account
7. Update the path in `android/fastlane/Appfile`

### Fastlane Commands

#### iOS Commands

```bash
# Build iOS app (creates .ipa file)
yarn fastlane:ios:build

# Build and upload to TestFlight (Beta testing)
yarn fastlane:ios:beta

# Build and submit to App Store (Production)
yarn fastlane:ios:release

# Build for development/testing
yarn fastlane:ios:dev
```

#### Android Commands

```bash
# Build Android APK
yarn fastlane:android:build

# Build Android App Bundle (AAB) - required for Play Store
yarn fastlane:android:bundle

# Build and upload to Internal Testing track
yarn fastlane:android:internal

# Build and upload to Alpha track
yarn fastlane:android:alpha

# Build and upload to Beta track
yarn fastlane:android:beta

# Build and upload to Production
yarn fastlane:android:release

# Build for development/testing
yarn fastlane:android:dev
```

### Version Management

**iOS:**
- Update version in Xcode project settings
- Or use Fastlane's `increment_build_number` action (already configured)

**Android:**
- Update `versionCode` and `versionName` in `android/app/build.gradle`

### Environment Variables

You can use environment variables for sensitive data:

```bash
export APPLE_ID="your-email@example.com"
export APPLE_TEAM_ID="YOUR_TEAM_ID"
export GOOGLE_PLAY_JSON_KEY_PATH="/path/to/key.json"
```

## 🏗 Architecture Overview

### State Management

- **Server State**: Managed by `@tanstack/react-query`
  - Automatic caching, refetching, and error handling
  - Services located in `src/screens/*/services/`

- **Client State**: Managed by MobX
  - Global app store in `src/shared/stores/appStore.ts`
  - User type, authentication state, etc.

### Navigation

- **React Navigation**: Stack and Tab navigators
- **Route Organization**:
  - `src/routes/app/`: Main app navigation (Home, Jobs, Chat, More)
  - `src/routes/auth/`: Authentication flow
  - Dynamic routing based on user type (Customer/Provider)

### API Architecture

- **Base HTTP Client**: `src/shared/services/Http.ts`
  - Handles authentication headers
  - Error handling and response parsing
  - Toast notifications

- **Service Classes**: Extend `Http` base class
  - `Auth.ts`: Authentication endpoints
  - `Home.ts`: Dashboard and provider listings
  - `Jobs.ts`: Job management
  - `Chat.ts`: Messaging
  - `More.ts`: Analytics, wallet, disputes

- **WebSocket**: Real-time communication via `WebSocket.ts`

### Styling

- **Custom Components**: Built-in design system
  - `Container`: Flexible layout component
  - `Typography`: Consistent text styling
  - `Button`: Standardized button components
- **Responsive Scaling**: `src/shared/Scaling.ts` for screen-agnostic sizing
- **Themes**: Color and typography defined in `src/shared/themes/`

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: Strict typing throughout
- **ESLint**: Configured for code quality
- **File Naming**: PascalCase for components, camelCase for utilities

### Component Structure

```typescript
// Example component structure
import React from 'react';
import { View } from 'react-native';
import Container from '../../components/container/Index';
import Typography from '../../components/Typography';

const MyComponent: IMyComponent = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = React.useState();
  
  // Effects
  React.useEffect(() => {
    // Effect logic
  }, []);
  
  // Handlers
  const handlePress = () => {
    // Handler logic
  };
  
  // Render
  return (
    <Container>
      <Typography>Content</Typography>
    </Container>
  );
};

export default MyComponent;
```

### API Service Pattern

```typescript
// Service class extends Http
export default class MyService extends MyApi {
  useMyData() {
    const { data, isLoading, error } = useQuery({
      queryKey: ['myData'],
      queryFn: async () => await this.getMyData(),
      enabled: Boolean(AppStorage.find('isAuthenticated')),
    });
    
    return { data, isLoading, error };
  }
}
```

## 🐛 Troubleshooting

### Common Issues

#### Ruby/Bundler Version Issues

If you encounter errors like:
```
Could not find 'bundler' (2.7.2) required by your Gemfile.lock
uninitialized constant Gem::Resolver::APISet::GemParser
```

**Solution 1: Use Ruby Version Manager (Recommended)**

Install and use rbenv or rvm to manage Ruby versions:

**Using rbenv:**
```bash
# Install rbenv (if not installed)
brew install rbenv ruby-build

# Install Ruby 3.2.2
rbenv install 3.2.2

# Set local Ruby version for this project
rbenv local 3.2.2

# Install bundler
gem install bundler:2.7.2

# Now install dependencies
bundle install
```

**Using rvm:**
```bash
# Install rvm (if not installed)
curl -sSL https://get.rvm.io | bash -s stable

# Install Ruby 3.2.2
rvm install 3.2.2

# Use Ruby 3.2.2 for this project
rvm use 3.2.2

# Install bundler
gem install bundler:2.7.2

# Now install dependencies
bundle install
```

**Solution 2: Quick Fix (Update Gemfile.lock)**

If you can't change Ruby versions, update Gemfile.lock to match your current bundler:

```bash
# Remove Gemfile.lock
rm Gemfile.lock

# Install correct bundler version
gem install bundler:2.7.2

# Regenerate Gemfile.lock
bundle install
```

**Solution 3: Install Specific Bundler Version**

```bash
# Install the required bundler version
gem install bundler:2.7.2

# Use it for this project
bundle _2.7.2_ install
```

#### iOS Build Failures

1. **Pod Installation Issues**:
   ```bash
   cd ios
   rm -rf Pods Podfile.lock
   bundle exec pod install
   ```

2. **Code Signing Errors**:
   - Set up Match: `cd ios && bundle exec fastlane match init`
   - Or configure certificates manually in Xcode

3. **Build Errors**:
   - Clean build folder: `Cmd + Shift + K` in Xcode
   - Delete derived data
   - Reinstall pods

#### Android Build Failures

1. **Gradle Build Fails with Exit Code 1**:
   ```bash
   # Run Gradle directly to see the actual error
   cd android
   ./gradlew assembleDebug --stacktrace
   
   # Common fixes:
   # - Clean build
   ./gradlew clean
   
   # - Check if local.properties exists with correct SDK path
   # - Ensure Android SDK is properly configured
   # - Check for missing dependencies or version conflicts
   ```

2. **Gradle Sync Issues**:
   ```bash
   cd android
   ./gradlew clean
   ```

3. **Keystore Not Found**:
   - Create release keystore for production builds
   - Update `android/app/build.gradle` with signing config

4. **Fastlane Gradle Build Fails**:
   - The Fastfile uses `assembleDebug` task directly
   - Try running Gradle manually first: `cd android && ./gradlew assembleDebug`
   - Check for missing environment variables or configuration
   - Ensure `local.properties` exists with `sdk.dir` path

5. **Metro Bundler Issues**:
   ```bash
   yarn start --reset-cache
   ```

#### General Issues

1. **Node Modules Issues**:
   ```bash
   rm -rf node_modules yarn.lock
   yarn install
   ```

2. **Cache Issues**:
   ```bash
   # Clear Metro cache
   yarn start --reset-cache
   
   # Clear watchman
   watchman watch-del-all
   ```

3. **Environment Variables Not Loading**:
   - Ensure `.env` file exists in root directory
   - Restart Metro bundler after changes

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Fastlane Documentation](https://docs.fastlane.tools/)
- [MobX Documentation](https://mobx.js.org/README.html)

## 📝 License

[Add your license information here]

## 👥 Contributors

- **Emmanuel Adeola** - Initial work

---

For more information or support, please refer to the project documentation or contact the development team.
