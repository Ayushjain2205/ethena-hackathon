import { StyleSheet, Pressable } from "react-native";
import { useState } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Hello World!</ThemedText>

      <Pressable
        onPress={() => setCount((prev) => prev + 1)}
        style={styles.button}
      >
        <ThemedText>Taps: {count}</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#4A90E2",
  },
});
