import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@realm/react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Review } from "./models/Review";
import { ReviewRealmContext } from "./models";
import { ReviewManager } from "./components/ReviewManager";
import { MapScreen } from "./components/MapScreen";
import colors from "./styles/colors";
import { MaterialIcons } from "@expo/vector-icons";

const { useRealm, useQuery } = ReviewRealmContext;

export const AppSync = () => {
  const realm = useRealm();
  const user = useUser();
  const result = useQuery(Review);
  const [activeTab, setActiveTab] = useState("reviews");

  const reviews = useMemo(() => result.sorted("createdAt"), [result]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(realm.objects(Review));
    });
  }, [realm, result]);

  const handleLogout = useCallback(() => {
    user?.logOut();
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FoodRatingApp</Text>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={22} color={colors.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {activeTab === "reviews" ? (
          <ReviewManager reviews={reviews} userId={user?.id} />
        ) : (
          <MapScreen />
        )}
      </View>

      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, activeTab === "reviews" && styles.tabActive]}
          onPress={() => setActiveTab("reviews")}
        >
          <MaterialIcons
            name="rate-review"
            size={24}
            color={
              activeTab === "reviews" ? colors.purple : colors.darkGray
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "reviews" && styles.tabTextActive,
            ]}
          >
            Reviews
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "map" && styles.tabActive]}
          onPress={() => setActiveTab("map")}
        >
          <MaterialIcons
            name="map"
            size={24}
            color={
              activeTab === "map" ? colors.purple : colors.darkGray
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "map" && styles.tabTextActive,
            ]}
          >
            Map
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.purple,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.purpleDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: {
    color: colors.white,
    fontWeight: "600",
    marginLeft: 4,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    backgroundColor: colors.white,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabActive: {
    borderTopWidth: 2,
    borderTopColor: colors.purple,
  },
  tabText: {
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 2,
  },
  tabTextActive: {
    color: colors.purple,
    fontWeight: "600",
  },
});
