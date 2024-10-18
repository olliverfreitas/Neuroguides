import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

// Tela de Login
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de login
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('UploadPhoto'); // Navegar para a tela de upload de foto
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/imagem-de-fundo.jpg' }} // URL da imagem de fundo
        style={styles.backgroundImage}
      />
      
      <View style={styles.overlay}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Entrar" onPress={handleLogin} />
      </View>
    </View>
  );
};

// Tela de Upload de Foto
const UploadPhotoScreen = () => {
  const [photo, setPhoto] = useState(null);

  const handleSelectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Upload cancelado');
      } else if (response.error) {
        console.log('Erro:', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setPhoto(source);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/imagem-de-fundo.jpg' }} // URL da imagem de fundo
        style={styles.backgroundImage}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Upload de Foto</Text>
        {photo ? (
          <Image source={photo} style={styles.uploadedPhoto} />
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={handleSelectPhoto}>
            <Text style={styles.uploadButtonText}>Selecionar Foto</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Navegação entre telas
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UploadPhoto" component={UploadPhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  uploadButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadedPhoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
  },
});

export default App;
