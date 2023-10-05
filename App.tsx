import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const quotes = [
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "In the middle of every difficulty lies opportunity. - Albert Einstein",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  // Add more quotes as needed
];

const App: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<string>("");

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = async (): Promise<void> => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    setCurrentQuote(quote);

    // Save the current quote index to AsyncStorage
    try {
      await AsyncStorage.setItem('@currentQuoteIndex', JSON.stringify(randomIndex));
    } catch (error) {
      console.log("Error saving quote index:", error);
    }
  };

  const getNextQuote = async (): Promise<void> => {
    getRandomQuote();
  };

  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>{currentQuote}</Text>
        <TouchableOpacity style={styles.button} onPress={getNextQuote}>
          <Text style={styles.buttonText}>Next Quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: 'purple',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
