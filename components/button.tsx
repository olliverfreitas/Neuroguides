import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  buttonlink: string;
};

export const Button = (props: Props) => {
  const navigation = useNavigation(); // Hook para acessar a navegação

  function goToScreen() {
    navigation.navigate(props.buttonlink); // Navega para a rota passada via props
  }

  return (
    <Pressable style={styles.button} onPress={goToScreen}>
      <Text style={styles.buttonText}>Entrar</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 246,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
  },
});
