import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Button,
  Dimensions,
} from "react-native";
import { X, Flashlight, QrCode, Image as ImageIcon } from "lucide-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const FRAME_WIDTH = SCREEN_WIDTH * 0.7;

export default function PayScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [activeTab, setActiveTab] = useState<"scan" | "send">("scan");
  const [permission, requestPermission] = useCameraPermissions();
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (!isScanning) return;

    setIsScanning(false);
    router.push({
      pathname: "/pay",
      params: { code: data },
    });
  };

  const renderScanTab = () => (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        enableTorch={isFlashlightOn}
        barCodeScannerSettings={{
          barCodeTypes: ["qr"],
        }}
        onBarCodeScanned={handleBarCodeScanned}
      >
        {/* Rest of your camera view JSX remains the same */}
        <SafeAreaView style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <X color="white" size={24} />
            </TouchableOpacity>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                onPress={() => setIsFlashlightOn(!isFlashlightOn)}
              >
                <Flashlight color="white" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                activeOpacity={1}
                onPress={() => router.push("/money")}
              >
                <QrCode color="white" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.scannerFrameContainer}>
            <View style={styles.scannerFrame}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.uploadButton}>
              <ImageIcon color="white" size={20} style={{ marginRight: 8 }} />
              <Text style={styles.uploadButtonText}>Upload from gallery</Text>
            </TouchableOpacity>
            <Text style={styles.scanText}>Scan any QR code to pay</Text>
            <Text style={styles.paymentText}>Altura Pay • Credit • Debit</Text>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );

  // Rest of your component remains the same
  const renderSendTab = () => (
    <View style={styles.sendContainer}>
      <Text
        className="font-sans text-2xl font-semibold"
        style={styles.sendTitle}
      >
        Send Money
      </Text>
      <Text className="font-sans text-sm" style={styles.sendMessage}>
        This is where you'll implement the send money functionality.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "scan" ? styles.activeTab : null]}
          onPress={() => setActiveTab("scan")}
        >
          <Text className="font-sans font-semibold" style={styles.tabText}>
            Scan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "send" ? styles.activeTab : null]}
          onPress={() => setActiveTab("send")}
        >
          <Text className="font-sans font-semibold" style={styles.tabText}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "scan" ? renderScanTab() : renderSendTab()}
    </SafeAreaView>
  );
}

// Styles remain the same

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#9333EA",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  scannerFrameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerFrame: {
    width: FRAME_WIDTH,
    height: FRAME_WIDTH,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#9333EA",
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#9333EA",
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#9333EA",
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#9333EA",
    borderBottomRightRadius: 12,
  },
  bottomSection: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
  },
  scanText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paymentText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#8B5CF6",
  },
  activeTab: {
    backgroundColor: "#7C3AED",
  },
  tabText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  sendContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sendTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sendMessage: {
    textAlign: "center",
    fontSize: 16,
  },
});
