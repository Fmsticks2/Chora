# ChoraAI - IntentSwap AI Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Internet Computer](https://img.shields.io/badge/Internet%20Computer-Motoko-blue)](https://internetcomputer.org/)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🚀 Overview

ChoraAI is an advanced AI-powered decentralized exchange (DEX) built on the Internet Computer Protocol (ICP) that revolutionizes cryptocurrency trading through natural language interactions. Our platform, branded as "IntentSwap AI", combines cutting-edge AI technology with modern web technologies to provide users with an intuitive, secure, and efficient trading experience.

### ✨ Key Features

- **🤖 Natural Language Trading**: Execute complex trades using simple English commands
- **🔗 Cross-Chain Support**: Trade across multiple blockchain networks (ICP, BTC, ETH, ckBTC, ckETH)
- **📊 Real-Time Portfolio Management**: Advanced portfolio tracking with beautiful visualizations
- **💬 AI-Powered Chat Interface**: Get intelligent market insights and trading recommendations
- **🔒 MEV Protection**: Advanced protection against Maximum Extractable Value attacks
- **📱 Modern UI/UX**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **🌙 Dark Mode**: Elegant dark theme with smooth animations
- **📚 Comprehensive Documentation**: Built-in documentation system with interactive guides

### 🏗️ Architecture

- **Backend**: Motoko smart contracts on Internet Computer
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and Radix UI components
- **Blockchain Integration**: Multi-chain support with Web3 wallet connections
- **AI Engine**: Advanced natural language processing for trading intents
- **State Management**: React hooks with modern state management patterns

## 🛠️ Installation & Setup

### Prerequisites

