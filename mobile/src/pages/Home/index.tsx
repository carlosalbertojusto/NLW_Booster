import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'

import { View, ImageBackground, Text, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native'

import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import RNPickerselect from 'react-native-picker-select'

interface IBGEUFResponse {
  sigla: string
}
interface IBGECityResponse {
  nome: string
}

const Home = () => {
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')
  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')
  const navigation = useNavigation()
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  
  
  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city
    })
  }



  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla).sort((a,b) => {
        if(a<b) return -1
        if(a>b) return 1
        return 0
      })

      setUfs(ufInitials)
    })
  }, [])


  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/distritos?orderBy=nome`).then(response => {
      const cityNames = response.data.map(city => city.nome).sort((a,b) => {
        if(a<b) return -1
        if(a>b) return 1
        return 0
      })

      setCities(cityNames)
    })
  }, [selectedUf])


  function handleNavigateToPoint() {
    navigation.navigate('Points', { uf: selectedUf, city: selectedCity })
  }

  function handleSelectUf(value: string) {
    setSelectedUf(value)
  }

  function handleSelectCity(value: string) {
    setSelectedCity(value)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos </Text>
            <Text style={styles.description}> Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente </Text>
          </View>
        </View>

        <View style={styles.footer}>
          
          <RNPickerselect 
            style={{
              inputAndroidContainer: styles.inputContainer,
              inputAndroid: styles.input
            }}
            onValueChange={handleSelectUf}
            value={selectedUf}
            placeholder={{
              label: "Digite uma UF",
              value: '0'
            }}
            items={ufs.map(uf => ({
              label: uf,
              value: uf
            }))}
          />
          <RNPickerselect
            style={{
              inputAndroidContainer: styles.inputContainer,
              inputAndroid: styles.input
            }}
            onValueChange={handleSelectCity}
            disabled={selectedUf === '0'}
            value={selectedCity}
            placeholder={{
              label: "Digite a Cidade",
              value: '0'  
            }}
            items={cities.map(city => ({
              label: city,
              value: city
            }))}
            
          />
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>

            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#fff" size={24} />
              </Text>

            </View>

            <Text style={styles.buttonText}>
              Entrar
          </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  inputContainer: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home