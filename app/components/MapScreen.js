import React, { useMemo } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Review } from "../models/Review";
import { ReviewRealmContext } from "../models";
import colors from "../styles/colors";

const { useQuery } = ReviewRealmContext;

const getRatingColor = (rating) => {
  if (rating >= 4) return colors.green;
  if (rating >= 3) return "#FFA500";
  if (rating >= 2) return "#FFD700";
  return colors.red;
};

export const MapScreen = () => {
  const reviews = useQuery(Review);

  const restaurantMarkers = useMemo(() => {
    const grouped = {};
    reviews.forEach((review) => {
      if (review.latitude != null && review.longitude != null) {
        const key = review.restaurant.toLowerCase().trim();
        if (!grouped[key]) {
          grouped[key] = {
            name: review.restaurant,
            latitude: review.latitude,
            longitude: review.longitude,
            address: review.address || "",
            ratings: [],
          };
        }
        grouped[key].ratings.push(review.vegRating);
      }
    });

    return Object.values(grouped).map((r) => ({
      ...r,
      averageRating:
        r.ratings.reduce((a, b) => a + b, 0) / r.ratings.length,
      reviewCount: r.ratings.length,
    }));
  }, [reviews]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.7484,
          longitude: -73.9857,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
      >
        {restaurantMarkers.map((restaurant, index) => (
          <Marker
            key={restaurant.name + "-" + index}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
          >
            <View style={styles.markerWrapper}>
              <View
                style={[
                  styles.markerBubble,
                  {
                    backgroundColor: getRatingColor(
                      restaurant.averageRating,
                    ),
                  },
                ]}
              >
                <Text style={styles.markerRating}>
                  {restaurant.averageRating.toFixed(1)}
                </Text>
                <Text style={styles.markerStar}>★</Text>
              </View>
              <View
                style={[
                  styles.markerArrow,
                  {
                    borderTopColor: getRatingColor(
                      restaurant.averageRating,
                    ),
                  },
                ]}
              />
            </View>
            <Callout tooltip style={styles.calloutContainer}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>
                  {restaurant.name}
                </Text>
                <Text style={styles.calloutRating}>
                  {restaurant.averageRating.toFixed(1)} ★ ·{" "}
                  {restaurant.reviewCount}{" "}
                  {restaurant.reviewCount === 1 ? "review" : "reviews"}
                </Text>
                {restaurant.address ? (
                  <Text style={styles.calloutAddress}>
                    {restaurant.address}
                  </Text>
                ) : null}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {restaurantMarkers.length === 0 && (
        <View style={styles.emptyOverlay}>
          <Text style={styles.emptyText}>
            No restaurants with locations yet.
          </Text>
          <Text style={styles.emptySubtext}>
            Add reviews to see them on the map!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerWrapper: {
    alignItems: "center",
  },
  markerBubble: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  markerRating: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  markerStar: {
    color: colors.white,
    fontSize: 12,
    marginLeft: 2,
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginTop: -1,
  },
  calloutContainer: {
    width: 200,
  },
  callout: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  calloutRating: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 2,
  },
  calloutAddress: {
    fontSize: 12,
    color: colors.darkGray,
  },
  emptyOverlay: {
    position: "absolute",
    top: "45%",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.darkGray,
    marginTop: 5,
  },
});
