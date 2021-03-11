import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, View, ScrollView, Modal } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import { Vn } from "../core"

import Interface007 from "./Interface007";
import { block } from 'react-native-reanimated';

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lng: Vn,
      modalVisible: false,
      ImageSrc: null,
      sickness_name: null,
      sickness_detail: null,
      sickness_treatment: null,
      Message:"",
      Email: "",
    }

    this.setModalVisible = this.setModalVisible.bind(this)
  }

  emailOnChange(Email) {
    this.setState({
      ...this.state,
      Email: Email
    })
  }

  sendImage() {
    console.log(this.state)
  }


  componentDidMount() {
    this.convertSicknessInfo(this.props.route.params)
  }

  convertSicknessInfo(sicknessInfo) {
    this.setState({
      ...this.state,
      ImageSrc: sicknessInfo.ImageSrc,
      sickness_name: sicknessInfo.sickness_name,
      sickness_detail: sicknessInfo.sickness_detail,
      sickness_treatment: sicknessInfo.sickness_treatment,
    })
  }

  setModalVisible = () => {
    this.setState({
      ...this.state,
      modalVisible: !this.state.modalVisible
    })
  }

  messageOnChange(Message) {
    this.setState({
      ...this.state,
      Message: Message
    })
  }

  sendMess() {
    console.log(this.state)
  }

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <ImageBackground
              source={{ uri: this.state.ImageSrc }}
              style={styles.logo}
            />
          </Block>
        </Block>
      </Block>

    )
  }
  renderText = lng => {
    return (
      <Block flex style={styles.group}>
        <Block style={styles.console}>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>{lng.Interface006.Label.sickness_name}</Text>
          <Text muted>{this.state.sickness_name}</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>{lng.Interface006.Label.sickness_detail}</Text>
          <Text muted>{this.state.sickness_detail}</Text>
          <Text p style={{ marginBottom: theme.SIZES.BASE / 2 }}>{lng.Interface006.Label.sickness_treatment}</Text>
          <Text muted>{this.state.sickness_treatment}</Text>
        </Block>
        <Block >
          <Block center>
            <Button
              shadowless
              style={styles.button}
              textStyle={styles.optionsText}
              onPress={this.setModalVisible}>
              {lng.Interface006.Label.recomment}
            </Button>
          </Block>
        </Block>
      </Block>
    )
  }

  render() {
    let { lng } = this.state
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
            style={{ height: height / 4 }}>
            <Block flex space="around" style={styles.padded}>
              {this.renderText(lng)}
              {/* {this.renderButtons()} */}
            </Block>
          </ScrollView>
        </ImageBackground>
        <Interface007
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          messageOnChange={this.messageOnChange.bind(this)}
          sendMess={this.sendMess.bind(this)}
        />
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
  console: {
    paddingTop: 20,
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
    backgroundColor: '#647fc8',
    alignSelf: 'center',
    height: 75,
    shadowColor: 'rgba(0, 0, 0, 0)',
    elevation: 10,
    shadowRadius: 10,
    shadowOffset: { width: 34, height: 40 },
    borderRadius: 50,
    marginTop: 40,
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 1.2,
    color: '#ffffff',
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
    paddingBottom: theme.SIZES.BASE * 2,
  },
  overlay: {
    height: height,
    width: width,
    backgroundColor: "black",
    opacity:0.5,
  }
});
