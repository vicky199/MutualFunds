/* eslint-disable react-native/no-inline-styles */
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerActions} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'native-base';
import Home from '../components/home';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Create our Tab navigator
let fontSize = 12;
const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
        tabBarLabel: 'Home',
      },
    },

    Invest: {
      screen: Home,
      navigationOptions: {
        title: 'Place Order',
        tabBarLabel: 'Invest',
      },
    },
    Portfolio: {
      screen: Home,
      navigationOptions: {
        title: 'View Order',
        tabBarLabel: 'Portfolio',
      },
    },
    Profile: {
      screen: Home,
      navigationOptions: {
        title: 'Add Shop',
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    //setting Icon for tab navigation
    defaultNavigationOptions: ({navigation}) => ({
      title: navigation.state.routeName,
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        let iconColor = focused ? '#308ebf' : 'grey';
        let iconSize = focused ? 30 : 24;
        fontSize = focused ? 14 : 12;
        const {routeName} = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Portfolio') {
          iconName = 'md-briefcase';
        } else if (routeName === 'Profile') {
          iconName = 'person';
        } else if (routeName === 'Invest') {
          iconName = 'cash-outline';
        }
        return (
          <IconComponent
            name={iconName}
            style={{fontSize: iconSize, color: iconColor}}
          />
        );
      },
    }),
    //setting like background color active tab and all set here
    tabBarOptions: {
      activeTintColor: '#308ebf',
      inactiveTintColor: 'grey',
      activeBackgroundColor: 'white',
      allowFontScaling: true,
      labelStyle: {
        fontSize: fontSize,
      },
      style: {
        backgroundColor: 'white',
      },
    },
  },
);
const getHeaderInfo = (navigation, title) => {
  return {
    title: title,
    headerTitleContainerStyle: {
      alignItems: 'center',
      alignSelf: 'center',
    },
    headerLeft: (
      <Icon
        name="menu"
        title="md-menu"
        iconName="md-menu"
        selectedIconName="md-home"
        style={{
          color: 'grey',
        }}
      />
    ),
    headerRight: (
      <Icon
        name="md-cart"
        title="md-cart"
        iconName="md-cart"
        selectedIconName="ios-home"
        style={{
          color: 'grey',
        }}
      />
    ),
    headerStyle: {
      backgroundColor: 'white',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      marginLeft: wp(27),
      alignSelf: 'center',
    },
  };
};
const StackNavigator = createStackNavigator(
  {
    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.

    Home: {
      screen: TabNavigator,
      navigationOptions: ({navigation}) => getHeaderInfo(navigation, 'Invest'),
    },
  },
  {
    headerMode: 'screen',
    cardStyle: {backgroundColor: '#eef2f5'},
  },
);

// And the app container
export let Navigation = createAppContainer(StackNavigator);
