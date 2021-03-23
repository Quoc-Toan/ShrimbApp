import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, ScrollView, TouchableWithoutFeedback, Image, Modal, View, AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Block, Button, Text, theme } from 'galio-framework';
import * as ImageManipulator from 'expo-image-manipulator';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';
import { Vn } from "../core"
import Interface005 from "./Interface005";

const thumbMeasure = (width) / 2.5;

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
      isEmailValid: true,
      linkApi: "http://18.218.167.122",
      Viewed: [],
      isDetect: false
    }

    this.pickImage = this.pickImage.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
    this.setphotoGalaryModal = this.setphotoGalaryModal.bind(this)
    this.detectImage = this.detectImage.bind(this)
  }

  componentDidMount = async () => {
    await AsyncStorage.removeItem("Email")
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.route.params !== this.props.route.params && this.state.useCamera) {
      if (this.props.route.params.Imagesrc) {
        this.setState({
          ...this.state,
          ImageSrc: this.props.route.params.Imagesrc,
          modalVisible: false,
          photoGalaryModal: false,
          useCamera: false
        })
      }
    } else if (previousProps.route.params !== this.props.route.params && this.state.isDetect) {
        this.setState({
          ...this.state,
          ImageSrc: "",
          modalVisible: false,
          photoGalaryModal: false,
          isDetect: false
        })
    }
  }

  validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
  }

  emailOnChange(Email) {
    this.setState({
      ...this.state,
      Email: Email
    })
  }

  detectImage = async () => {
    let value = await AsyncStorage.getItem("Email");
    if (value !== null) {
      const manipResult = await ImageManipulator.manipulateAsync(
        this.state.ImageSrc,
        [{ resize: {width: 256, height: 256} }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      var item = {
        uri: manipResult.uri,
        type: "image/jpeg",
        name: "image",
      };

      var body = new FormData();
      body.append("image", item)
      body.append("Email", value)

      fetch(`${this.state.linkApi}/detect`, {
        method: "POST",
        body: body,
      }).then(res => res.json())
        .then(res => {
          let item = {
            Id_ND: res.Id_ND,
            ImageSrc: `${this.state.linkApi}/loadImage?ImageName=${res.ImgName}`,
            sickness_name: res.Ten_B,
            sickness_detail: res.ThongTin_B,
            sickness_treatment: res.CachChuaTri
          }

          let { Viewed } = this.state
          Viewed.unshift(item)

          this.setState({
            ...this.state,
            Viewed: Viewed,
            isDetect: true
          })

          this.props.navigation.navigate("Kết quả", item)
        })
    } else {
      this.setModalVisible()
    }
  }

  sendImage = async () => {
    let { Email } = this.state
    let isEmailValid = this.validate(Email)
    this.setState({
      ...this.state,
      isEmailValid: isEmailValid
    })
    if (isEmailValid) {
      await AsyncStorage.setItem("Email", Email).then(() => {
        this.detectImage()
      })
    }

  }

  pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.cancelled){
      this.setState({
        ...this.state,
        ImageSrc: result.uri
      })
    }
    


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
          <Block style={styles.ImageContainer}>
            {
              (this.state.ImageSrc != "") ?
                <Image
                  source={{ uri: this.state.ImageSrc }}
                  resizeMode={"cover"}
                  style={styles.logo} /> :
                <Image
                  source={Images.White}
                  style={styles.logo}
                  resizeMode={"cover"} />
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
                  onPress={this.detectImage}>
                  {lng.Interface003.Label.detect}
                </Button> :
                <Block></Block>
            }
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
      <Block flex style={[styles.group, { paddingBottom: theme.SIZES.BASE }]}>
        <Block>
          <Block row space="between" style={{ marginTop: theme.SIZES.BASE, flexWrap: 'wrap' }} >
            {this.state.Viewed.map((img, index) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setphotoGalaryModal()
                  navigation.navigate("Kết quả", img)
                }}
                key={`viewed-${img.ImageSrc}`}
                style={styles.shadow}>
                <Image
                  source={{ uri: img.ImageSrc }}
                  style={styles.albumThumb}
                />
              </TouchableWithoutFeedback>

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
              <Block style={styles.buttonPhotoBox}>
                <TouchableWithoutFeedback onPress={this.setphotoGalaryModal}>
                  <Text style={styles.buttonPhoto}>{lng.Interface003.Label.photo_gallary}</Text>
                </TouchableWithoutFeedback>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
        <Interface005
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible.bind(this)}
          emailOnChange={this.emailOnChange.bind(this)}
          sendImage={this.sendImage.bind(this)}
          isEmailValid={this.state.isEmailValid}
        />
        <Modal
          animationType="slide"
          transparent={true} h
          visible={this.state.photoGalaryModal}
        >
          <Block flex style={styles.album}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
              source={require('..//assets/images/bgOverlay.png')}
              style={{ width: width, height: height, zIndex: 1 }}
            >
              <TouchableWithoutFeedback onPress={() => this.setphotoGalaryModal()}>
                <Block>
                  <Image source={Images.Back} style={styles.back} />
                </Block>
              </TouchableWithoutFeedback>

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
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black"
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
    height: height / 2
  },
  button: {
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0)',
    elevation: 10,
    shadowOffset: { width: 14, height: 20 },
    width: width - width / 2,
    height: height / 16,
    shadowRadius: 10,
    zIndex:1,
    top:"70%"
  },
  buttonPhoto: {
    fontSize: theme.SIZES.BASE * 1.2,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  buttonPhotoBox: {
    width: width,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
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
    top: "20%",
    zIndex:1,
  },
  icon: {
    alignSelf: 'center',
    height: height / 20,
    width: width / 12,
    paddingHorizontal: '20%',
    marginTop: '10%',
    marginBottom: '10%',
    marginHorizontal: '5%'
  },
  logo: {
    borderRadius: 40,
    marginVertical: 4,
    alignSelf: 'center',
    width: width/ 2 + width / 4,
    height: height / 5 + height / 7,
    top: "10%",
    zIndex:1,
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
    height: thumbMeasure,
  },
  album: {
    height: height,
    width: width
  },
  back: {
    height: height / 18,
    width: width / 10,
    paddingHorizontal: '6%',
    marginTop: '12%',
    marginHorizontal: '6%'
  },
  ImageContainer: {
    width: 280,
    height: 280,
    alignItems: "center",
    flexWrap: 'wrap',
    borderRadius: 4
  },
  back: {
    marginLeft: '5%',
    marginTop: '5%',
  }
});
