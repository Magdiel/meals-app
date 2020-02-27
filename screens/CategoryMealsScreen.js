import React from 'react';
import { useSelector } from 'react-redux'
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DetaultText';

const CategoryMealScreen = props => {
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(state => state.meals.filteredMeals);
  
  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );
  
  if (displayedMeals.length === 0) {
    return <View style={styles.content}><DefaultText>No meals found. Please check your filters.</DefaultText></View>
  }

  return (
    <MealList listData={displayedMeals} navigation={props.navigation} />
    // {/* <Text>The Category Meal Screen!</Text>
    //   <Text>Selected Category: {selectedCategory.title}</Text>
      
    //   <Button title="Go to Details" onPress={() => {
    //       props.navigation.navigate({
    //           routeName: 'MealDetail'
    //       });
    //   }} />
    //   <Button title='Go Back' onPress={() => {
    //     props.navigation.goBack();
    //   }}/> */}
    
  );
};

CategoryMealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  }
})

export default CategoryMealScreen;