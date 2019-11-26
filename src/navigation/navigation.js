import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../pages/HomeScreen';
import CardDetailScreen from '../pages/CardDetailScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  CardDetailScreen: {
    screen: CardDetailScreen,
  },
});

export default createAppContainer(AppNavigator);
