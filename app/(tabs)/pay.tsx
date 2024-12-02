import React, { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Button,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import {
  X,
  Flashlight,
  QrCode,
  Image as ImageIcon,
  Search,
  User,
} from "lucide-react-native";
import { router } from "expo-router";
import { useFonts } from "expo-font";

const SCREEN_WIDTH = Dimensions.get("window").width;
const FRAME_WIDTH = SCREEN_WIDTH * 0.7;

interface Contact {
  id: string;
  name: string;
  alturaId: string;
  avatar: string;
}

const contacts: Contact[] = [
  { id: "1", name: "Rahul", alturaId: "rahul.altura", avatar: "👨🏽‍💼" },
  { id: "2", name: "Priya", alturaId: "priya.altura", avatar: "👩🏽‍🎓" },
  { id: "3", name: "Amit", alturaId: "amit.altura", avatar: "👨🏽‍🍳" },
  { id: "4", name: "Neha", alturaId: "neha.altura", avatar: "👩🏽‍⚕️" },
  { id: "5", name: "Vikram", alturaId: "vikram.altura", avatar: "👨🏽‍💻" },
  { id: "6", name: "Anita", alturaId: "anita.altura", avatar: "👩🏽‍🔬" },
];

export default function PayScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [activeTab, setActiveTab] = useState<"scan" | "send">("scan");
  const [permission, requestPermission] = useCameraPermissions();
  const [searchQuery, setSearchQuery] = useState("");

  const [fontsLoaded] = useFonts({
    Bricolage: require("../../assets/fonts/BricolageGrotesque-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={[styles.message, styles.fontBricolage]}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const renderScanTab = () => (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {/* Header */}
        <SafeAreaView style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => {}}>
              <X color="white" size={24} />
            </TouchableOpacity>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Flashlight color="white" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 20 }}
                onPress={() => router.push("/money")}
                activeOpacity={1}
              >
                <QrCode color="white" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Scanner Frame */}
          <View style={styles.scannerFrameContainer}>
            <View style={styles.scannerFrame}>
              {/* Corners */}
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.uploadButton}>
              <ImageIcon color="white" size={20} style={{ marginRight: 8 }} />
              <Text style={[styles.uploadButtonText, styles.fontBricolage]}>
                Upload from gallery
              </Text>
            </TouchableOpacity>
            <Text style={[styles.scanText, styles.fontBricolage]}>
              Scan any QR code to pay
            </Text>
            <Text style={[styles.paymentText, styles.fontBricolage]}>
              Altura Pay • Credit • Debit
            </Text>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );

  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => router.push("/money")}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, styles.fontBricolage]}>
          {item.name}
        </Text>
        <Text style={[styles.contactAlturaId, styles.fontBricolage]}>
          {item.alturaId}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSendTab = () => (
    <View style={styles.sendContainer}>
      <View style={styles.searchContainer}>
        <Search color="#9333EA" size={20} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, styles.fontBricolage]}
          placeholder="Search contacts"
          placeholderTextColor="#9333EA"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={contacts.filter(
          (contact) =>
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.alturaId.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
        style={styles.contactList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "scan" ? styles.activeTab : null]}
          onPress={() => setActiveTab("scan")}
        >
          <Text
            style={[
              styles.tabText,
              styles.fontBricolage,
              { color: activeTab === "scan" ? "#9333EA" : "white" },
            ]}
          >
            Scan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "send" ? styles.activeTab : null]}
          onPress={() => setActiveTab("send")}
        >
          <Text
            style={[
              styles.tabText,
              styles.fontBricolage,
              { color: activeTab === "send" ? "#9333EA" : "white" },
            ]}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "scan" ? renderScanTab() : renderSendTab()}
    </SafeAreaView>
  );
}

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
    backgroundColor: "rgba(255,255,255,0.2)",
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
    backgroundColor: "#9333EA",
    borderRadius: 25,
    padding: 4,
    margin: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 21,
    backgroundColor: "#9333EA",
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  sendContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(147, 51, 234, 0.1)",
    borderRadius: 25,
    margin: 16,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#9333EA",
    fontSize: 16,
  },
  contactList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(147, 51, 234, 0.1)",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(147, 51, 234, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatar: {
    fontSize: 24,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  contactAlturaId: {
    fontSize: 14,
    color: "#666",
  },
  fontBricolage: {
    fontFamily: "Bricolage",
  },
});
