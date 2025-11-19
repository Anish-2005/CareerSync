# CareerSync 🚀

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase)](https://firebase.google.com/)

**Next-Generation Career Intelligence Platform**

*Transform your career journey with AI-powered insights, intelligent networking, and cutting-edge visual design.*

[🌐 Live Demo](https://careersync.vercel.app) • [📖 Documentation](#) • [🐛 Report Bug](https://github.com/Anish-2005/CareerSync/issues) • [✨ Request Feature](https://github.com/Anish-2005/CareerSync/issues)

![CareerSync Dashboard](https://via.placeholder.com/1200x600/0a1428/00d4ff?text=CareerSync+Dashboard+Preview)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 What's New](#-whats-new)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🎨 Design Philosophy](#-design-philosophy)
- [📊 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)
- [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ Features

### 🎨 **Modern UI/UX**
- **Cyberpunk Design**: Futuristic aesthetic with gradient effects and particle systems
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Framer Motion-powered interactions and 3D transforms
- **Dark/Light Themes**: Automatic theme switching with custom theme system

### 📊 **Dashboard & Analytics**
- **Real-time Metrics**: Live career performance tracking and statistics
- **Application Management**: Track job applications with status updates
- **Progress Visualization**: Interactive charts and progress indicators
- **Achievement System**: Gamified career milestones and rewards

### 📝 **Resume Builder**
- **Multiple Templates**: Professional, Modern, Creative, Minimalist, and Executive designs
- **Live Preview**: Real-time resume preview with PDF export
- **Smart Sections**: Personal info, experience, education, skills, and projects
- **Template Customization**: Theme-aware styling and responsive layouts

### 🔍 **Job Search & Tracking**
- **Advanced Filtering**: Search and filter jobs by location, company, and type
- **Application Tracking**: Monitor application status and follow-ups
- **Saved Jobs**: Bookmark interesting opportunities
- **Application History**: Complete timeline of your job search journey

### 🤖 **AI-Powered Features**
- **Smart Recommendations**: AI-driven job and career suggestions
- **Resume Optimization**: Intelligent resume improvement suggestions
- **Career Insights**: Predictive analytics for career trajectory
- **Networking Suggestions**: AI-powered professional connection recommendations

### 🔐 **Security & Privacy**
- **Firebase Authentication**: Secure user authentication and session management
- **Data Encryption**: Enterprise-grade data protection
- **Privacy Controls**: Granular privacy settings and data management
- **GDPR Compliant**: European privacy regulation compliance

---

## 🎯 What's New

### 🚀 **Latest Updates (v2.0.0)**

<div align="center">

| Feature | Status | Description |
|---------|--------|-------------|
| ✅ **Resume Builder** | Complete | Full-featured resume creation with 5 templates |
| ✅ **Job Applications** | Complete | Track and manage job applications |
| ✅ **Dashboard Analytics** | Complete | Real-time career metrics and insights |
| ✅ **Mobile Responsiveness** | Complete | Optimized for all device sizes |
| ✅ **Theme System** | Complete | Dark/light mode with custom themes |
| 🔄 **AI Integration** | In Progress | Smart recommendations and insights |
| 📋 **User Profiles** | In Progress | Enhanced user profile management |

</div>

### 📈 **Recent Improvements**
- **Enhanced Mobile UI**: Improved responsive design across all components
- **Icon System**: Replaced emojis with Lucide React icons for consistency
- **PDF Export**: High-quality resume PDF generation
- **Performance**: Optimized animations and loading states
- **Accessibility**: WCAG compliant design patterns

---

## 🛠️ Tech Stack

### **Frontend Framework**
```typescript
Next.js 16        // React framework with App Router
React 19         // Latest React with concurrent features
TypeScript       // Type-safe development
```

### **UI & Styling**
```typescript
Framer Motion    // Advanced animations and gestures
Tailwind CSS 4   // Utility-first CSS framework
Radix UI        // Accessible component primitives
Lucide React    // Beautiful, consistent icons
```

### **Backend & Database**
```typescript
Next.js API Routes // Serverless API endpoints
MongoDB          // NoSQL database with Mongoose
Firebase Auth    // User authentication
Firebase Admin   // Server-side Firebase operations
```

### **Additional Libraries**
```typescript
jsPDF           // PDF generation
html2canvas     // HTML to canvas conversion
date-fns        // Date manipulation utilities
```

### **Development Tools**
```bash
ESLint         # Code linting and formatting
PostCSS        # CSS processing and optimization
TypeScript     # Type checking and compilation
```

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Firebase** project with authentication enabled

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anish-2005/CareerSync.git
   cd CareerSync
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

   # MongoDB Configuration
   MONGODB_URI=your_mongodb_connection_string

   # Other settings
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use Docker
docker build -t careersync .
docker run -p 3000:3000 careersync
```

---

## 📁 Project Structure

```
CareerSync/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/                 # API routes
│   │   │   ├── 📁 applications/    # Application management
│   │   │   ├── 📁 jobs/           # Job search endpoints
│   │   │   ├── 📁 profile/        # User profile APIs
│   │   │   └── 📁 user/           # User management
│   │   ├── 📁 dashboard/          # Dashboard page
│   │   ├── 📁 jobs/              # Job search page
│   │   ├── 📁 login/             # Authentication
│   │   ├── 📁 profile/           # User profile
│   │   ├── 📁 resume-builder/    # Resume creation
│   │   ├── 📄 globals.css        # Global styles
│   │   ├── 📄 layout.tsx         # Root layout
│   │   └── 📄 page.tsx           # Landing page
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 dashboard/         # Dashboard components
│   │   ├── 📁 landing/           # Landing page components
│   │   └── 📁 ui/                # UI primitives
│   ├── 📁 contexts/              # React contexts
│   ├── 📁 hooks/                 # Custom hooks
│   ├── 📁 lib/                   # Utility libraries
│   └── 📁 models/                # Database models
├── 📁 public/                    # Static assets
├── 📄 package.json               # Dependencies
├── 📄 tailwind.config.js         # Tailwind config
├── 📄 next.config.ts             # Next.js config
├── 📄 eslint.config.mjs          # ESLint config
└── 📄 README.md                  # Documentation
```

---

## 🎨 Design Philosophy

CareerSync embraces a **cyberpunk-futuristic aesthetic** that combines:

### 🎯 **Core Principles**
- **✨ Immersive Experience**: Dynamic animations and particle systems
- **🎨 Visual Hierarchy**: Clear information architecture with modern typography
- **📱 Mobile-First**: Responsive design that works beautifully on all devices
- **♿ Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### 🎨 **Visual Elements**
- **Gradient Backgrounds**: Dynamic color schemes that adapt to user preferences
- **Particle Systems**: Interactive visual effects that respond to user actions
- **3D Transforms**: Depth and dimensionality in component interactions
- **Smooth Transitions**: Fluid animations that guide user attention

### 🎭 **Theme System**
- **Dark Mode**: Cyberpunk-inspired dark theme with neon accents
- **Light Mode**: Clean, professional light theme with subtle gradients
- **Auto-Switching**: Respects system preferences and user settings
- **Custom Themes**: Extensible theme system for future customization

---

## 📊 API Endpoints

### **Authentication**
```
POST   /api/auth/login          # User login
POST   /api/auth/register       # User registration
POST   /api/auth/logout         # User logout
GET    /api/auth/session        # Get current session
```

### **Jobs**
```
GET    /api/jobs                # Get jobs with filtering
GET    /api/jobs/[id]           # Get specific job
POST   /api/jobs                # Create new job (admin)
PUT    /api/jobs/[id]           # Update job (admin)
DELETE /api/jobs/[id]           # Delete job (admin)
```

### **Applications**
```
GET    /api/applications        # Get user applications
POST   /api/applications        # Create new application
PUT    /api/applications/[id]   # Update application
DELETE /api/applications/[id]   # Delete application
```

### **Profile**
```
GET    /api/profile             # Get user profile
PUT    /api/profile             # Update user profile
POST   /api/profile/resume      # Upload resume
GET    /api/profile/resume      # Download resume
```

### **User Management**
```
GET    /api/user/achievements    # Get user achievements
POST   /api/user/achievements    # Unlock achievement
PUT    /api/user/stats          # Update user statistics
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🚀 **Getting Started**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### 📝 **Development Guidelines**

- **Code Style**: Follow TypeScript and ESLint rules
- **Commits**: Use conventional commit messages
- **Testing**: Add tests for new features
- **Documentation**: Update README for significant changes
- **Performance**: Optimize animations and bundle size

### 🐛 **Reporting Issues**

- Use [GitHub Issues](https://github.com/Anish-2005/CareerSync/issues) for bugs
- Provide detailed reproduction steps
- Include browser and device information
- Attach screenshots for UI issues

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Anish

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
```

---

## 📞 Contact

<div align="center">

**Anish** - *Project Lead & Full-Stack Developer*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Anish-2005)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/anish)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/anish_dev)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contact@careersync.dev)

**Project Links:**
- 🏠 [Website](https://careersync.vercel.app)
- 📚 [Documentation](https://docs.careersync.dev)
- 🐛 [Bug Reports](https://github.com/Anish-2005/CareerSync/issues)
- 💡 [Feature Requests](https://github.com/Anish-2005/CareerSync/discussions)

</div>

---

## 🙏 Acknowledgments

### **Core Technologies**
- **[Next.js](https://nextjs.org/)** - The React framework that powers our application
- **[Framer Motion](https://www.framer.com/motion/)** - Incredible animation capabilities
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[MongoDB](https://www.mongodb.com/)** - Flexible NoSQL database
- **[Firebase](https://firebase.google.com/)** - Authentication and hosting

### **Community & Inspiration**
- **Open Source Community** - For the amazing tools and libraries
- **Design Inspiration** - Cyberpunk and futuristic UI trends
- **Contributors** - Everyone who helps make CareerSync better

### **Special Thanks**
- **React Team** - For the amazing React ecosystem
- **Vercel** - For hosting and deployment platform
- **GitHub** - For version control and collaboration

---

<div align="center">

## 🌟 **Show Your Support**

If you find CareerSync helpful, please give it a ⭐️ on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/Anish-2005/CareerSync?style=social)](https://github.com/Anish-2005/CareerSync/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Anish-2005/CareerSync?style=social)](https://github.com/Anish-2005/CareerSync/network/members)

---

**CareerSync** - *Sync your career trajectory with the future.* 🚀

*Built with ❤️ using Next.js, React, and TypeScript*

</div>