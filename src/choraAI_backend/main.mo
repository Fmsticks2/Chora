import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Map "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat32 "mo:base/Nat32";

actor ChoraAI {
    // Types for the ChoraAI system
    public type User = {
        id: Principal;
        username: Text;
        email: Text;
        createdAt: Int;
        totalTrades: Nat;
        portfolioValue: Float;
    };

    public type ChatMessage = {
        id: Nat;
        userId: Principal;
        message: Text;
        response: Text;
        timestamp: Int;
        messageType: Text; // "query", "trade_request", "portfolio_check"
    };

    public type Portfolio = {
        userId: Principal;
        assets: [(Text, Float)]; // (symbol, amount)
        totalValue: Float;
        lastUpdated: Int;
    };

    public type TradeOrder = {
        id: Nat;
        userId: Principal;
        fromAsset: Text;
        toAsset: Text;
        amount: Float;
        status: Text; // "pending", "completed", "failed"
        timestamp: Int;
    };

    // Stable storage
    private stable var userEntries : [(Principal, User)] = [];
    private stable var chatEntries : [(Nat, ChatMessage)] = [];
    private stable var portfolioEntries : [(Principal, Portfolio)] = [];
    private stable var tradeEntries : [(Nat, TradeOrder)] = [];
    private stable var nextChatId : Nat = 1;
    private stable var nextTradeId : Nat = 1;

    // Custom hash function for Nat values
    private func natHash(n: Nat) : Nat32 {
        Nat32.fromNat(n % (2**32 - 1))
    };

    // Runtime storage
    private var users = Map.fromIter<Principal, User>(userEntries.vals(), 10, Principal.equal, Principal.hash);
    private var chatHistory = Map.fromIter<Nat, ChatMessage>(chatEntries.vals(), 100, func(a: Nat, b: Nat) : Bool { a == b }, natHash);
    private var portfolios = Map.fromIter<Principal, Portfolio>(portfolioEntries.vals(), 10, Principal.equal, Principal.hash);
    private var trades = Map.fromIter<Nat, TradeOrder>(tradeEntries.vals(), 100, func(a: Nat, b: Nat) : Bool { a == b }, natHash);

    // System upgrade hooks
    system func preupgrade() {
        userEntries := Iter.toArray(users.entries());
        chatEntries := Iter.toArray(chatHistory.entries());
        portfolioEntries := Iter.toArray(portfolios.entries());
        tradeEntries := Iter.toArray(trades.entries());
    };

    system func postupgrade() {
        userEntries := [];
        chatEntries := [];
        portfolioEntries := [];
        tradeEntries := [];
    };

    // User Management
    public func registerUser(username: Text, email: Text) : async Result.Result<User, Text> {
        let caller = Principal.fromText(Principal.toText(Principal.fromActor(ChoraAI)));
        
        switch (users.get(caller)) {
            case (?existingUser) {
                #err("User already registered")
            };
            case null {
                let newUser : User = {
                    id = caller;
                    username = username;
                    email = email;
                    createdAt = Time.now();
                    totalTrades = 0;
                    portfolioValue = 0.0;
                };
                users.put(caller, newUser);
                
                // Initialize empty portfolio
                let portfolio : Portfolio = {
                    userId = caller;
                    assets = [];
                    totalValue = 0.0;
                    lastUpdated = Time.now();
                };
                portfolios.put(caller, portfolio);
                
                #ok(newUser)
            };
        }
    };

    public query func getUser(userId: Principal) : async ?User {
        users.get(userId)
    };

    public query func getAllUsers() : async [User] {
        Array.map<(Principal, User), User>(Iter.toArray(users.entries()), func((_, user)) = user)
    };

    // Chat System
    public func sendChatMessage(message: Text, messageType: Text) : async Result.Result<ChatMessage, Text> {
        let caller = Principal.fromText(Principal.toText(Principal.fromActor(ChoraAI)));
        
        switch (users.get(caller)) {
            case null {
                #err("User not registered")
            };
            case (?user) {
                let response = generateAIResponse(message, messageType);
                let chatMessage : ChatMessage = {
                    id = nextChatId;
                    userId = caller;
                    message = message;
                    response = response;
                    timestamp = Time.now();
                    messageType = messageType;
                };
                
                chatHistory.put(nextChatId, chatMessage);
                nextChatId += 1;
                
                #ok(chatMessage)
            };
        }
    };

    private func generateAIResponse(message: Text, messageType: Text) : Text {
        switch (messageType) {
            case "trade_request" {
                "I understand you want to make a trade. Let me analyze the market conditions and execute your request safely."
            };
            case "portfolio_check" {
                "Here's your current portfolio status. Your assets are performing well across multiple chains."
            };
            case "market_analysis" {
                "Based on current market data, I recommend diversifying across ICP, ETH, and BTC for optimal returns."
            };
            case _ {
                "Hello! I'm your AI trading assistant. I can help you with portfolio management, trading, and market analysis. How can I assist you today?"
            };
        }
    };

    public query func getChatHistory(userId: Principal) : async [ChatMessage] {
        let allChats = Iter.toArray(chatHistory.entries());
        Array.mapFilter<(Nat, ChatMessage), ChatMessage>(
            allChats,
            func((_, chat)) {
                if (chat.userId == userId) {
                    ?chat
                } else {
                    null
                }
            }
        )
    };

    // Portfolio Management
    public func updatePortfolio(assets: [(Text, Float)]) : async Result.Result<Portfolio, Text> {
        let caller = Principal.fromText(Principal.toText(Principal.fromActor(ChoraAI)));
        
        switch (users.get(caller)) {
            case null {
                #err("User not registered")
            };
            case (?user) {
                let totalValue = Array.foldLeft<(Text, Float), Float>(
                    assets,
                    0.0,
                    func(acc, (_, amount)) = acc + amount
                );
                
                let portfolio : Portfolio = {
                    userId = caller;
                    assets = assets;
                    totalValue = totalValue;
                    lastUpdated = Time.now();
                };
                
                portfolios.put(caller, portfolio);
                
                // Update user's portfolio value
                let updatedUser : User = {
                    id = user.id;
                    username = user.username;
                    email = user.email;
                    createdAt = user.createdAt;
                    totalTrades = user.totalTrades;
                    portfolioValue = totalValue;
                };
                users.put(caller, updatedUser);
                
                #ok(portfolio)
            };
        }
    };

    public query func getPortfolio(userId: Principal) : async ?Portfolio {
        portfolios.get(userId)
    };

    // Trading System
    public func createTradeOrder(fromAsset: Text, toAsset: Text, amount: Float) : async Result.Result<TradeOrder, Text> {
        let caller = Principal.fromText(Principal.toText(Principal.fromActor(ChoraAI)));
        
        switch (users.get(caller)) {
            case null {
                #err("User not registered")
            };
            case (?user) {
                let tradeOrder : TradeOrder = {
                    id = nextTradeId;
                    userId = caller;
                    fromAsset = fromAsset;
                    toAsset = toAsset;
                    amount = amount;
                    status = "pending";
                    timestamp = Time.now();
                };
                
                trades.put(nextTradeId, tradeOrder);
                nextTradeId += 1;
                
                // Update user's total trades
                let updatedUser : User = {
                    id = user.id;
                    username = user.username;
                    email = user.email;
                    createdAt = user.createdAt;
                    totalTrades = user.totalTrades + 1;
                    portfolioValue = user.portfolioValue;
                };
                users.put(caller, updatedUser);
                
                #ok(tradeOrder)
            };
        }
    };

    public func updateTradeStatus(tradeId: Nat, status: Text) : async Result.Result<TradeOrder, Text> {
        switch (trades.get(tradeId)) {
            case null {
                #err("Trade not found")
            };
            case (?trade) {
                let updatedTrade : TradeOrder = {
                    id = trade.id;
                    userId = trade.userId;
                    fromAsset = trade.fromAsset;
                    toAsset = trade.toAsset;
                    amount = trade.amount;
                    status = status;
                    timestamp = trade.timestamp;
                };
                
                trades.put(tradeId, updatedTrade);
                #ok(updatedTrade)
            };
        }
    };

    public query func getUserTrades(userId: Principal) : async [TradeOrder] {
        let allTrades = Iter.toArray(trades.entries());
        Array.mapFilter<(Nat, TradeOrder), TradeOrder>(
            allTrades,
            func((_, trade)) {
                if (trade.userId == userId) {
                    ?trade
                } else {
                    null
                }
            }
        )
    };

    // Market Data (Mock implementation)
    public query func getMarketPrice(symbol: Text) : async Float {
        switch (symbol) {
            case "ICP" { 12.45 };
            case "BTC" { 43250.80 };
            case "ETH" { 2680.30 };
            case "ckBTC" { 43200.00 };
            case "ckETH" { 2675.50 };
            case _ { 0.0 };
        }
    };

    public query func getSupportedAssets() : async [Text] {
        ["ICP", "BTC", "ETH", "ckBTC", "ckETH"]
    };

    // System Functions
    public query func healthCheck() : async Text {
        "ChoraAI backend is running successfully!"
    };

    public query func getSystemStats() : async {
        totalUsers: Nat;
        totalChats: Nat;
        totalTrades: Nat;
        supportedAssets: Nat;
        timestamp: Int;
    } {
        {
            totalUsers = users.size();
            totalChats = chatHistory.size();
            totalTrades = trades.size();
            supportedAssets = 5;
            timestamp = Time.now();
        }
    };

    // Legacy functions for backward compatibility
    public func greet(name : Text) : async Text {
        "Hello, " # name # "! Welcome to ChoraAI - Your AI-Powered Trading Assistant."
    };

    public func getCurrentTime() : async Int {
        Time.now()
    };
}