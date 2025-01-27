import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import RestaurantImg from "@/assets/images/restaurant_image.jpg";
import { StarRatingDisplay } from 'react-native-star-rating-widget';

interface Props {
  name: string;
  address: string;
  imageURL: string;
  rating: number
}

export const RestaurantCard = ({ name, address, imageURL, rating }: Props) => {
  return (
    <TouchableOpacity
      style={{
        width: "48%",
        alignItems: "center",
        borderWidth: 0.75,
        margin: "1%",
        paddingTop: 15,
        paddingBottom: 15,
      }}
      onPress={() => alert(address)}
    >
      <Image style={{ height: 150, width: 150 }} />
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>{name}</Text>
      {/* <Text>{address}</Text> */}
      <StarRatingDisplay rating={rating} starSize={20} style={{marginTop: 10}} />
    </TouchableOpacity>
  );
};
