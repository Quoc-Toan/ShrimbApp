import React from 'react';
import { StyleSheet, Dimensions, Modal, View, ImageBackground } from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import { Vn } from "../core"

export default class Interface005 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lng: Vn
    }
  }

  render() {
    let { lng } = this.state
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <ImageBackground source={require('..//assets/images/bgOverlay.png')} style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{lng.Interface005.Label.input_email_tittle}</Text>

            <Input
              right
              color="black"
              style={styles.search}
              placeholder={lng.Interface005.Label.email_placeholder}
              onChangeText={text => this.props.emailOnChange(text)}
            // onFocus={() => navigation.navigate('Pro')}
            />
            {!this.props.isEmailValid ? <Text muted color="red">{lng.Interface005.Label.error_message}</Text> : <Text></Text>}

            <Block style={styles.btBlock} fontSize={15}>
                <Button
                  style={styles.but}
                  onPress={() => this.props.sendImage()}>
                  {lng.Interface005.Label.send}
                </Button>
                <Button
                  style={styles.but}
                  onPress={() => this.props.setModalVisible()}>
                  {lng.Interface005.Label.cancel}
                </Button>
            </Block>
          </View>
        </ImageBackground>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
    borderRadius: 2,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  modalView: {
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  but: {
    width: width - width/2,
    height: height/22,
    backgroundColor: '#2196F3',
    shadowOpacity: 0,
    fontSize: 5,
    fontWeight: "bold",
  },
  search: {
    height: height/15,
  },
  btBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  }
});