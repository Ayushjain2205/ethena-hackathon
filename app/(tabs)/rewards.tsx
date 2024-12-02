import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import { ArrowLeft, MoreVertical } from "lucide-react-native";
// Remove this line
//import ScratchCard from 'rn-scratch-card';

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

interface ScratchCardProps {
  onReveal: (amount: number) => void;
  onClose: () => void;
}

const ScratchCardOverlay: React.FC<ScratchCardProps> = ({
  onReveal,
  onClose,
}) => {
  const amount = useRef(
    Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0
  ).current;
  const [scratched, setScratched] = useState(false);

  const handleScratch = () => {
    setScratched(true);
    onReveal(amount);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(147, 51, 234, 0.9)",
      }}
    >
      <View
        style={{
          width: SCREEN_WIDTH - 40,
          height: SCREEN_WIDTH - 40,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <TouchableOpacity onPress={handleScratch} style={{ flex: 1 }}>
          {scratched ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#9333EA",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 32, fontWeight: "bold" }}
              >
                ${amount.toFixed(2)}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#7C3AED",
              }}
            >
              <Text style={{ color: "white", fontSize: 24 }}>
                Scratch here!
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}
        onPress={onClose}
      >
        <Text style={{ color: "#9333EA", fontSize: 16, fontWeight: "bold" }}>
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Rewards() {
  const [totalRewards, setTotalRewards] = useState(469);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const streak = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleReveal = (amount: number) => {
    setTotalRewards((prev) => prev + amount);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#9333EA" }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
        }}
      >
        <TouchableOpacity>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          ${totalRewards} total rewards
        </Text>
        <TouchableOpacity>
          <MoreVertical color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Payment Streak */}
      <View
        style={{
          flexDirection: "row",
          padding: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {streak.map((day, index) => (
          <View
            key={day}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor:
                index < 5
                  ? "#22C55E"
                  : index === 5
                  ? "#F59E0B"
                  : "rgba(255,255,255,0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {index === 4 && (
              <Text style={{ color: "white", fontSize: 12 }}>5</Text>
            )}
            {index === 5 && (
              <Text style={{ color: "white", fontSize: 12 }}>6</Text>
            )}
          </View>
        ))}
      </View>

      {/* Reward Cards */}
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
          marginLeft: 16,
          marginTop: 16,
        }}
      >
        Your rewards
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 8 }}>
        {[...Array(6)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: CARD_WIDTH,
              height: CARD_WIDTH,
              backgroundColor: "#7C3AED",
              borderRadius: 16,
              margin: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setShowScratchCard(true)}
          >
            <View style={{ opacity: 0.6 }}>
              <Text style={{ color: "white", fontSize: 24 }}>🎁 🏆 💰</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scratch Card Modal */}
      <Modal visible={showScratchCard} transparent={true} animationType="fade">
        <ScratchCardOverlay
          onReveal={handleReveal}
          onClose={() => setShowScratchCard(false)}
        />
      </Modal>
    </SafeAreaView>
  );
}
