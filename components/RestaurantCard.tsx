import { Alert, Image, Modal, Text, TouchableOpacity, View } from "react-native";
// import RestaurantImg from "@/assets/images/restaurant_image.jpg";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { styles } from "@/app/styles/restaurantCardStyles";
import { useState } from "react";

interface Props {
  name: string;
  address: string;
  imageURL: string;
  rating: number;
}

export const RestaurantCard = ({ name, address, imageURL, rating }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Image
          style={styles.cardImage}
          source={{ uri: imageURL || "https://placeholder.com/150" }}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {name}
          </Text>
          <StarRatingDisplay
            rating={rating}
            starSize={18}
            style={styles.ratingContainer}
          />
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image
              style={styles.modalImage}
              source={{ uri: imageURL || "https://placeholder.com/150" }}
            />

            <View style={styles.modalDetails}>
              <Text style={styles.modalTitle}>{name}</Text>

              <View style={styles.ratingRow}>
                <StarRatingDisplay rating={rating} starSize={20} />
                <Text style={styles.ratingText}>{rating}/5</Text>
              </View>

              <Text style={styles.modalAddress}>{address}</Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
