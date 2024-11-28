// screens/SimpleSender.js
import "react-native-get-random-values";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { createWalletClient, http, parseEther, createPublicClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// Let's create our sender component
export default function SimpleSender() {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Replace this with your private key (remove the '0x' prefix if present)
  const PRIVATE_KEY = process.env.EXPO_PUBLIC_PRIVATE_KEY;

  // Create account from private key
  const account = privateKeyToAccount(`0x${PRIVATE_KEY}`);

  // Define transport and client
  const transport = http("https://testnet.rpc.ethena.fi");

  // Create public client for reading from the blockchain
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
    transport: transport,
  });

  const handleSend = async () => {
    try {
      setLoading(true);

      // Basic validation
      if (!recipientAddress || !amount) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      // Convert amount to Wei
      const value = parseEther(amount);

      // Prepare the transaction
      const request = await publicClient.prepareTransactionRequest({
        account,
        to: recipientAddress,
        value,
      });

      // Send the transaction
      const hash = await publicClient.sendRawTransaction({
        serializedTransaction: await account.signTransaction(request),
      });

      Alert.alert("Success", `Transaction sent! Hash: ${hash}`, [
        { text: "OK" },
      ]);

      // Clear form
      setRecipientAddress("");
      setAmount("");
    } catch (error) {
      // Handle different types of errors
      let errorMessage = "An error occurred";
      if (error.message) {
        errorMessage = error.message.split("\n")[0]; // Get first line of error
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send ETH on Ble Testnet</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Recipient Address</Text>
        <TextInput
          style={styles.input}
          placeholder="0x..."
          value={recipientAddress}
          onChangeText={setRecipientAddress}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount (ETH)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.0"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
      </View>

      <TouchableOpacity
        style={[styles.sendButton, loading && styles.sendButtonDisabled]}
        onPress={handleSend}
        disabled={loading}
      >
        <Text style={styles.sendButtonText}>
          {loading ? "Sending..." : "Send ETH"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2c3e50",
    textAlign: "center",
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
