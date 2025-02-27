# Fluxtile - AI-Powered Assessment Platform

<div align="center">
  <img src="public/logo.png" alt="Fluxtile Logo" width="200"/>
  <p>Transform education with AI-powered assessment tools</p>

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

## 🌟 Overview

Fluxtile is a cutting-edge assessment platform that leverages artificial intelligence to revolutionize how educational institutions conduct and manage assessments. Our platform provides a comprehensive suite of tools for creating, administering, and evaluating assessments while ensuring fairness and accuracy.

### 🎯 Key Features

- **AI-Powered Grading**: Automated assessment grading with human-like understanding
- **Multi-tenant Architecture**: Dedicated subdomains for each institute
- **Role-based Access Control**: Tailored interfaces for administrators, teachers, and students
- **Real-time Analytics**: Comprehensive insights into student performance
- **Customizable Workflows**: Flexible assessment creation and management
- **Secure Environment**: Enterprise-grade security measures

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- MongoDB 6.0 or later
- Bun (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fluxtile.git
cd fluxtile
```

2. Install dependencies:

```bash
bun install
# or
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

4. Create a platform admin:

```bash
bun run create-admin
```

5. Start the development server:

```bash
bun run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: NextAuth.js
- **Email**: Nodemailer with custom templates
- **UI Components**: Radix UI, Framer Motion
- **State Management**: React Hooks
- **Forms**: React Hook Form
- **API**: RESTful with TypeScript types

### Directory Structure

```
src/
├── app/                 # Next.js 13+ App Router
├── components/         # Reusable UI components
├── lib/               # Utility functions and configurations
├── database/         # Database models and connections
├── types/            # TypeScript type definitions
├── styles/           # Global styles and Tailwind config
└── scripts/          # Utility scripts
```

## 🔐 Security

- JWT-based authentication
- Role-based access control
- Rate limiting
- Input validation
- XSS protection
- CSRF protection
- Secure password hashing

## 🌐 Deployment

The platform is designed to be deployed on various cloud providers:

- **Vercel** (Recommended)
- **AWS**
- **Google Cloud**
- **Azure**

Detailed deployment guides are available in the [deployment documentation](docs/deployment.md).

## 🧪 Testing

```bash
# Run unit tests
bun test

# Run integration tests
bun test:integration

# Run e2e tests
bun test:e2e
```

## 📚 Documentation

- [API Documentation](docs/api.md)
- [Authentication Guide](docs/auth.md)
- [Deployment Guide](docs/deployment.md)
- [Development Guide](docs/development.md)
- [Contributing Guide](CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [MongoDB](https://www.mongodb.com/)
- [OpenAI](https://openai.com/)

## 📞 Support

- Email: support@fluxtile.com
- [Discord Community](https://discord.gg/fluxtile)
- [Documentation](https://docs.fluxtile.com)

---

<div align="center">
  Made with ❤️ by the Fluxtile Team
</div>
