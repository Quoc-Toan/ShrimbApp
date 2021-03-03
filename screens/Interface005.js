import React from 'react';
import { StyleSheet, Dimensions, Modal, View } from 'react-native';
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
        <View style={styles.centeredView}>
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

            <Block row space="evenly">
              <Block flex right>
                <Button
                  style={styles.but}
                  onPress={() => this.props.sendImage()}>
                  {lng.Interface005.Label.send}
                </Button>
              </Block>
              <Block flex left>
                <Button
                  style={styles.but}
                  onPress={() => this.props.setModalVisible()}>
                  {lng.Interface005.Label.cancel}
                </Button>
              </Block>
            </Block>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 5,
  },
  modalView: {
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.SIZES.BASE * 17,
    marginBottom: theme.SIZES.BASE * 17,
    marginLeft: width - theme.SIZES.BASE * 22,
    marginRight: width - theme.SIZES.BASE * 22,
    backgroundColor: "white",
  },
  textfield: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
  },
  but: {
    width: width - theme.SIZES.BASE * 16,
    height: theme.SIZES.BASE * 2.5,
    backgroundColor: '#2196F3',
    shadowOpacity: 0,
  }
});