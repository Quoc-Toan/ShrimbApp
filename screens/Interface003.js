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
      Viewed: [
        {
          ImageSrc: 'https://znews-photo.zadn.vn/w660/Uploaded/bpmoqwq1/2014_10_16/con_meo.jpg',
          sickness_name: "Toàn",
          sickness_detail: "Toàn",
          sickness_treatment: "Toàn",
        },
        {
          ImageSrc: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?fit=crop&w=240&q=80',
          sickness_name: "Toàn",
          sickness_detail: "Toàn",
          sickness_treatment: "Toàn",
        },
        {
          ImageSrc: 'https://images.unsplash.com/photo-1487376480913-24046456a727?fit=crop&w=240&q=80',
          sickness_name: "Toàn",
          sickness_detail: "Toàn",
          sickness_treatment: "Toàn",
        },
        {
          ImageSrc: 'https://images.unsplash.com/photo-1494894194458-0174142560c0?fit=crop&w=240&q=80',
          sickness_name: "Toàn",
          sickness_detail: "Toàn",
          sickness_treatment: "Toàn",
        },

        // 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?fit=crop&w=240&q=80',
        // 'https://images.unsplash.com/photo-1542068829-1115f7259450?fit=crop&w=240&q=80',
      ]
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
        <Text bold size={16} style={styles.title}>Album</Text>
        <Block>
          <Block flex right>
            <Text
              size={12}
              color={theme.COLORS.PRIMARY}
              onPress={() => navigation.navigate('Home')}>
              View All
            </Text>
          </Block>
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
                  <Text style={styles.buttonPhoto}>{lng.Interface003.Label.setphoto}</Text>
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
  logo: {
    width: 280,
    height: 280,
    zIndex: 1,
    position: "absolute",
    alignSelf: 'center',
    top: "20%"
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
    width: width - theme.SIZES.BASE * 7,
    height: height - theme.SIZES.BASE * 46,
    shadowRadius: 10,
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
  }
});
