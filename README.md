# 🧭 TaskFlow Mobile

<div align="center">

![TaskFlow Logo](https://img.shields.io/badge/TaskFlow-Frontend-4f46e5?style=for-the-badge&logo=react)

**A modern, mobile-first task management application**

*Built with React • Ionic • Capacitor*

[![React](https://img.shields.io/badge/React-18+-61dafb?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Ionic](https://img.shields.io/badge/Ionic-7+-3880ff?style=flat-square&logo=ionic&logoColor=white)](https://ionicframework.com/)
[![Capacitor](https://img.shields.io/badge/Capacitor-5+-119eff?style=flat-square&logo=capacitor&logoColor=white)](https://capacitorjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)](https://github.com/MrSSHH/taskflow-frontend)
[![API Required](https://img.shields.io/badge/Requires-taskflow--api-critical?style=flat-square)](https://github.com/MrSSHH/taskflow-api)

> ⚠️ **IMPORTANT**: This frontend application requires the TaskFlow API backend to function. You must set up and run the [TaskFlow API](https://github.com/MrSSHH/taskflow-api) before using this app.

</div>

## 📱 What is TaskFlow?

TaskFlow is a **mobile-first task management application** designed to help you organize, track, and complete your tasks efficiently. Built with modern web technologies and compiled to native mobile apps, TaskFlow offers a seamless experience across iOS and Android devices.

### 🎯 Key Highlights
- **Mobile-First Design** - Optimized for touch interactions and mobile workflows
- **Native Performance** - Compiled to native iOS and Android apps using Capacitor
- **Offline Capable** - Work without internet, sync when connected
- **Modern Stack** - React + Ionic + TypeScript for maintainable, scalable code

## 🚧 Development Status

> **Work in Progress**: This project is currently under active development.

### ✅ **What's Working**
- [x] Project setup and configuration
- [x] Mobile-optimized UI framework
- [x] Development environment
- [x] Basic navigation structure

### 🔄 **Currently Building**
- [ ] Core task management features
- [ ] User authentication flow
- [ ] Task CRUD operations
- [ ] Mobile-specific optimizations

### 📋 **Roadmap**
- [ ] iOS App Store deployment
- [ ] Android Play Store deployment
- [ ] Offline synchronization
- [ ] Push notifications
- [ ] Advanced task organization
- [ ] Web version (future consideration)

## 🏗️ Architecture

TaskFlow follows a **client-server architecture** with separate frontend and backend repositories:

```
📱 Mobile App (This Repo)          🔄 API Calls          🖥️ Backend Server
┌─────────────────────────────┐    ──────────────►    ┌─────────────────────────────┐
│                             │                       │                             │
│  React + Ionic Frontend     │    ◄──────────────    │     TaskFlow API            │
│  (taskflow-frontend)        │      JSON Data        │   (taskflow-api)            │
│                             │                       │                             │
└─────────────────────────────┘                       └─────────────────────────────┘
              │                                                     │
              │ Capacitor                                           │ Database
              ▼                                                     ▼
┌─────────────────────────────┐                       ┌─────────────────────────────┐
│                             │                       │                             │
│    Native Mobile Apps       │                       │       Database              │
│      (iOS / Android)        │                       │    (PostgreSQL/MySQL)      │
│                             │                       │                             │
└─────────────────────────────┘                       └─────────────────────────────┘
```

### 📦 **Required Repositories**
1. **Frontend** (This repo): [MrSSHH/taskflow-frontend](https://github.com/MrSSHH/taskflow-frontend)
2. **Backend API** (Required): [MrSSHH/taskflow-api](https://github.com/MrSSHH/taskflow-api)

## ⚡ Quick Start

### 🛠️ Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Mobile development tools** (for iOS/Android)

### 🚀 Setup Instructions

#### Step 1: Set Up the Backend API First

```bash
# Clone and set up the API backend
git clone https://github.com/MrSSHH/taskflow-api.git
cd taskflow-api

# Follow the setup instructions in the taskflow-api repository
# Make sure the API server is running before proceeding
```

> 🔥 **Critical**: The TaskFlow API must be running on your local machine before starting the frontend. Check the [API repository](https://github.com/MrSSHH/taskflow-api) for complete setup instructions.

#### Step 2: Set Up the Frontend

```bash
# Clone this repository
git clone https://github.com/MrSSHH/taskflow-frontend.git
cd taskflow-frontend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local
```

#### Step 3: Configure Environment Variables

Edit `.env.local` to point to your local API:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_API_VERSION=v1

# App Configuration
VITE_APP_NAME=TaskFlow
VITE_APP_VERSION=1.0.0
```

#### Step 4: Start Development

```bash
# Start the development server
npm run dev

# For mobile development, add platforms:
# iOS (requires macOS)
npm run build
npx cap add ios
npx cap open ios

# Android
npm run build
npx cap add android
npx cap open android
```

## 📱 Mobile Development

### 🍎 iOS Development
**Requirements:**
- macOS computer
- Xcode (latest version)
- iOS Simulator or physical iOS device
- Apple Developer account (for device testing)

```bash
# Install iOS dependencies
npm install
npm run build

# Add iOS platform
npx cap add ios

# Open in Xcode
npx cap open ios
```

### 🤖 Android Development
**Requirements:**
- Android Studio
- Android SDK
- Android Virtual Device (AVD) or physical Android device

```bash
# Install Android dependencies
npm install
npm run build

# Add Android platform
npx cap add android

# Open in Android Studio
npx cap open android
```

## 🛠️ Tech Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | UI framework and component management |
| **Ionic** | 7+ | Mobile-optimized UI components |
| **Capacitor** | 5+ | Native mobile app compilation |
| **TypeScript** | 5+ | Type-safe JavaScript development |
| **Vite** | Latest | Fast build tool and dev server |

### Mobile Capabilities
- 📱 **Native Device APIs** - Camera, notifications, file system
- 🔄 **Background sync** - Data synchronization when app is closed
- 📧 **Push notifications** - Stay updated with task reminders
- 📁 **Local storage** - Offline data persistence
- 🔐 **Secure storage** - Encrypted credential storage

## 📁 Project Structure
```
taskflow-frontend/
├── 📁 public/              # Static assets
├── 📁 src/
│   ├── 📁 components/      # Reusable UI components
│   ├── 📁 pages/          # Application pages/screens
│   ├── 📁 hooks/          # Custom React hooks
│   ├── 📁 services/       # API services and utilities
│   ├── 📁 store/          # Redux store configuration
│   ├── 📁 types/          # TypeScript type definitions
│   ├── 📁 utils/          # Helper functions
│   └── 📄 App.tsx         # Root application component
├── 📁 ios/                # iOS-specific files (Capacitor)
├── 📁 android/            # Android-specific files (Capacitor)
├── 📄 capacitor.config.ts # Capacitor configuration
└── 📄 package.json       # Project dependencies and scripts
```

## 🧪 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checks |
| `npm run test` | Run test suite |
| `npm run ionic:serve` | Start Ionic dev server |
| `npm run ionic:build` | Build with Ionic CLI |

## 🤝 Contributing

We welcome contributions to TaskFlow! This project is in early development and there are many opportunities to help.

### 🎯 Areas Where We Need Help

- 📱 **Mobile UI/UX** - Designing beautiful, intuitive mobile interfaces
- ⚡ **Performance** - Optimizing for mobile devices and slower networks
- 🔄 **API Integration** - Connecting frontend with backend services
- 🧪 **Testing** - Unit tests, integration tests, mobile testing
- 📚 **Documentation** - Improving setup guides and code documentation
- 🔐 **Security** - Mobile app security best practices
- 🌐 **Accessibility** - Making the app usable for everyone

### 🚀 Getting Started with Contributing

1. **Check the issues** - Look for "good first issue" labels
2. **Set up development environment** - Follow the setup instructions above
3. **Make sure both frontend and API are running**
4. **Fork the repository**
5. **Create a feature branch**: `git checkout -b feature/your-feature`
6. **Make your changes** and test on mobile devices
7. **Submit a pull request**

### 📋 Development Guidelines

- Use TypeScript for all new code
- Follow existing code style and patterns
- Test changes on both iOS and Android (if possible)
- Write meaningful commit messages
- Update documentation for new features

## ❓ Troubleshooting

### Common Issues

**Frontend won't start:**
- Make sure the TaskFlow API is running first
- Check that your `.env.local` file has the correct API URL
- Verify Node.js version (v18+)

**Mobile build fails:**
- Ensure you have the latest Xcode (iOS) or Android Studio (Android)
- Run `npx cap sync` after making changes
- Check that all dependencies are installed

**API connection errors:**
- Verify the API server is running on the correct port
- Check firewall settings
- Ensure API URL in `.env.local` matches your backend setup

### Getting Help

- 💬 **GitHub Discussions** - Ask questions and get help from the community
- 🐛 **Issue Tracker** - Report bugs and request features
- 📖 **API Documentation** - Check the [TaskFlow API docs](https://github.com/MrSSHH/taskflow-api)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MrSSHH**
- GitHub: [@MrSSHH](https://github.com/MrSSHH)
- Related Projects: [TaskFlow API](https://github.com/MrSSHH/taskflow-api)

## 🙏 Acknowledgments

Special thanks to:
- [Ionic Team](https://ionicframework.com/) for the amazing mobile framework
- [Capacitor Team](https://capacitorjs.com/) for seamless native integration
- [React Team](https://reactjs.org/) for the powerful UI framework
- The open-source community for inspiration and contributions

---

<div align="center">

**🔗 Don't forget to set up the [TaskFlow API](https://github.com/MrSSHH/taskflow-api) backend!**

**⭐ Star this repo if you find it useful!**

*Built with ❤️ for mobile productivity*

</div>
