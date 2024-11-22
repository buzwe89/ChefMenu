import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const App = () => {
  const [mealName, setMealName] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [mealPrice, setMealPrice] = useState('');
  const [courseType, setCourseType] = useState('Starter');
  const [meals, setMeals] = useState([]);

  const addMeal = () => {
    setMeals([...meals, { name: mealName, description: mealDescription, price: parseFloat(mealPrice), course: courseType }]);
    setMealName('');
    setMealDescription('');
  
    setMealPrice('');
    setCourseType('Starter');
  };

  const deleteMeal = (index) => {
    const newMeals = meals.filter((_, i) => i !== index);
    setMeals(newMeals);
  };

  const calculateAveragePrice = () => {
    if (meals.length === 0) return 0;
    const total = meals.reduce((sum, meal) => sum + meal.price, 0);
    return (total / meals.length).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/Chef.png')} style={styles.logo} />
      <Text style={styles.header}>Add a Meal</Text>
      <TextInput
        style={styles.input}
        placeholder="Meal Name"
        value={mealName}
        onChangeText={setMealName}
      />
      <TextInput
        style={styles.input}
        placeholder="Meal Description"
        value={mealDescription}
        onChangeText={setMealDescription}
        
        
      />
      <TextInput
        style={styles.input}
        placeholder="Meal Price"
        value={mealPrice}
        onChangeText={setMealPrice}
        keyboardType="numeric"
      />
      <View style={styles.courseTypeContainer}>
        {['Starter', 'Main Meal', 'Dessert'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.courseTypeButton, courseType === type && styles.selectedCourseTypeButton]}
            onPress={() => setCourseType(type)}
          >
            <Text style={styles.courseTypeText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Add Your Meal" onPress={addMeal} />
      <Text style={styles.averagePrice}>Average Price: R{calculateAveragePrice()}</Text>
      <FlatList
        data={meals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.mealItem}>
            <Text style={styles.mealText}>{item.course}</Text>
            <Text style={styles.mealText}>Name: {item.name}</Text>
            <Text style={styles.mealText}>Description: {item.description}</Text>
            <Text style={styles.mealText}>Price: R{item.price.toFixed(2)}</Text>
            <Button title="Delete" onPress={() => deleteMeal(index)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    padding: 10,
  },
  courseTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  courseTypeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  selectedCourseTypeButton: {
    backgroundColor: 'lightgray',
  },
  courseTypeText: {
    fontSize: 16,
  },
  averagePrices: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  mealItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mealText: {
    fontSize: 18,
  },
});

export default App;
