import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function App() {
  const [humorSelecionado, setHumorSelecionado] = useState('');
  const [musica, setMusica] = useState('');
  const [filme, setFilme] = useState('');
  const [mensagem, setMensagem] = useState('');

  function recomendar(humor) {
    setHumorSelecionado(humor);

    if (humor === 'feliz') {
      setMusica('Pop alegre ou playlist animada');
      setFilme('Comédia ou animação divertida');
      setMensagem('Seu dia já está bom, então aproveite algo leve e divertido!');
    } else if (humor === 'triste') {
      setMusica('Música calma ou acústica');
      setFilme('Drama emocionante ou filme reconfortante');
      setMensagem('Tudo bem ter dias difíceis. Escolha algo que acolha seu momento.');
    } else if (humor === 'animado') {
      setMusica('Eletrônica, funk, pop ou música para dançar');
      setFilme('Ação, aventura ou super-herói');
      setMensagem('Você está com energia! Aproveite algo intenso e empolgante.');
    } else if (humor === 'calmo') {
      setMusica('Lo-fi, instrumental ou acústica suave');
      setFilme('Romance leve, drama tranquilo ou natureza');
      setMensagem('Hoje combina com paz, conforto e tranquilidade.');
    }
  }

  function limpar() {
    setHumorSelecionado('');
    setMusica('');
    setFilme('');
    setMensagem('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>MoodPlay</Text>
      <Text style={styles.subtitulo}>
        Escolha como você está se sentindo hoje:
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => recomendar('feliz')}
      >
        <Text style={styles.textoBotao}>Feliz 😄</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => recomendar('triste')}
      >
        <Text style={styles.textoBotao}>Triste 😢</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => recomendar('animado')}
      >
        <Text style={styles.textoBotao}>Animado 🔥</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => recomendar('calmo')}
      >
        <Text style={styles.textoBotao}>Calmo 🌙</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, styles.botaoLimpar]}
        onPress={limpar}
      >
        <Text style={styles.textoBotao}>Limpar</Text>
      </TouchableOpacity>

      {humorSelecionado !== '' && (
        <View style={styles.caixaResultado}>
          <Text style={styles.resultadoTitulo}>
            Resultado para: {humorSelecionado}
          </Text>
          <Text style={styles.resultadoTexto}>🎵 Música: {musica}</Text>
          <Text style={styles.resultadoTexto}>🎬 Filme: {filme}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#5a189a',
    width: '100%',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  botaoLimpar: {
    backgroundColor: '#d00000',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  caixaResultado: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultadoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultadoTexto: {
    fontSize: 17,
    color: '#333',
    marginBottom: 8,
  },
  mensagem: {
    marginTop: 10,
    fontSize: 16,
    color: '#444',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});