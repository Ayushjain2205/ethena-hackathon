import "react-native-get-random-values";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  createPublicClient,
  http,
  parseUnits,
  formatUnits,
  encodeFunctionData,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { USDE_ABI, USDE_ADDRESS } from "./constants/usdeABI";
import "nativewind";

export default function USDESender() {
  const [recipientAddress, setRecipientAddress] = useState(
    "0xCafa93E9985793E2475bD58B9215c21Dbd421fD0"
  );
  const [amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [balance, setBalance] = useState("0");

  const PRIVATE_KEY = process.env.EXPO_PUBLIC_PRIVATE_KEY;
  const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);

  const publicClient = createPublicClient({
    chain: {
      id: 52085143,
      name: "Ble Testnet",
      network: "ble-testnet",
      nativeCurrency: {
        decimals: 18,
        name: "ETH",
        symbol: "ETH",
      },
      rpcUrls: {
        default: { http: ["https://testnet.rpc.ethena.fi"] },
        public: { http: ["https://testnet.rpc.ethena.fi"] },
      },
    },
    transport: http("https://testnet.rpc.ethena.fi"),
  });

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userBalance = await publicClient.readContract({
          address: USDE_ADDRESS,
          abi: USDE_ABI,
          functionName: "balanceOf",
          args: [account.address],
        });
        setBalance(formatUnits(userBalance, 18));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 15000);
    return () => clearInterval(interval);
  }, [account.address]);

  const handleInputChange = (setter) => (value) => {
    setErrorMessage("");
    setSuccessMessage("");
    setter(value);
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      if (!recipientAddress || !amount) {
        setErrorMessage("Please fill in all fields");
        return;
      }

      if (!recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        setErrorMessage("Invalid Ethereum address format");
        return;
      }

      if (isNaN(amount) || parseFloat(amount) <= 0) {
        setErrorMessage("Please enter a valid amount");
        return;
      }

      const amountInWei = parseUnits(amount, 18);
      const userBalance = parseUnits(balance, 18);

      if (amountInWei > userBalance) {
        setErrorMessage("Insufficient USDE balance");
        return;
      }

      const data = encodeFunctionData({
        abi: USDE_ABI,
        functionName: "transfer",
        args: [recipientAddress, amountInWei],
      });

      const [nonce, gasPrice] = await Promise.all([
        publicClient.getTransactionCount({ address: account.address }),
        publicClient.getGasPrice(),
      ]);

      const transaction = {
        to: USDE_ADDRESS,
        data,
        nonce,
        gasPrice,
        value: 0n,
        chainId: 52085143,
        from: account.address,
        gas: 100000n,
      };

      const signedTx = await account.signTransaction(transaction);
      const hash = await publicClient.sendRawTransaction({
        serializedTransaction: signedTx,
      });

      setSuccessMessage(`Transaction sent! Hash: ${hash}`);
      setRecipientAddress("");
      setAmount("");
    } catch (error) {
      console.log("Error details:", error);
      let message = "An error occurred";
      if (error.message) {
        message = error.message
          .split("\n")[0]
          .replace(/\b(reverted|execution|transaction)\b/gi, "")
          .replace(/\s+/g, " ")
          .trim();
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="flex-1 p-5">
          <Text className="text-2xl font-bold mb-8 text-gray-800 text-center">
            Send USDE Tokens
          </Text>

          <View className="bg-white p-4 rounded-xl mb-5 items-center">
            <Text className="text-sm text-gray-500 mb-1">
              Your USDE Balance
            </Text>
            <Text className="text-2xl font-bold text-gray-800">
              {parseFloat(balance).toFixed(4)} USDE
            </Text>
          </View>

          <View className="mb-5">
            <Text className="text-base mb-2 text-gray-700">
              Recipient Address
            </Text>
            <TextInput
              className={`bg-white p-4 rounded-xl border ${
                errorMessage ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="0x..."
              value={recipientAddress}
              onChangeText={handleInputChange(setRecipientAddress)}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className="mb-5">
            <Text className="text-base mb-2 text-gray-700">Amount (USDE)</Text>
            <TextInput
              className={`bg-white p-4 rounded-xl border ${
                errorMessage ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="0.0"
              value={amount}
              onChangeText={handleInputChange(setAmount)}
              keyboardType="decimal-pad"
            />
          </View>

          {errorMessage && (
            <View className="p-3 rounded-lg mb-5">
              <Text className="text-red-500 text-sm text-center">
                {errorMessage}
              </Text>
            </View>
          )}

          {successMessage && (
            <View className="p-3 rounded-lg mb-5">
              <Text className="text-green-600 text-sm text-center">
                {successMessage}
              </Text>
            </View>
          )}

          <TouchableOpacity
            className={`p-4 rounded-xl items-center mt-5 ${
              loading ? "bg-gray-400" : "bg-blue-500"
            }`}
            onPress={handleSend}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white text-lg font-semibold">
                Send USDE
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2c3e50",
    textAlign: "center",
  },
  balanceContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 14,
    color: "#95a5a6",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#34495e",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    textAlign: "center",
  },
  successText: {
    color: "#27ae60",
    fontSize: 14,
    textAlign: "center",
  },
  sendButton: {
    backgroundColor: "#3498db",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  sendButtonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
