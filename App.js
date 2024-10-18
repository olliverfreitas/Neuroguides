import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';

// Imagens de fundo e perfil
import backgroundImage from './assets/neuroguides-logo.jpg';  // Imagem de fundo
import profileImage from './assets/account-circle-2.png';    // Imagem de perfil

const Stack = createStackNavigator();

// Tela de Login
function LoginScreen({ navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Usuário" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Upload')}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Tela de Upload
function UploadScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Upload de Foto</Text>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Selecionar Imagem</Text>
        </TouchableOpacity>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Ir para Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Tela de Home
function HomeScreen({ posts, navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.homeContainer}>
        {/* Barra de Pesquisa */}
        <View style={styles.searchBar}>
          <TouchableOpacity>
            <Feather name="message-square" size={24} color="black" />
          </TouchableOpacity>
          <TextInput style={styles.searchInput} placeholder="Pesquisar..." />
          <TouchableOpacity>
            <Image source={profileImage} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        {/* Lista de posts */}
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text>{item.content}</Text>
              {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
            </View>
          )}
        />

        {/* Barra de Navegação Inferior */}
        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <FontAwesome name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            <MaterialIcons name="map" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
            <FontAwesome name="plus-square" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="users" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

// Tela de Criação de Post
function CreatePostScreen({ addPost, navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const createPost = () => {
    const newPost = {
      id: Math.random().toString(),
      title: title,
      content: content,
      image: selectedImage,
    };
    addPost(newPost);  // Adiciona o novo post à lista
    navigation.navigate('Home');  // Retorna à tela Home após criar o post
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>Criar Novo Post</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Conteúdo"
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Selecionar Imagem</Text>
        </TouchableOpacity>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
        )}
        <TouchableOpacity style={styles.button} onPress={createPost}>
          <Text style={styles.buttonText}>Criar Post</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Tela de Mapa (Localização de Manaus)
function MapScreen() {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: -3.1190275,  // Latitude de Manaus
        longitude: -60.0217314,  // Longitude de Manaus
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{ latitude: -3.1190275, longitude: -60.0217314 }}
        title={"Manaus"}
        description={"Capital do Amazonas"}
      />
    </MapView>
  );
}

export default function App() {
  const [posts, setPosts] = useState([
    { id: '1', title: 'Post 1', content: 'Este é o conteúdo do post 1.', image: null },
    { id: '2', title: 'Post 2', content: 'Este é o conteúdo do post 2.', image: null },
  ]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);  // Atualiza a lista de posts
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} posts={posts} />}
        </Stack.Screen>
        <Stack.Screen name="CreatePost">
          {(props) => <CreatePostScreen {...props} addPost={addPost} />}
        </Stack.Screen>
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  homeContainer: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  post: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
});
