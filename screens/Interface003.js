import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Block, Button, Text, View, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import vn from "../constants/vn";
import Image from "../components/Image";
import { withSafeAreaInsets } from 'react-native-safe-area-context';


export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
        <ImageBackground
            source={Images.Background1}
            style={{ width: width, height: height, zIndex: 1 }}
        />
        <Image style={styles.logo}/>
        <ImageBackground
            source={Images.Background}
            style={{ width: width, height: height, zIndex: 1 }}
        />
            <Text>aaaa</Text>
        
        </Block>
      </Block>
      </ScrollView>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  logo: {
    width: 280, 
    height: 280, 
    zIndex: 1, 
    position: "absolute",
    alignSelf: 'center',
    top: "50%",
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },

  screen: {
    position: "absolute",
  },
});
