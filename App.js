/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const user = 'Alan';
  const [count, setCount] = useState(0);
  const [pokemon, setPokemon] = useState('');
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState('');

  const Pokemon = async () => {
    setLoading(true);
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
    const pokemon = await response.json();

    setPokemon(pokemon);
    await AsyncStorage.setItem('Value', 'Salvo no Celular');
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const itemSalvo = await AsyncStorage.getItem('Value');
    setItem(JSON.parse(itemSalvo));
  };

  useEffect(() => {
    Pokemon();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: count % 2 === 0 ? 'blue' : 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 80, color: 'white'}}>
          {loading ? <ActivityIndicator /> : item}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            width: 200,
            height: 50,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setCount(count + 1)}>
          <Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>
            COUNT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
