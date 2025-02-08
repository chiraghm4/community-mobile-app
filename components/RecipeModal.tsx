import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface RecipeModalProps {
  isVisible: boolean;
  onClose: () => void;
  recipe: {
    title: string;
    desc: string;
    imgURL: string;
    steps?: string[];
    ingredients?: string[];
    cookingTime?: string;
  };
}

const RecipeModal = ({ isVisible, onClose, recipe }: RecipeModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="#333" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            {recipe.imgURL && (
              <Image
                source={{ uri: recipe.imgURL }}
                style={styles.recipeImage}
                resizeMode="cover"
              />
            )}

            <View style={styles.contentContainer}>
              <Text style={styles.title}>{recipe.title}</Text>
              
              {recipe.cookingTime && (
                <View style={styles.timeContainer}>
                  <AntDesign name="clockcircle" size={20} color="#666" />
                  <Text style={styles.cookingTime}>{recipe.cookingTime}</Text>
                </View>
              )}

              {recipe.ingredients && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Ingredients</Text>
                  {recipe.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.ingredientText}>{ingredient}</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Instructions</Text>
                {recipe.steps ? (
                  recipe.steps.map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                      <Text style={styles.stepNumber}>{index + 1}</Text>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.description}>{recipe.desc}</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontFamily: 'manro-b',
    fontSize: 24,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cookingTime: {
    fontFamily: 'manro',
    marginLeft: 8,
    color: '#666',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: 'manro-sb',
    fontSize: 18,
    marginBottom: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
    fontSize: 16,
  },
  ingredientText: {
    fontFamily: 'manro',
    flex: 1,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepNumber: {
    fontFamily: 'manro-b',
    fontSize: 16,
    marginRight: 10,
    color: '#007AFF',
    width: 25,
  },
  stepText: {
    fontFamily: 'manro',
    flex: 1,
    lineHeight: 20,
  },
  description: {
    fontFamily: 'manro',
    lineHeight: 20,
  },
});

export default RecipeModal;