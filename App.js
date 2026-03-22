import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';

const recomendacoes = {
  feliz: {
    emoji: '😄',
    mensagem: 'Seu dia já está bom, então aproveite algo leve e divertido!',
    musicas: [
      { nome: 'Happy – Pharrell Williams', url: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs' },
      { nome: 'Can\'t Stop the Feeling – Justin Timberlake', url: 'https://www.youtube.com/watch?v=ru0K8uYEZWw' },
      { nome: 'Good as Hell – Lizzo', url: 'https://www.youtube.com/watch?v=SmbmeOgWsqE' },
      { nome: 'Levitating – Dua Lipa', url: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw' },
      { nome: 'Walking on Sunshine – Katrina', url: 'https://www.youtube.com/watch?v=iPUmE-tne5U' },
    ],
    filmes: [
      'Divertida Mente',
      'Se Beber, Não Case',
      'O Máskara',
      'Mamma Mia',
      'SuperBad',
    ],
  },
  triste: {
    emoji: '😢',
    mensagem: 'Tudo bem ter dias difíceis. Escolha algo que acolha seu momento.',
    musicas: [
      { nome: 'Someone Like You – Adele', url: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0' },
      { nome: 'Fix You – Coldplay', url: 'https://www.youtube.com/watch?v=k4V3Mo61fJM' },
      { nome: 'Let Her Go – Passenger', url: 'https://www.youtube.com/watch?v=RBumgq5yVrA' },
      { nome: 'The Night We Met – Lord Huron', url: 'https://www.youtube.com/watch?v=KtlgYxa6BMU' },
      { nome: 'Skinny Love – Bon Iver', url: 'https://www.youtube.com/watch?v=ssdgFoHLwnk' },
    ],
    filmes: [
      'Diário de uma Paixão',
      'Ela',
      'Minhas Mães e Meu Pai',
      'A Culpa é das Estrelas',
      'Manchester à Beira-Mar',
    ],
  },
  animado: {
    emoji: '🔥',
    mensagem: 'Você está com energia! Aproveite algo intenso e empolgante.',
    musicas: [
      { nome: 'Blinding Lights – The Weeknd', url: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ' },
      { nome: 'SICKO MODE – Travis Scott', url: 'https://www.youtube.com/watch?v=6ONRf7h3Mdk' },
      { nome: 'Lose Yourself – Eminem', url: 'https://www.youtube.com/watch?v=_Yhyp-_hX2s' },
      { nome: 'Rockstar – DaBaby', url: 'https://www.youtube.com/watch?v=rogyNBCB1E4' },
      { nome: 'Till I Collapse – Eminem', url: 'https://www.youtube.com/watch?v=ytQ5MemKTMY' },
    ],
    filmes: [
      'Mad Max: Estrada da Fúria',
      'John Wick',
      'Homem-Aranha no Aranhaverso',
      'Top Gun: Maverick',
      'Vingadores: Ultimato',
    ],
  },
  calmo: {
    emoji: '🌙',
    mensagem: 'Hoje combina com paz, conforto e tranquilidade.',
    musicas: [
      { nome: 'Clair de Lune – Debussy', url: 'https://www.youtube.com/watch?v=CvFH_6DNRCY' },
      { nome: 'Sunset Lover – Petit Biscuit', url: 'https://www.youtube.com/watch?v=NhPBMbJv1zs' },
      { nome: 'Weightless – Marconi Union', url: 'https://www.youtube.com/watch?v=UfcAVejslrU' },
      { nome: 'Experience – Ludovico Einaudi', url: 'https://www.youtube.com/watch?v=hN_q-_nGv4U' },
      { nome: 'Lo-Fi Hip Hop Radio', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
    ],
    filmes: [
      'A Vida Secreta de Walter Mitty',
      'Chegada',
      'Ilha das Flores',
      'Meu Vizinho Totoro',
      'Encontros e Desencontros',
    ],
  },
};

function sortearSemRepetir(lista, ultimoIndex) {
  if (lista.length === 1) return 0;
  let novo;
  do {
    novo = Math.floor(Math.random() * lista.length);
  } while (novo === ultimoIndex);
  return novo;
}

export default function App() {
  const [humorSelecionado, setHumorSelecionado] = useState('');
  const [musica, setMusica] = useState(null);
  const [filme, setFilme] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Guarda o último índice usado por humor
  const [ultimosIndices, setUltimosIndices] = useState({
    feliz: -1, triste: -1, animado: -1, calmo: -1,
  });

  function recomendar(humor) {
    const dados = recomendacoes[humor];

    const iMusica = sortearSemRepetir(dados.musicas, ultimosIndices[humor]);
    const iFilme = Math.floor(Math.random() * dados.filmes.length);

    setHumorSelecionado(humor);
    setMusica(dados.musicas[iMusica]);
    setFilme(dados.filmes[iFilme]);
    setMensagem(dados.mensagem);
    setUltimosIndices(prev => ({ ...prev, [humor]: iMusica }));
  }

  function limpar() {
    setHumorSelecionado('');
    setMusica(null);
    setFilme('');
    setMensagem('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>MoodPlay</Text>
      <Text style={styles.subtitulo}>
        Escolha como você está se sentindo hoje:
      </Text>

      {Object.entries(recomendacoes).map(([humor, dados]) => (
        <TouchableOpacity
          key={humor}
          style={[styles.botao, humorSelecionado === humor && styles.botaoAtivo]}
          onPress={() => recomendar(humor)}
        >
          <Text style={styles.textoBotao}>
            {dados.emoji} {humor.charAt(0).toUpperCase() + humor.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={[styles.botao, styles.botaoLimpar]} onPress={limpar}>
        <Text style={styles.textoBotao}>Limpar</Text>
      </TouchableOpacity>

      {humorSelecionado !== '' && musica && (
        <View style={styles.caixaResultado}>
          <Text style={styles.resultadoTitulo}>
            {recomendacoes[humorSelecionado].emoji} Humor: {humorSelecionado}
          </Text>

          <Text style={styles.label}>🎵 Música sugerida:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(musica.url)}>
            <Text style={styles.link}>{musica.nome}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>🎬 Filme sugerido:</Text>
          <Text style={styles.resultadoTexto}>{filme}</Text>

          <Text style={styles.mensagem}>{mensagem}</Text>

          <TouchableOpacity
            style={styles.botaoNovamente}
            onPress={() => recomendar(humorSelecionado)}
          >
            <Text style={styles.textoBotaoNovamente}>🔀 Outra sugestão</Text>
          </TouchableOpacity>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2b2d42',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
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
  botaoAtivo: {
    backgroundColor: '#3c096c',
    borderWidth: 2,
    borderColor: '#e0aaff',
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
    marginBottom: 14,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 2,
  },
  link: {
    fontSize: 16,
    color: '#5a189a',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  resultadoTexto: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  mensagem: {
    marginTop: 12,
    fontSize: 15,
    color: '#444',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  botaoNovamente: {
    marginTop: 16,
    backgroundColor: '#e0aaff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoNovamente: {
    color: '#3c096c',
    fontWeight: 'bold',
    fontSize: 15,
  },
});