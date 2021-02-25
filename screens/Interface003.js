import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, ScrollView, TouchableWithoutFeedback, Image} from 'react-native';
import { Block, Button, Text, View, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import vn from "../constants/vn";
import { withSafeAreaInsets } from 'react-native-safe-area-context';


export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={Images.Background1}
            style={{ width: width, height: height, zIndex: 1 }}
          />
          <ImageBackground
            source={Images.White}
            style={styles.logo}
          />
        </Block>
        <Block style={styles.card}>
          <TouchableWithoutFeedback >
            <Block style={styles.items} >
              <Image source={Images.Camera} style={styles.icon} />
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
          //  onPress={this.takeImage.bind(this)}
          >
            <Block style={styles.items}>
              <Image source={Images.Picture} style={styles.icon} />
            </Block>
          </TouchableWithoutFeedback>
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block flex space="around" style={{ zIndex: 2 }}>
            <Block center>
              <Button
                shadowless
                style={styles.button}
                textStyle={styles.optionsText}
                // onPress={() => navigation.navigate('App')}
                >
                {vn.data.interface003.Label.detect}
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
    top: "10%",

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
    shadowRadius: 10,
    shadowOffset: { width: 14, height: 20 },
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 1.2,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  card: {
    //flex: 1,
    flexDirection: 'row',
    marginHorizontal: width / 6,
    marginVertical: 15,
    borderRadius: 2,
    shadowOpacity: 0.1,
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  icon: {
    alignSelf: 'center',
    height: height / 18,
    width: width / 10,
    paddingHorizontal: '20%',
    marginTop: '10%',
    marginBottom: '10%',
    marginHorizontal: '5%'
  },
});
