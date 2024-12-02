import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import {
  ArrowUpRight,
  Receipt,
  Smartphone,
  Grid,
  ArrowUp,
  ArrowDown,
} from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";

const SCREEN_WIDTH = Dimensions.get("window").width;

const chartData = {
  labels: ["", "", "", "", "", ""],
  datasets: [
    {
      data: [180, 220, 290, 250, 300, 283.72],
      color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
    },
  ],
};

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        {/* Header */}
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, color: "#666" }}>Hi Rahul,</Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>
              Welcome back
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View
          style={{
            margin: 20,
            padding: 20,
            backgroundColor: "#9333EA",
            borderRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}>
              Your Balance is
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", marginRight: 4 }}>Withdraw</Text>
              <ArrowUpRight size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: "bold",
              marginVertical: 8,
            }}
          >
            $45,934.00
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ArrowUp size={16} color="#22C55E" />
            <Text style={{ color: "#22C55E", marginLeft: 4 }}>8.82% </Text>
            <Text style={{ color: "rgba(255,255,255,0.8)" }}>(+$876)</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginBottom: 20,
          }}
        >
          {[
            { icon: ArrowUpRight, label: "Send", color: "#22C55E" },
            { icon: Receipt, label: "Bill", color: "#EAB308" },
            { icon: Smartphone, label: "Mobile", color: "#9333EA" },
            { icon: Grid, label: "All", color: "#F97316" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: `${item.color}20`,
                padding: 16,
                borderRadius: 16,
                alignItems: "center",
                width: (SCREEN_WIDTH - 100) / 4,
              }}
            >
              <item.icon size={24} color={item.color} />
              <Text style={{ color: item.color, marginTop: 4, fontSize: 12 }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Cards */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginBottom: 20,
          }}
        >
          {/* Notion Card */}
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 16,
              marginRight: 10,
              borderWidth: 1,
              borderColor: "rgba(147, 51, 234, 0.1)",
            }}
          >
            <Text style={{ fontSize: 16, color: "#333", marginBottom: 8 }}>
              Notion
            </Text>
            <LineChart
              data={chartData}
              width={140}
              height={100}
              chartConfig={{
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
                strokeWidth: 2,
                propsForDots: {
                  r: "0",
                },
              }}
              bezier
              withHorizontalLabels={false}
              withVerticalLabels={false}
              withDots={false}
              style={{ paddingRight: 0 }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
              $283.72
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ArrowUp size={16} color="#22C55E" />
              <Text style={{ color: "#22C55E", marginLeft: 4 }}>+1.7%</Text>
            </View>
          </View>

          {/* Goals Card */}
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 16,
              marginLeft: 10,
              borderWidth: 1,
              borderColor: "rgba(147, 51, 234, 0.1)",
            }}
          >
            <Text style={{ fontSize: 16, color: "#333", marginBottom: 8 }}>
              Goals Achieved
            </Text>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: 8,
                }}
              >
                68%
              </Text>
              <View
                style={{
                  height: 4,
                  backgroundColor: "rgba(147, 51, 234, 0.1)",
                  borderRadius: 2,
                }}
              >
                <View
                  style={{
                    width: "68%",
                    height: "100%",
                    backgroundColor: "#9333EA",
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Transactions */}
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 16,
            }}
          >
            Transactions
          </Text>
          {[
            {
              name: "Google",
              date: "Nov 8, 16:32",
              amount: 190.54,
              change: 2.5,
              icon: "🔍",
              positive: true,
            },
            {
              name: "Apple",
              date: "Nov 5, 8:12",
              amount: 75.0,
              change: 2.5,
              icon: "🍎",
              positive: false,
            },
          ].map((transaction, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                backgroundColor: "white",
                borderRadius: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "rgba(147, 51, 234, 0.1)",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: "#9333EA20",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <Text style={{ fontSize: 20 }}>{transaction.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#333" }}
                >
                  {transaction.name}
                </Text>
                <Text style={{ fontSize: 14, color: "#666" }}>
                  {transaction.date}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#333" }}
                >
                  {transaction.positive ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {transaction.positive ? (
                    <ArrowUp size={12} color="#22C55E" />
                  ) : (
                    <ArrowDown size={12} color="#EF4444" />
                  )}
                  <Text
                    style={{
                      fontSize: 14,
                      color: transaction.positive ? "#22C55E" : "#EF4444",
                      marginLeft: 2,
                    }}
                  >
                    {transaction.change}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
