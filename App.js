import React, {useState, useEffect} from 'react';
import {View, Text,Image, Modal,StyleSheet, Pressable,TouchableOpacity} from 'react-native';
import Voice from '@react-native-voice/voice';



const App = () => {
  const [isRecord, setIsRecord] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const buttonLabel = isRecord ? 'Stop' : 'Start';
  // const voiceLabel = text
  //   ? text
  //   : isRecord
  //   ? 'Say something...'
  //   : 'Press Start button';
    const voiceLabel = text
    ? text
    : isRecord
    ? ''
    : '';
    const voiceButtonText = text
    ? text
      : isRecord
       ? 'Say something...'
       : 'Press Start button';

  const onSpeechStart = () => {
    console.log('onSpeechStart');
    setText('');
  };
  const onSpeechEnd = () => {


    console.log('onSpeechEnd');
  };
  const onSpeechResults = (event) => {
    console.log(' onSpeechResults', event);
    console.log('onSpeechResults');
    setText(event.value[0]);
  };
  const onSpeechError = (event) => {
    console.log('onSpeechError');
    console.log(event.error);
  };

  const onRecordVoice = () => {
    if (isRecord) {
      Voice.stop();
      setModalVisible(!modalVisible);
    } else {
      
      Voice.start('en-US'); // languages code e.g 'en-US'
    }
    setIsRecord(!isRecord);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    console.log("Stasrt",Voice.onSpeechStart)

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor:'#ffff',justifyContent: 'center'}}>
       <Text style={{color:'black'}}>{voiceLabel}</Text>

      <TouchableOpacity
      onPress={() => setModalVisible(true)}
        
        style={{
          // backgroundColor: 'red',
          marginTop:10
          // width: 80,
          // height: 30,
          // alignItems: 'center',
          // justifyContent: 'center',
          // borderRadius: 10,
        }}>
        {/* <Text>{buttonLabel}</Text> */}
        <Image
        style={{}}
        source={require('./src/Images/mic.png')}
      />
      </TouchableOpacity>


     
     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

          <TouchableOpacity
          style={{position:'absolute',right:0,
          margin:15}}
      onPress={() => setModalVisible(false)}
      >
          <Image
        style={{
          // alignSelf:'flex-end',
          
        height:30, width:30}}
        source={require('./src/Images/close.png')}
      />
      </TouchableOpacity>
           
          <Text style={{color:'#ffff'}}>{voiceLabel}</Text>

            <TouchableOpacity
          onPress={onRecordVoice}
        
        style={{
         
          marginTop:10
         
        }}>
        <Text style={{color:'#ffff', marginBottom:10}}>{buttonLabel}</Text>
        <Image
        style={{}}
        source={require('./src/Images/mic.png')}
      />
      </TouchableOpacity>
      <Text style={{ color:'#ffff', marginTop:5}}>{voiceButtonText}</Text>
            <Text style={{position:'absolute', bottom:15, color:'#ffff'}}>English (United States)</Text>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default App;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
   // justifyContent: "center",
    alignItems: "center",
    //marginTop: 22
   
  },
  modalView: {
    //margin: 20,
    backgroundColor: "#3FB65F",
   borderRadius: 10,
    height:'30%',
    padding: 35,
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0,
    width:'100%',
    bottom:0,
    position:'absolute',
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
   // shadowRadius: 4,
   // elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
