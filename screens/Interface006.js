import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, View, TouchableWithoutFeedback, Image, ScrollView, Modal, Alert } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import { Vn } from "../core";

import Interface007 from "./Interface007";
import { block, color } from 'react-native-reanimated';

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lng: Vn,
      modalVisible: false,
      Id_ND: null,
      ImageSrc: null,
      sickness_name: null,
      sickness_detail: null,
      sickness_treatment: null,
      isMessageValid: true,
      linkApi: "http://18.218.167.122",
      Message: ""
    }

    this.setModalVisible = this.setModalVisible.bind(this)
  }

  validate(Message) {
    return Message && Message !== ""
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
      Id_ND: sicknessInfo.Id_ND
    })
  }

  setModalVisible = () => {
    this.setState({
      ...this.state,
      modalVisible: !this.state.modalVisible,
      isMessageValid: true
    })
  }

  messageOnChange(Message) {
    this.setState({
      ...this.state,
      Message: Message
    })
  }

  sendMess() {
    let { Message, lng, Id_ND } = this.state
    let isMessageValid = this.validate(Message)
    this.setState({
      ...this.state,
      isMessageValid: isMessageValid
    })
  
    if (isMessageValid) {
      var body = new FormData();
      body.append("Id_ND", Id_ND)
      body.append("YKien", Message)

      fetch(`${this.state.linkApi}/insertYKien`, {
        method: "POST",
        body: body,
      }).then(res => res.json())
        .then(res => {
          if(res.success){
            Alert.alert(
              lng.Interface006.Label.title_alert,
              lng.Interface006.Label.arigatou,
              [
                { text: lng.Interface006.Label.button_access, onPress: () => this.setModalVisible() }
              ],
              { cancelable: false }
            );
          }else{
            Alert.alert(
              lng.Interface006.Label.title_alert,
              lng.Interface006.Label.error_message,
              [
                { text: lng.Interface006.Label.button_access, onPress: () => this.setModalVisible() }
              ],
              { cancelable: false }
            );
          }
        })

    }
  }

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Image
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
          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>{lng.Interface006.Label.sickness_name}</Text>
          <Text p style={ styles.textInput}>{this.state.sickness_name}</Text>

          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>{lng.Interface006.Label.sickness_detail}</Text>
          <Text p style={ styles.textInput}>{this.state.sickness_detail}</Text>

          <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>{lng.Interface006.Label.sickness_treatment}</Text>
          <Text p style={ {    marginBottom: theme.SIZES.BASE, color: "gray",}}>{this.state.sickness_treatment}</Text>
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
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Nhận diện", {
            ImageSrc: ""
          })}>
            <Block>
              <Image source={Images.Back1} style={styles.back} />
            </Block>
          </TouchableWithoutFeedback>
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
          isMessageValid={this.state.isMessageValid}
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
    borderRadius: 40,
    marginVertical: 4,
    alignSelf: 'center',
    width: width/ 2 + width / 6,
    height: height / 5 + height / 9,
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
    width: width - width / 2,
    height: height / 16,
    backgroundColor: '#647fc8',
    alignSelf: 'center',
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
    opacity: 0.5,
  },
  back: {
    height: height / 30,
    width: width / 30,
    paddingHorizontal: '6%',
    marginTop: '3%',
    marginHorizontal: '6%'
  }, 
  textInput: {
    marginBottom: theme.SIZES.BASE, 
    color: "gray",
    paddingBottom: 16,
    borderBottomColor: "#0d41d0",
    borderBottomWidth: 2,
  }
});
