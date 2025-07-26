# ChoraAI - AI-Powered Cross-Chain Trading Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Internet Computer](https://img.shields.io/badge/Internet%20Computer-Motoko-blue)](https://internetcomputer.org/)
[![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-green)](https://developer.mozilla.org/)

## 🚀 Overview

ChoraAI is a revolutionary AI-powered trading platform built on the Internet Computer Protocol (ICP) that enables seamless cross-chain cryptocurrency trading through natural language interactions. Our platform combines advanced AI technology with blockchain infrastructure to provide users with an intuitive, secure, and efficient trading experience.

### ✨ Key Features

- **🤖 AI-Powered Trading**: Execute trades using natural language commands
- **🔗 Cross-Chain Support**: Trade across multiple blockchain networks (ICP, BTC, ETH, ckBTC, ckETH)
- **📊 Real-Time Portfolio Management**: Track and manage your assets across different chains
- **💬 Intelligent Chat Interface**: Get market insights and trading recommendations
- **🔒 Secure & Decentralized**: Built on Internet Computer for maximum security
- **📱 Modern UI/UX**: Beautiful, responsive interface with dark mode support

### 🏗️ Architecture

- **Backend**: Motoko smart contracts on Internet Computer
- **Frontend**: Modern HTML5/CSS3/JavaScript with responsive design
- **Blockchain Integration**: Multi-chain support with native ICP tokens
- **AI Engine**: Natural language processing for trading commands

## 🛠️ Installation & Setup

### Prerequisites

- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install) (v0.15.0 or later)
- [Node.js](https://nodejs.org/) (v16 or later)
- [Git](https://git-scm.com/)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/choraAI.git
   cd choraAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local Internet Computer replica**
   ```bash
   dfx start --background
   ```

4. **Deploy the smart contracts**
   ```bash
   dfx deploy
   ```

5. **Start the frontend development server**
   ```bash
   npm start
   ```

Your application will be available at `http://localhost:8080`

## 🚀 Deployment

### ICP Mainnet Deployment

1. **Configure your identity**
   ```bash
   dfx identity new production
   dfx identity use production
   ```

2. **Deploy to mainnet**
   ```bash
   dfx deploy --network ic
   ```

### ICP Playground Deployment

For quick testing, you can deploy to [ICP Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/):

1. Visit the ICP Playground
2. Upload your `main.mo` file
3. Click "Deploy" to deploy your canister

## 📚 API Documentation

### Smart Contract Functions

#### User Management
- `registerUser(name: Text, email: Text)` - Register a new user
- `getUser(userId: Principal)` - Get user information
- `getAllUsers()` - Get all registered users

#### Chat & AI Interactions
- `sendMessage(userId: Principal, message: Text)` - Send a chat message
- `getChatHistory(userId: Principal)` - Get user's chat history
- `processAICommand(userId: Principal, command: Text)` - Process AI trading commands

#### Portfolio Management
- `updatePortfolio(userId: Principal, asset: Text, amount: Float)` - Update portfolio
- `getPortfolio(userId: Principal)` - Get user's portfolio
- `getPortfolioValue(userId: Principal)` - Calculate total portfolio value

#### Trading
- `createTradeOrder(userId: Principal, orderType: Text, asset: Text, amount: Float, price: Float)` - Create trade order
- `getUserTrades(userId: Principal)` - Get user's trade history
- `getMarketData(asset: Text)` - Get current market data

## 🏗️ Project Structure

```
choraAI/
├── src/
│   ├── choraAI/
│   │   └── main.mo          # Main smart contract
│   └── choraAI_frontend/
│       ├── assets/
│       │   ├── index.html   # Main HTML file
│       │   ├── styles/      # CSS stylesheets
│       │   └── scripts/     # JavaScript files
│       └── src/
├── dfx.json                 # DFX configuration
├── package.json            # Node.js dependencies
└── README.md              # This file
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow Motoko coding standards
- Write comprehensive tests
- Update documentation for new features
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Internet Computer Documentation](https://internetcomputer.org/docs/)
- [Motoko Programming Language](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [DFX SDK Documentation](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [ICP Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/)

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Join our [Discord community](https://discord.gg/choraai)
- Follow us on [Twitter](https://twitter.com/choraai)

---

**Built with ❤️ on the Internet Computer**
