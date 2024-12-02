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
    if (confettiRef.current) {
      confettiRef.current.reset();
      confettiRef.current.play();
    }
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
        <View style={styles.cardContent}>
          {revealed ? (
            <Text style={styles.rewardAmount}>${amount.toFixed(2)}</Text>
          ) : (
            <Text style={styles.giftEmoji}>🎁</Text>
          )}
        </View>
        <LottieView
          ref={confettiRef}
          source={require("../../assets/confetti.json")}
          style={styles.confetti}
          loop={false}
          speed={0.7}
          autoPlay={false}
        />
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
          <TouchableOpacity style={styles.headerButton}>
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.totalRewards}>${totalRewards} total rewards</Text>
          <TouchableOpacity style={styles.headerButton}>
            <MoreVertical color="white" size={24} />
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
                      : "rgba(255, 255, 255, 0.2)",
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
              disabled={scratchedCards[index]}
            >
              <View
                style={[
                  styles.card,
                  scratchedCards[index]
                    ? styles.scratchedCard
                    : styles.unscratchedCard,
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
    backgroundColor: "#9333EA",
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  totalRewards: {
    color: "white",
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
    color: "white",
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
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  unscratchedCard: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  scratchedCard: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
    backgroundColor: "#9333EA",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayCard: {
    width: SCREEN_WIDTH * 0.8,
    aspectRatio: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  cardContent: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  rewardAmount: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
  },
  confetti: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    zIndex: 1,
  },
  revealButton: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
