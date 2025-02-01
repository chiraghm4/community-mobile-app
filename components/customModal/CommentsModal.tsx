import { MaterialIcons } from '@expo/vector-icons';
import { Modal, View, Text, Pressable, StyleSheet, TextInput, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '@/firestore';
import { getAuth } from 'firebase/auth';

type Comment = {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  timestamp: any;
  username?: string;
}

type Props = {
  isVisible: boolean;
  onClose: () => void;
  postId: string;
};

export default function CommentsModal({ isVisible, postId, onClose }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const commentsRef = collection(db, "comments");
      const q = query(
        commentsRef, 
        where("postId", "==", postId)
      );
      
      const querySnapshot = await getDocs(q);
      const commentsData: Comment[] = [];
      
      for (const doc of querySnapshot.docs) {
        const commentData = { id: doc.id, ...doc.data() } as Comment;
        
        // Fetch username for each comment
        try {
          const userRef = collection(db, "users");
          const userQuery = query(userRef, where("userId", "==", commentData.userId));
          const userSnapshot = await getDocs(userQuery);
          
          if (!userSnapshot.empty) {
            commentData.username = userSnapshot.docs[0].data().username;
          } else {
            commentData.username = "Unknown User";
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          commentData.username = "Unknown User";
        }
        
        commentsData.push(commentData);
      }
      
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !auth.currentUser) return;
    
    try {
      setSubmitting(true);
      const commentsRef = collection(db, "comments");
      await addDoc(commentsRef, {
        userId: auth.currentUser.uid,
        postId: postId,
        comment: newComment.trim(),
        timestamp: serverTimestamp()
      });
      
      setNewComment('');
      fetchComments(); 
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.commentText}>{item.comment}</Text>
    </View>
  );

  return (
    <Modal 
      animationType="slide" 
      transparent={true} 
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Comments</Text>
            <Pressable 
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && { opacity: 0.7 }
              ]}
            >
              <MaterialIcons name="close" color="#00000" size={22} />
            </Pressable>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#00000" />
            </View>
          ) : (
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item.id}
              style={styles.commentsList}
              contentContainerStyle={styles.commentsListContent}
              ListEmptyComponent={
                <Text style={styles.noComments}>No comments to display</Text>
              }
            />
          )}
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              placeholderTextColor="#999"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <Pressable 
              onPress={handleAddComment}
              disabled={submitting || !newComment.trim()}
              style={({ pressed }) => [
                styles.sendButton,
                pressed && { opacity: 0.7 },
                (!newComment.trim() || submitting) && { opacity: 0.5 }
              ]}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#00000" />
              ) : (
                <MaterialIcons name="send" size={24} color="#00000" />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    height: '75%', // Increased height for better visibility
    width: '100%',
  },
  titleContainer: {
    height: 56,
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#00000',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
    color: '#00000'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsList: {
    flex: 1,
  },
  commentsListContent: {
    padding: 16,
  },
  commentItem: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  commentText: {
    color: '#fff',
  },
  noComments: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#464C55',
    alignItems: 'flex-end',
  },
  input: {
    flex: 9,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingRight: 48,
    color: '#00000',
    maxHeight: 100,
  },
  sendButton: {
    flex : 1,
    paddingVertical: 8,
    paddingLeft : 12,
  },
});