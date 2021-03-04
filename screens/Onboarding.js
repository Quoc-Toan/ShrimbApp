import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import vn from "../constants/vn";
import { Vn } from "../core"

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        lng: Vn
    }
}
  render() {
    const { navigation } = this.props;
    let { lng } = this.state


    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={Images.Background}
            style={{ width: width, height: height, zIndex: 1 }}
          />
          <ImageBackground
            source={Images.Logo}
            style={styles.logo}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                textStyle={styles.optionsText}
                onPress={() => navigation.navigate('App')}>
                 {lng.Onboaring.Label.button_start}
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
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
  button: {
    width: 250,
    backgroundColor: 'white',
    height: 75,
    shadowColor: 'rgba(0, 0, 0, 0)',
    elevation: 10,
    shadowRadius: 10 ,
    shadowOffset : { width: 14, height: 20},
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 1.2 ,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
});
