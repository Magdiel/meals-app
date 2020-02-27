import React from 'react';
import { 
  createStackNavigator, 
  createAppContainer, 
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { Platform, Text } from 'react-native'
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FilterScreen from '../screens/FiltersScreen';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const defaultStackNavOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
       fontFamily: 'open-sans' //only works on ios cuz' android doesn't have a back text
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  }
}

const MealsNavigator = createStackNavigator({
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: 'Meal Categories'
      }
    },
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
  }, defaultStackNavOptions);

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen, 
  MealDetail: MealDetailScreen
},defaultStackNavOptions);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator, 
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
      }, 
      tabBarColor: Colors.primaryColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
    },
  },
  Favorites: {
    screen: FavNavigator, 
    tabBarLabel: 'Favorites!',
    navigationOptions:{
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
      },
      tabBarColor: Colors.accentColor, /** Solo funciona con shifting: true */
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
    }
  }
};

const MealsFavTabNavigator = 
  Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeColor: 'white',
      shifting: true,
      // barStyle: {    /*Esta es otra manera de ponerle el color a la barra completa. 
      //   backgroundColor: Colors.primaryColor
      // }
    }) 
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: 'open-sans-bold'
          },
          activeTintColor: 'white'
        }
    }
);

const FiltersNavigator = createStackNavigator({
  Filters: FilterScreen
}, {
  ...defaultStackNavOptions, 
  navigationOptions: {
    drawerLabel: 'Filters'
  }
})

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor, 
    labelStyle: {
      fontFamily: 'open-sans-bold'
    }
  }
});

export default createAppContainer(MainNavigator);
