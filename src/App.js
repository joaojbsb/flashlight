import React, {useState, useEffect} from "react";
import { View, Image, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import offlight from './assets/icons/eco-light-off.png';
import light from './assets/icons/eco-light.png';
import Torch from "react-native-torch";
import RNShake from 'react-native-shake';
import logoWhite from './assets/icons/logo-dio-white.png';
import logo from './assets/icons/logo-dio.png';

export const App = ()=>{
  const [ toggle, setToggle ]= useState(false);

  const handleChangeToggle = ()=> setToggle(oldToggle => !oldToggle);

  useEffect(()=>{
    Torch.switchState(toggle);
    console.log("mudar o toggle" + toggle)
  },[toggle]);

  //quando o celular for chachoalhado o togle vai mudar
  useEffect(()=>{
    const subscription = RNShake.addListener(()=>{
      handleChangeToggle(oldToggle => !oldToggle);
    });
    //essa função vai ser chamada quando o component for desmontado
    return () => subscription.remove();
  },[]);

  return(
    <View style={toggle ? styles.containerLight : styles.container}>
      <TouchableOpacity onPress={handleChangeToggle} >
        <Image 
          style={ toggle ? styles.lightingOn : styles.lightingOff}
          source={ toggle ? light : offlight }
        />

        <Image 
          style={ styles.dioLogo}
          source={ toggle ? logo : logoWhite }
        />
      </TouchableOpacity>
    </View>

  )
}

