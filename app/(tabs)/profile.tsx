import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
  Share,
  Printer,
  X,
  ExternalLink,
  Copy,
  CheckCircle2,
} from "lucide-react-native";
import { WebView } from "react-native-webview";
import * as Clipboard from "expo-clipboard";

const WALLET_ADDRESS = "0x37fcE72a7397E5FDdEe880F9AAafC26d0F751782";
const EXPLORER_BASE_URL = "https://testnet.explorer.ethena.fi/address/";

const transactions = [
  {
    id: "1",
    type: "Received",
    amount: "500 USDE",
    date: "2024-12-01",
    hash: "0x123...abc",
  },
  {
    id: "2",
    type: "Sent",
    amount: "0.2 ETH",
    date: "2024-11-30",
    hash: "0x456...def",
  },
  {
    id: "3",
    type: "Received",
    amount: "100 ALTURA",
    date: "2024-11-29",
    hash: "0x789...ghi",
  },
];

const QRCodeModal = ({
  visible,
  onClose,
  address,
}: {
  visible: boolean;
  onClose: () => void;
  address: string;
}) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `My Altura wallet address: ${address}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formatAddress = (addr: string) => {
    const midPoint = Math.ceil(addr.length / 2);
    return (
      <>
        <Text className="text-gray-600 font-sans text-center text-base">
          {addr.slice(0, midPoint)}
        </Text>
        <Text className="text-gray-600 font-sans text-center text-base">
          {addr.slice(midPoint)}
        </Text>
      </>
    );
  };

  const logoImage = require("../../assets/images/altura.png");
  console.log("Logo image:", logoImage);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[90%] bg-white rounded-[32px] overflow-hidden">
          {/* Header */}
          <View className="h-20 items-center justify-center relative bg-purple-600 px-4">
            <Text className="text-white font-sans text-2xl font-medium">
              Scan to Pay
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
            >
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="px-6 pt-10 pb-8 items-center bg-white">
            {/* QR Code */}
            <View
              className="bg-white rounded-3xl p-6 shadow-xl mb-10"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <QRCode
                value={address}
                size={220}
                color="black"
                backgroundColor="white"
                logo={logoImage || undefined}
                logoSize={60}
                logoBackgroundColor="white"
                logoBorderRadius={30}
              />
            </View>

            {/* Address */}
            <View className="bg-gray-50 rounded-3xl py-5 px-6 mb-10 w-full">
              <Text className="text-gray-600 font-sans text-center text-xl">
                rahul.altura
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row w-full justify-between">
              <TouchableOpacity
                onPress={handleShare}
                className="w-[45%] h-14 flex-row items-center justify-center space-x-2 bg-purple-600 rounded-full"
              >
                <Share size={20} color="white" />
                <Text className="text-white font-sans text-lg">Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                className="w-[45%] h-14 flex-row items-center justify-center space-x-2 bg-purple-600 rounded-full"
              >
                <Printer size={20} color="white" />
                <Text className="text-white font-sans text-lg">Print</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function Profile() {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [webViewTitle, setWebViewTitle] = useState("");

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My Altura wallet address: ${WALLET_ADDRESS}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = () => {
    console.log("Print QR Code");
  };

  const openTransaction = (hash: string) => {
    const url = `${EXPLORER_BASE_URL}${WALLET_ADDRESS}`;
    setWebViewUrl(url);
    setWebViewTitle("Transaction Details");
    setShowWebView(true);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(WALLET_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const openBlockExplorer = () => {
    const url = `${EXPLORER_BASE_URL}${WALLET_ADDRESS}`;
    setWebViewUrl(url);
    setWebViewTitle("Wallet Details");
    setShowWebView(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="p-6">
          {/* Profile Header */}
          <View className="flex-row items-center mb-6">
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              className="w-20 h-20 rounded-full mr-4"
            />
            <View>
              <Text className="text-2xl font-bold text-gray-800 font-sans">
                Rahul M
              </Text>
              <Text className="text-lg text-gray-600 font-sans">
                altura.id/rahul
              </Text>
            </View>
          </View>

          {/* Wallet Address */}
          <TouchableOpacity
            onPress={openBlockExplorer}
            className="bg-white rounded-lg p-4 shadow-sm mb-6 flex-row justify-between items-center"
          >
            <View>
              <Text className="text-sm text-gray-500 font-sans mb-1">
                Wallet Address
              </Text>
              <Text className="text-base text-gray-800 font-sans">
                {WALLET_ADDRESS.slice(0, 6)}...{WALLET_ADDRESS.slice(-4)}
              </Text>
            </View>
            <TouchableOpacity onPress={copyToClipboard}>
              {copied ? (
                <CheckCircle2 size={20} color="#10B981" />
              ) : (
                <Copy size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Balance Cards */}
          <View className="flex-row justify-between mb-6">
            <View className="bg-white rounded-lg p-4 shadow-sm w-[48%]">
              <Text className="text-sm text-gray-500 font-sans mb-1">
                USDE Balance
              </Text>
              <Text className="text-xl font-bold text-purple-600 font-sans">
                4,250.00
              </Text>
            </View>
            <View className="bg-white rounded-lg p-4 shadow-sm w-[48%]">
              <Text className="text-sm text-gray-500 font-sans mb-1">
                ETH Balance
              </Text>
              <Text className="text-xl font-bold text-purple-600 font-sans">
                2.5 ETH
              </Text>
            </View>
          </View>

          {/* QR Code Button */}
          <TouchableOpacity
            onPress={() => setShowQRCode(true)}
            className="bg-purple-600 p-4 rounded-lg items-center mb-6"
          >
            <Text className="text-white font-semibold text-lg font-sans">
              Show QR Code
            </Text>
          </TouchableOpacity>

          {/* Recent Transactions */}
          <View>
            <Text className="text-xl font-semibold mb-4 font-sans">
              Recent Transactions
            </Text>
            {transactions.map((tx) => (
              <TouchableOpacity
                key={tx.id}
                className="flex-row justify-between items-center bg-white p-4 rounded-lg mb-3 shadow-sm"
                onPress={() => openTransaction(tx.hash)}
              >
                <View>
                  <Text className="font-semibold text-lg font-sans">
                    {tx.type}
                  </Text>
                  <Text className="text-gray-600 font-sans">{tx.date}</Text>
                </View>
                <View className="items-end">
                  <Text
                    className={`text-lg font-sans ${
                      tx.type === "Received" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {tx.type === "Received" ? "+" : "-"}
                    {tx.amount}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-gray-400 mr-1 font-sans">
                      {tx.hash}
                    </Text>
                    <ExternalLink size={16} color="#9CA3AF" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <QRCodeModal
        visible={showQRCode}
        onClose={() => setShowQRCode(false)}
        address={WALLET_ADDRESS}
      />

      {/* WebView Modal */}
      <Modal visible={showWebView} animationType="slide">
        <SafeAreaView className="flex-1">
          <View className="flex-row justify-between items-center p-4 bg-purple-600">
            <Text className="text-white font-semibold text-lg font-sans">
              {webViewTitle}
            </Text>
            <TouchableOpacity onPress={() => setShowWebView(false)}>
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
          <WebView source={{ uri: webViewUrl }} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
