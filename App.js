import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [contador, setContador] = useState(0);

  function aumentar() {
    setContador(contador + 1);
  }

  function mostrarMensagem() {
    Alert.alert("Funcionando 🎉", "Seu app está rodando perfeitamente!");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Primeiro App Expo</Text>

      <Text style={styles.contador}>
        Contador: {contador}
      </Text>

      <TouchableOpacity style={styles.botao} onPress={aumentar}>
        <Text style={styles.textoBotao}>Aumentar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, styles.botaoSecundario]} onPress={mostrarMensagem}>
        <Text style={styles.textoBotao}>Mostrar Alerta</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contador: {
    fontSize: 20,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  botaoSecundario: {
    backgroundColor: '#2196F3',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});