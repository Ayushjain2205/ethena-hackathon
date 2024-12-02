import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ArrowLeft, MoreVertical } from "lucide-react-native";
import LottieView from "lottie-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

interface ScratchCardProps {
  onReveal: (amount: number) => void;
  onClose: () => void;
  amount: number;
}

const ScratchCardOverlay: React.FC<ScratchCardProps> = ({
  onReveal,
  onClose,
  amount,
}) => {
  const [revealed, setRevealed] = useState(false);
  const confettiRef = useRef<LottieView>(null);

  const handleReveal = () => {
    setRevealed(true);
    onReveal(amount);
    confettiRef.current?.play();
  };

  useEffect(() => {
    if (revealed) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [revealed, onClose]);

  return (
    <View style={styles.overlay}>
      <View style={styles.overlayCard}>
        {revealed ? (
          <View style={styles.revealedCard}>
            <Text style={styles.rewardAmount}>${amount.toFixed(2)}</Text>
            <LottieView
              ref={confettiRef}
              source={require("../../assets/confetti.json")}
              style={styles.confetti}
              loop={false}
            />
          </View>
        ) : (
          <View style={styles.unrevealedCard}>
            <Text style={styles.giftEmoji}>🎁</Text>
          </View>
        )}
      </View>
      {!revealed && (
        <TouchableOpacity style={styles.revealButton} onPress={handleReveal}>
          <Text style={styles.revealButtonText}>Reveal Reward</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function Rewards() {
  const [totalRewards, setTotalRewards] = useState(469);
  const [showScratchCard, setShowScratchCard] = useState(false);
  const [scratchedCards, setScratchedCards] = useState<boolean[]>(
    Array(6).fill(false)
  );
  const [cardAmounts, setCardAmounts] = useState<number[]>(
    Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10) + 1)
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const streak = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleReveal = (amount: number) => {
    setTotalRewards((prev) => prev + amount);
    if (selectedCardIndex !== null) {
      const newScratched = [...scratchedCards];
      newScratched[selectedCardIndex] = true;
      setScratchedCards(newScratched);
    }
  };

  const openScratchCard = (index: number) => {
    if (!scratchedCards[index]) {
      setSelectedCardIndex(index);
      setShowScratchCard(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <ArrowLeft color="#4338CA" size={24} />
          </TouchableOpacity>
          <Text style={styles.totalRewards}>${totalRewards} total rewards</Text>
          <TouchableOpacity>
            <MoreVertical color="#4338CA" size={24} />
          </TouchableOpacity>
        </View>

        {/* Payment Streak */}
        <View style={styles.streakContainer}>
          {streak.map((day, index) => (
            <View
              key={day}
              style={[
                styles.streakDay,
                {
                  backgroundColor:
                    index < 5
                      ? "#22C55E"
                      : index === 5
                      ? "#F59E0B"
                      : "rgba(67, 56, 202, 0.2)",
                },
              ]}
            >
              {index === 4 && <Text style={styles.streakText}>5</Text>}
              {index === 5 && <Text style={styles.streakText}>6</Text>}
            </View>
          ))}
        </View>

        {/* Reward Cards */}
        <Text style={styles.rewardsTitle}>Your rewards</Text>

        <View style={styles.cardsContainer}>
          {cardAmounts.map((amount, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cardWrapper}
              onPress={() => openScratchCard(index)}
            >
              <View
                style={[
                  styles.card,
                  scratchedCards[index] && styles.scratchedCard,
                ]}
              >
                {scratchedCards[index] ? (
                  <Text style={styles.cardAmount}>${amount.toFixed(2)}</Text>
                ) : (
                  <Text style={styles.giftEmoji}>🎁</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Scratch Card Modal */}
      <Modal visible={showScratchCard} transparent={true} animationType="fade">
        <ScratchCardOverlay
          onReveal={handleReveal}
          onClose={() => setShowScratchCard(false)}
          amount={
            selectedCardIndex !== null ? cardAmounts[selectedCardIndex] : 0
          }
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 20,
  },
  totalRewards: {
    color: "#4338CA",
    fontSize: 20,
    fontWeight: "600",
  },
  streakContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  streakDay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  streakText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  rewardsTitle: {
    color: "#4338CA",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    aspectRatio: 1,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#4338CA",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scratchedCard: {
    backgroundColor: "#3730A3",
  },
  cardAmount: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  giftEmoji: {
    fontSize: 40,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayCard: {
    width: SCREEN_WIDTH * 0.8,
    aspectRatio: 1,
    backgroundColor: "#4338CA",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    overflow: "hidden",
  },
  revealedCard: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  unrevealedCard: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rewardAmount: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    zIndex: 2,
  },
  confetti: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  revealButton: {
    marginTop: 20,
    backgroundColor: "#4338CA",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  revealButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
