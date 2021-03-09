import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, ScrollView, TouchableWithoutFeedback, Image, Modal, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import { Vn } from "../core"
import Interface005 from "./Interface005";
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const thumbMeasure = (width - 48 - 32) / 3;

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ImageSrc: "",
      Email: "",
      modalVisible: false,
      lng: Vn,
      useCamera: false,
      photoGalaryModal: false,
    }

    this.pickImage = this.pickImage.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
    this.setphotoGalaryModal = this.setphotoGalaryModal.bind(this)
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.route.params !== this.props.route.params && this.state.useCamera) {
      if (this.props.route.params.Imagesrc) {
        this.setState({
          ...this.state,
          ImageSrc: this.props.route.params.Imagesrc
        })
      }
    } else {
      console.log("update")
    }
  }

  emailOnChange(Email) {
    this.setState({
      ...this.state,
      Email: Email
    })

  }

  sendImage() {
    sicknessInfo = {
      ImageSrc: this.state.ImageSrc,
      sickness_name: "Toàn",
      sickness_detail: "Toàn",
      sickness_treatment: "Toàn",
    }
  }

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    this.setState({
      ...this.state,
      ImageSrc: result.uri
    })
  }

  setModalVisible = () => {
    this.setState({
      ...this.state,
      modalVisible: !this.state.modalVisible
    })
  }

  setphotoGalaryModal = () => {
    this.setState({
      ...this.state,
      photoGalaryModal: !this.state.photoGalaryModal
    })
  }



  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            {
              (this.state.ImageSrc != "") ?
                <ImageBackground
                  source={{ uri: this.state.ImageSrc }}
                  style={styles.logo} /> :
                <ImageBackground
                  source={Images.White}
                  style={styles.logo} />
            }
          </Block>
        </Block>
      </Block>

    )
  }

  renderButtonDetect = lng => {
    return (
      <Block flex style={styles.group}>
        <Block >
          <Block center>
            {
              (this.state.ImageSrc != "") ?
                <Button
                  shadowless
                  style={styles.button}
                  textStyle={styles.optionsText}
                  onPress={this.setModalVisible}>
                  {lng.Interface003.Label.detect}
                </Button> :
                <Block></Block>
            }
          </Block>
          <Block>
            <TouchableWithoutFeedback onPress={this.setphotoGalaryModal}>
              <Text style={styles.buttonPhoto}>{lng.Interface003.Label.setphoto}</Text>
            </TouchableWithoutFeedback>
          </Block>
        </Block>
      </Block>
    )
  }

  renderButton = (lng, navigation) => {
    return (
      <Block style={styles.card}>
        <TouchableWithoutFeedback onPress={() => {
          this.setState({
            ...this.state,
            useCamera: true
          })
          navigation.navigate('Camera')
        }
        }>
          <Block>
            <Image source={Images.Camera} style={styles.icon} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.pickImage}>
          <Block>
            <Image source={Images.Picture} style={styles.icon} />
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    )
  }

  renderAlbum = () => {
    const { navigation } = this.props;

    return (
      <Block flex style={[styles.group, { paddingBottom: theme.SIZES.BASE * 5 }]}>
        <Text bold size={16} style={styles.title}>Album</Text>
        <Block style={{ marginHorizontal: theme.SIZES.BASE * 2 }}>
          <Block flex right>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => navigation.navigate('Home')}>
              View All
            </Text>
          </Block>
          <Block row space="between" style={{ marginTop: theme.SIZES.BASE, flexWrap: 'wrap' }} >
            {Images.Viewed.map((img, index) => (
              <Block key={`viewed-${img}`} style={styles.shadow}>
                <Image
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.albumThumb}
                />
              </Block>
            ))}
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
            {this.renderCards(lng)}
          </Block>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: height / 4 }}>
            <Block flex space="around" style={styles.padded}>
              {this.renderButton(lng, navigation)}

              {this.renderButtonDetect(lng)}
            </Block>
          </ScrollView>
        </ImageBackground>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.overlay}>

          </View>
        </Modal>
        <Interface005
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible.bind(this)}
          emailOnChange={this.emailOnChange.bind(this)}
          sendImage={this.sendImage.bind(this)}
        />
        <Modal
          animationType="slide"
          transparent={true} h
          visible={this.state.photoGalaryModal}
        >
          <Block flex style={styles.album}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
              source={Images.Background}
              style={{ width: width, height: height, zIndex: 1 }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ height: height / 4 }}>
                <Block flex space="around" style={styles.padded}>
                  {this.renderAlbum()}
                </Block>
              </ScrollView>
            </ImageBackground>
          </Block>
        </Modal>
        <Button
          photoGalaryModal={this.state.photoGalaryModal}
          setphotoGalaryModal={this.setphotoGalaryModal.bind(this)}

        >
        </Button>
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
    top: "20%",

  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 7,
    backgroundColor: 'white',
    height: height - theme.SIZES.BASE * 50,
    shadowColor: 'rgba(0, 0, 0, 0)',
    elevation: 10,
    shadowRadius: 10,
    shadowOffset: { width: 14, height: 20 },
  },
  buttonPhoto: {
    fontSize: theme.SIZES.BASE * 1.2,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,

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
  logo: {
    width: 280,
    height: 280,
    zIndex: 1,
    position: "absolute",
    alignSelf: 'center',
    top: "10%",
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
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  album: {
    height: height,
    width: width
  },
});