- [DFX](https://internetcomputer.org/docs/current/developer-docs/setup/install/) (Internet Computer SDK)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Fmsticks2/Chora.git
   cd choraAI
   ```

2. **Install frontend dependencies**
   ```bash
   cd src/choraAI_frontend
   npm install
   ```

3. **Start the local Internet Computer replica**
   ```bash
   cd ../..
   dfx start --background
   ```

4. **Deploy the canisters**
   ```bash
   dfx deploy
   ```

5. **Start the development server**
   ```bash
   cd src/choraAI_frontend
   npm run dev
   ```

   Navigate to `http://localhost:3000` in your browser.

### Production Build

1. **Build the frontend for production**
   ```bash
   cd src/choraAI_frontend
   npm run build
   ```

2. **Deploy to Internet Computer**
   ```bash
   cd ../..
   dfx deploy --network ic
   ```

## 🚀 Deployment

### Local Deployment

The application is automatically deployed locally when you run `dfx deploy`. The frontend will be available at the URL provided by DFX.

### Internet Computer Mainnet

To deploy to the Internet Computer mainnet:

1. **Acquire cycles** (ICP tokens converted to computational units)
2. **Deploy to mainnet**
   ```bash
   dfx deploy --network ic
   ```

3. **Your application will be available at**:
   ```
   https://<canister-id>.ic0.app
   ```

## 🛠️ Technologies Used

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **React Hooks**: Modern state management

### Backend
- **Motoko**: Native Internet Computer programming language
- **Internet Computer Protocol**: Decentralized cloud platform
- **DFX**: Internet Computer SDK

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Static Export**: Optimized production builds

## 🎯 Current Features

### ✅ Implemented
- Modern Next.js frontend with TypeScript
- Responsive design with Tailwind CSS
- Dark mode support
- Wallet connection interface
- Trading interface with AI chat
- Documentation system
- Multi-chain support UI
- Portfolio management interface
- Static export for IC deployment

### 🚧 In Development
- Backend Motoko smart contracts
- AI natural language processing
- Real-time trading execution
- Cross-chain bridge integration
- MEV protection mechanisms

## 🧪 Testing

### Running Tests

```bash
# Run TypeScript type checking
cd src/choraAI_frontend
npx tsc --noEmit

# Run frontend linting
npm run lint

# Build for production
npm run build
```

### Manual Testing

1. **Frontend Interface**: Test all UI components and interactions
2. **Wallet Connection**: Test wallet connection modal
3. **Trading Interface**: Test AI chat and trading forms
4. **Documentation**: Navigate through the docs system
5. **Responsive Design**: Test on different screen sizes

### ICP Playground Deployment

For quick testing, you can deploy to [ICP Playground](https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/):

1. Visit the ICP Playground
2. Upload your `main.mo` file
3. Click "Deploy" to deploy your canister

## 📚 API Documentation

### Backend Functions (Planned)

- `executeTradeIntent(intent: Text)` - Process natural language trading commands
- `getPortfolio(user: Principal)` - Retrieve user portfolio
- `connectChain(chainId: Text)` - Connect to external blockchain
- `getMarketData(asset: Text)` - Get current market data

### Frontend Components

- `TradingInterface` - Main trading interface with AI chat
- `WalletConnectModal` - Wallet connection functionality
- `Header` - Navigation and user controls
- `Sidebar` - Navigation menu
- `Docs` - Documentation system

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

## 📁 Project Structure

```
choraAI/
├── src/
│   ├── choraAI_backend/
│   │   ├── main.mo              # Main backend logic
│   │   ├── types.mo             # Type definitions
│   │   └── utils.mo             # Utility functions
│   └── choraAI_frontend/
│       ├── app/
│       │   ├── components/      # React components
│       │   │   ├── docs.tsx     # Documentation component
│       │   │   ├── header.tsx   # Header component
│       │   │   ├── sidebar.tsx  # Sidebar navigation
│       │   │   ├── trading-interface.tsx
│       │   │   ├── wallet-connect-modal.tsx
│       │   │   └── ui/          # Reusable UI components
│       │   ├── globals.css      # Global styles
│       │   ├── layout.tsx       # Root layout
│       │   └── page.tsx         # Main page
│       ├── lib/
│       │   └── utils.ts         # Utility functions
│       ├── types/
│       │   └── global.d.ts      # TypeScript global declarations
│       ├── public/              # Static assets
│       │   ├── images/
│       │   └── icons/
│       ├── out/                 # Static export output
│       ├── .next/               # Next.js build output
│       ├── next.config.js       # Next.js configuration
│       ├── tailwind.config.js   # Tailwind CSS configuration
│       ├── tsconfig.json        # TypeScript configuration
│       └── package.json         # Frontend dependencies
├── dfx.json                     # DFX configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 🤝 Contributing

We welcome contributions to ChoraAI! Here's how you can help:

### Development Workflow

1. **Fork the repository**
   ```bash
   git fork https://github.com/Fmsticks2/Chora.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add TypeScript types for new code
   - Update documentation as needed

4. **Test your changes**
   ```bash
   cd src/choraAI_frontend
   npm run build
   npx tsc --noEmit
   ```

5. **Submit a pull request**
   - Provide a clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

### Code Style Guidelines

- Use TypeScript for all new frontend code
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Add proper error handling and loading states

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Internet Computer Protocol** - Decentralized cloud platform
- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Motoko Community** - Smart contract development

## 📞 Support & Community

Get help and connect with the community:

- 🐛 **Issues**: [GitHub Issues](https://github.com/Fmsticks2/Chora/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Fmsticks2/Chora/discussions)
- 🐦 **Twitter**: [@ChoraAI](https://twitter.com/ChoraAI)
- 📧 **Email**: support@choraai.com

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Next.js frontend with TypeScript
- [x] Modern UI with Tailwind CSS
- [x] Wallet connection interface
- [x] Trading interface mockup
- [x] Documentation system

### Phase 2: Backend Integration 🚧
- [ ] Motoko smart contracts
- [ ] User authentication
- [ ] Portfolio management
- [ ] Basic trading functionality

### Phase 3: AI Integration 🔮
- [ ] Natural language processing
- [ ] Intent recognition system
- [ ] AI-powered trading recommendations
- [ ] Advanced market analysis

### Phase 4: Cross-Chain 🌐
- [ ] Multi-chain bridge integration
- [ ] Cross-chain asset transfers
- [ ] MEV protection implementation
- [ ] Advanced DeFi integrations

---

**Built with ❤️ on the Internet Computer | Powered by Next.js & TypeScript**
