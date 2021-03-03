import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, View, ScrollView } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import vn from "../constants/vn";

export default class Onboarding extends React.Component {
  // renderButtons = () => {
  //   return (
  //     <Block flex>
  //       <Block >
  //         <Block center>
  //           <Button
  //             shadowless
  //             style={styles.button}
  //             textStyle={styles.optionsText}
  //             onPress={() => navigation.navigate('App')}>
  //             {vn.data.interface006.Label.recomment}
  //           </Button>
  //         </Block>
  //       </Block>
  //     </Block>
  //   )
  // }
  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <ImageBackground
                source={Images.White}
                style={styles.logo}
              />
          </Block>
        </Block>
      </Block>
      
    )
  }
  renderText = () => {
    return (
      <Block flex style={styles.group}>
        <Block >
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>Paragraph</Text>
          <Text muted>This is a muted paragraph.</Text>
        </Block>
        <Block >
          <Block center>
            <Button
              shadowless
              style={styles.button}
              textStyle={styles.optionsText}
              onPress={() => navigation.navigate('App')}>
              {vn.data.interface006.Label.recomment}
            </Button>
          </Block>
        </Block>
      </Block>
      
      
      
    )
  }

  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
          <ImageBackground
            source={Images.Background}
            style={{ width: width, height: height, zIndex: 1 }}
          >
          <Block flex center>
            {this.renderCards()}
          </Block>
          <ScrollView
          showsVerticalScrollIndicator={false}
          style={{height: height/4}}>
          <Block flex space="around" style={styles.padded}>
            {this.renderText()}
            {/* {this.renderButtons()} */}
              

            </Block>
            </ScrollView>
        </ImageBackground>
      </Block>
    );
  }

  // render() {
  //   const { navigation } = this.props;

  //   return (
  //     <Block flex style={styles.container}>
  //       <StatusBar barStyle="light-content" />
  //       <Block flex center>
  //         <ImageBackground
  //           source={Images.Background}
  //           style={{ width: width, height: height, zIndex: 1 }}
  //         />
  //         <ImageBackground
  //           source={Images.White}
  //           style={styles.logo}
  //         />
  //       </Block>
  //       <Block flex space="around" style={styles.padded}>
  //         <View>
  //           <Text>
  //             aaaa
  //               </Text>
  //         </View>
  //         <View>
  //           <Button
  //             shadowless
  //             style={styles.button}
  //             textStyle={styles.optionsText}
  //             onPress={() => navigation.navigate('App')}>
  //             {vn.data.interface006.Label.recomment}
  //           </Button>
  //         </View>
  //       </Block>

  //     </Block>
  //   );
  // }
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
    backgroundColor: "white",
    height: 'auto',
  },
  button: {
    width: 250,
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 75,
    shadowColor: 'rgba(0, 0, 0, 0)',
    elevation: 10,
    shadowRadius: 10,
    shadowOffset: { width: 34, height: 40 },
    borderRadius: 50,
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 1.2,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE* 2,
  },

});
