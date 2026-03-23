// Importações do Expo e React Native
// StatusBar: barra de status do celular (hora, bateria, etc.)
import { StatusBar } from 'expo-status-bar';


import { useState, useRef, useEffect } from 'react';

// Componentes do React Native:
import {
  StyleSheet,        
  Text,              
  View,              
  TouchableOpacity,  
  ScrollView,        
  Linking,           
  Animated,          
  TextInput,         
  Alert,             
  KeyboardAvoidingView, 
  Platform,          
} from 'react-native';



const C = {
  bg: '#0D0618',          
  bgCard: '#1A0D2E',      
  roxoEscuro: '#2D1B4E',  
  roxo: '#6B2FBE',        
  roxoMedio: '#8B45D4',   
  lilas: '#B57BEE',       
  lilasClaro: '#D4ADFF',  
  lilasUltra: '#EDD9FF',  
  branco: '#FFFFFF',      
  brancoSuave: '#F0E6FF', 
  cinza: '#8A7A9B',       
  cinzaEscuro: '#3D2D52', 
  rosa: '#E040FB',        
  azulRoxo: '#7C4DFF',    
};

const recomendacoes = {

  feliz: {
    emoji: '😄',
    label: 'Feliz',
    cor: '#F7C948',        
    corEscura: '#B8860B',
    mensagem: 'Seu dia já está bom, aproveite algo leve e divertido!',
    musicas: [
      { nome: 'Happy – Pharrell Williams', url: 'https://www.youtube.com/watch?v=ZbZSe6N_BXs' },
      { nome: "Can't Stop the Feeling – Justin Timberlake", url: 'https://www.youtube.com/watch?v=ru0K8uYEZWw' },
      { nome: 'Good as Hell – Lizzo', url: 'https://www.youtube.com/watch?v=SmbmeOgWsqE' },
      { nome: 'Levitating – Dua Lipa', url: 'https://www.youtube.com/watch?v=TUVcZfQe-Kw' },
      { nome: 'Walking on Sunshine – Katrina', url: 'https://www.youtube.com/watch?v=iPUmE-tne5U' },
      { nome: 'Aquele 1% – Thiaguinho ft. Thiaguinho MT', url: 'https://www.youtube.com/watch?v=3nHHx9LjBQE' },
      { nome: 'Coração na Boca – Péricles', url: 'https://www.youtube.com/watch?v=8J1hmBJPX3A' },
      { nome: 'Evidências – Chitãozinho & Xororó', url: 'https://www.youtube.com/watch?v=Y3iGHwvR_DQ' },
      { nome: 'Lepo Lepo – Psirico', url: 'https://www.youtube.com/watch?v=H5sHQZKqQkM' },
      { nome: 'Bara Bara Bere Bere – Gusttavo Lima', url: 'https://www.youtube.com/watch?v=NUsoVlDFqZg' },
    ],
    filmes: ['Divertida Mente', 'Se Beber, Não Case', 'Ace Ventura', 'Mamma Mia', 'SuperBad'],
  },

  triste: {
    emoji: '😢',
    label: 'Triste',
    cor: '#7C9EFF',        
    corEscura: '#2A3F8F',
    mensagem: 'Tudo bem ter dias difíceis. Escolha algo que acolha seu momento.',
    musicas: [
      { nome: 'Someone Like You – Adele', url: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0' },
      { nome: 'Fix You – Coldplay', url: 'https://www.youtube.com/watch?v=k4V3Mo61fJM' },
      { nome: 'Let Her Go – Passenger', url: 'https://www.youtube.com/watch?v=RBumgq5yVrA' },
      { nome: 'The Night We Met – Lord Huron', url: 'https://www.youtube.com/watch?v=KtlgYxa6BMU' },
      { nome: 'Skinny Love – Bon Iver', url: 'https://www.youtube.com/watch?v=ssdgFoHLwnk' },
      { nome: 'Trem Bala – Ana Vilela', url: 'https://www.youtube.com/watch?v=FcT3Gt7bHhE' },
      { nome: 'Iluminado – Projota', url: 'https://www.youtube.com/watch?v=A2tugVOhNR4' },
      { nome: 'Exagerado – Cazuza', url: 'https://www.youtube.com/watch?v=GFbLBTbP4AQ' },
      { nome: 'Como Vai Você – Fagner', url: 'https://www.youtube.com/watch?v=_5dHD-TZPBE' },
      { nome: 'Apenas Mais Uma de Amor – Lulu Santos', url: 'https://www.youtube.com/watch?v=8aN9c8p4RcA' },
    ],
    filmes: ['Diário de uma Paixão', 'Ela', 'Minhas Mães e Meu Pai', 'A Culpa é das Estrelas', 'Manchester à Beira-Mar'],
  },

  animado: {
    emoji: '🔥',
    label: 'Animado',
    cor: '#FF6B6B',      
    corEscura: '#8B0000',
    mensagem: 'Você está com energia! Aproveite algo intenso e empolgante.',
    musicas: [
      { nome: 'Blinding Lights – The Weeknd', url: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ' },
      { nome: 'SICKO MODE – Travis Scott', url: 'https://www.youtube.com/watch?v=6ONRf7h3Mdk' },
      { nome: 'Lose Yourself – Eminem', url: 'https://www.youtube.com/watch?v=_Yhyp-_hX2s' },
      { nome: 'Rockstar – DaBaby', url: 'https://www.youtube.com/watch?v=rogyNBCB1E4' },
      { nome: 'Till I Collapse – Eminem', url: 'https://www.youtube.com/watch?v=ytQ5MemKTMY' },
      { nome: 'Rajadão – MC Ryan SP', url: 'https://www.youtube.com/watch?v=2S0fMqFSMCs' },
      { nome: 'Bum Bum Tam Tam – MC Kekel & MC Rita', url: 'https://www.youtube.com/watch?v=RqPSP0pSJLw' },
      { nome: 'DANÇARINA – Pedro Sampaio', url: 'https://www.youtube.com/watch?v=yDf6Ge7FKLY' },
      { nome: 'Vai Malandra – Anitta, MC Zaac, Maejor', url: 'https://www.youtube.com/watch?v=vGFZMqPfQJo' },
      { nome: 'Modo Turbo – Anitta & Tropkillaz', url: 'https://www.youtube.com/watch?v=P3sSHEiDzHE' },
    ],
    filmes: ['Mad Max: Estrada da Fúria', 'John Wick', 'Homem-Aranha no Aranhaverso', 'Top Gun: Maverick', 'Vingadores: Ultimato'],
  },

  calmo: {
    emoji: '🌙',
    label: 'Calmo',
    cor: '#4DD8A0',        
    corEscura: '#1A5C40',
    mensagem: 'Hoje combina com paz, conforto e tranquilidade.',
    musicas: [
      { nome: 'Clair de Lune – Debussy', url: 'https://www.youtube.com/watch?v=CvFH_6DNRCY' },
      { nome: 'Sunset Lover – Petit Biscuit', url: 'https://www.youtube.com/watch?v=NhPBMbJv1zs' },
      { nome: 'Weightless – Marconi Union', url: 'https://www.youtube.com/watch?v=UfcAVejslrU' },
      { nome: 'Experience – Ludovico Einaudi', url: 'https://www.youtube.com/watch?v=hN_q-_nGv4U' },
      { nome: 'Lo-Fi Hip Hop Radio', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
      { nome: 'Lua e Estrela – Djavan', url: 'https://www.youtube.com/watch?v=PFpMnIGMa3s' },
      { nome: 'Quem de Nós Dois – Maria Gadú', url: 'https://www.youtube.com/watch?v=V9GqZFAzp3s' },
      { nome: 'O Que É, O Que É – Gonzaguinha', url: 'https://www.youtube.com/watch?v=rbxFvEBEHak' },
      { nome: 'Meu Bem Querer – Skank', url: 'https://www.youtube.com/watch?v=DFOFrKkN9pk' },
      { nome: 'Preciso Me Encontrar – Cartola', url: 'https://www.youtube.com/watch?v=RkBWNZWXSYo' },
    ],
    filmes: ['A Vida Secreta de Walter Mitty', 'Chegada', 'Ilha das Flores', 'Meu Vizinho Totoro', 'Encontros e Desencontros'],
  },
};


// Sorteia um índice aleatório da lista, evitando que a mesma música apareça duas vezes seguidas
function sortearSemRepetir(lista, ultimoIndex) {
  // Se a lista tem só 1 item, não há escolha — retorna 0
  if (lista.length === 1) return 0;

  let novo;
  // Fica sorteando até pegar um índice diferente do último
  do {
    novo = Math.floor(Math.random() * lista.length);
  } while (novo === ultimoIndex);

  return novo;
}



function TelaInicio({ onNavegar }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;  
  const slideAnim = useRef(new Animated.Value(30)).current; 
  // Executa a animação de entrada assim que a tela aparece
  useEffect(() => {
    Animated.parallel([
      // Fade: de 0 (invisível) para 1 (visível) em 600ms
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      // Slide: de 30px abaixo para posição original, com efeito mola
      Animated.spring(slideAnim, { toValue: 0, friction: 7, useNativeDriver: true }),
    ]).start();
  }, []); 
  return (
    // Animated.View permite aplicar animações ao container
    <Animated.View style={[s.telaInicio, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

      {}
      <View style={s.headerGlowContainer}>
        {}
        <View style={s.headerGlow} />
        <Text style={s.appTitulo}>MoodPlay</Text>
        <Text style={s.appSubtitulo}>Música e filmes para cada momento seu</Text>
      </View>

      {}
      <View style={s.menuContainer}>

        {/* Botão: Como estou me sentindo(vai para tela de humor) */}
        <TouchableOpacity style={s.menuBotao} onPress={() => onNavegar('humor')} activeOpacity={0.8}>
          <View style={[s.menuIcone, { backgroundColor: C.roxo + '33' }]}>
            <Text style={s.menuIconeEmoji}>🎵</Text>
          </View>
          <View style={s.menuTextoContainer}>
            <Text style={s.menuBotaoTitulo}>Como estou me sentindo?</Text>
            <Text style={s.menuBotaoSub}>Receba músicas e filmes do seu humor</Text>
          </View>
          <Text style={s.menuSeta}>›</Text>
        </TouchableOpacity>

        {/* Botão: Sugerir música/filme(vai para tela de sugestão) */}
        <TouchableOpacity style={s.menuBotao} onPress={() => onNavegar('sugestao')} activeOpacity={0.8}>
          <View style={[s.menuIcone, { backgroundColor: C.rosa + '33' }]}>
            <Text style={s.menuIconeEmoji}>💌</Text>
          </View>
          <View style={s.menuTextoContainer}>
            <Text style={s.menuBotaoTitulo}>Sugerir música ou filme</Text>
            <Text style={s.menuBotaoSub}>Indique um conteúdo para o app</Text>
          </View>
          <Text style={s.menuSeta}>›</Text>
        </TouchableOpacity>


      </View>
    </Animated.View>
  );
}

function BotaoHumor({ humor, dados, selecionado, onPress }) {
  // Animação de escala ao pressionar (efeito de "apertar")
  const scale = useRef(new Animated.Value(1)).current;

  // Animação de pulso quando o botão está selecionado
  const pulso = useRef(new Animated.Value(1)).current;

  // Referência para o loop de animação, para poder parar depois
  const loopRef = useRef(null);

  // Controla o pulso: liga quando selecionado, desliga quando não
  useEffect(() => {
    if (selecionado) {
      // Cria uma animação em loop: cresce e diminui continuamente
      loopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulso, { toValue: 1.05, duration: 700, useNativeDriver: true }),
          Animated.timing(pulso, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      );
      loopRef.current.start();
    } else {
      // Para o loop e volta ao tamanho normal
      if (loopRef.current) loopRef.current.stop();
      Animated.timing(pulso, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    }

    // Limpeza: para o loop quando o componente é desmontado
    return () => { if (loopRef.current) loopRef.current.stop(); };
  }, [selecionado]); // Re-executa sempre que 'selecionado' muda

  // Animação de "apertar" ao tocar no botão
  const handlePress = () => {
    Animated.sequence([
      // Encolhe um pouco rapidamente
      Animated.timing(scale, { toValue: 0.9, duration: 70, useNativeDriver: true }),
      // Volta com efeito mola (bounce)
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();

    onPress(humor);
  };

  return (
    <Animated.View style={[s.botaoHumorWrapper, { transform: [{ scale }, { scale: pulso }] }]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        style={[
          s.botaoHumor,
          { borderColor: selecionado ? dados.cor : C.cinzaEscuro },
          selecionado && { backgroundColor: dados.cor + '22' },
        ]}
      >
        <Text style={s.botaoEmoji}>{dados.emoji}</Text>
        <Text style={[s.botaoLabel, selecionado && { color: dados.cor }]}>{dados.label}</Text>
        {selecionado && <View style={[s.indicador, { backgroundColor: dados.cor }]} />}
      </TouchableOpacity>
    </Animated.View>
  );
}



function TelaHumor({ onVoltar }) {
  // Estado do humor atual selecionado (começa vazio)
  const [humorSelecionado, setHumorSelecionado] = useState('');

  // Música sorteada atualmente 
  const [musica, setMusica] = useState(null);

  // Filme sorteado 
  const [filme, setFilme] = useState('');

  // Guarda o último índice sorteado por humor, para não repetir
  // Começa em -1 pois ainda não foi sorteado nada
  const [ultimosIndices, setUltimosIndices] = useState({
    feliz: -1, triste: -1, animado: -1, calmo: -1,
  });

  const fadeCard = useRef(new Animated.Value(0)).current;
  const slideCard = useRef(new Animated.Value(40)).current;

  // Função chamada quando o usuário escolhe um humor
  function recomendar(humor) {
    const dados = recomendacoes[humor];

    // Sorteia uma música sem repetir a última
    const iMusica = sortearSemRepetir(dados.musicas, ultimosIndices[humor]);

    // Filme é sorteado completamente aleatório (sem controle de repetição)
    const iFilme = Math.floor(Math.random() * dados.filmes.length);

    // Atualiza os estados com as novas escolhas
    setHumorSelecionado(humor);
    setMusica(dados.musicas[iMusica]);
    setFilme(dados.filmes[iFilme]);

    // Salva o índice sorteado para este humor (para não repetir na próxima)
    setUltimosIndices(prev => ({ ...prev, [humor]: iMusica }));

    fadeCard.setValue(0);
    slideCard.setValue(40);
    Animated.parallel([
      Animated.timing(fadeCard, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.spring(slideCard, { toValue: 0, friction: 7, useNativeDriver: true }),
    ]).start();
  }

  const dados = humorSelecionado ? recomendacoes[humorSelecionado] : null;

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.telaConteudo} showsVerticalScrollIndicator={false}>

      {/* Botão de voltar */}
      <TouchableOpacity onPress={onVoltar} style={s.voltarBotao}>
        <Text style={s.voltarTexto}>‹ Voltar</Text>
      </TouchableOpacity>

      <Text style={s.telaTitulo}>Como você está?</Text>
      <Text style={s.telaSubtitulo}>Escolha seu humor do momento</Text>

      <View style={s.grid}>
        {Object.entries(recomendacoes).map(([humor, d]) => (
          <BotaoHumor
            key={humor}            
            humor={humor}          
            dados={d}              
            selecionado={humorSelecionado === humor} 
            onPress={recomendar}   
          />
        ))}
      </View>

      {/* Card de resultado, só aparece quando há humor e música selecionados */}
      {humorSelecionado !== '' && musica && dados && (
        <Animated.View style={[s.card, { opacity: fadeCard, transform: [{ translateY: slideCard }] }]}>

          {/* Cabeçalho do card com emoji e nome do humor */}
          <View style={[s.cardHeader, { backgroundColor: dados.cor + '22', borderBottomColor: dados.cor + '44' }]}>
            <Text style={s.cardHeaderEmoji}>{dados.emoji}</Text>
            <Text style={[s.cardHeaderTexto, { color: dados.cor }]}>
              Você está {dados.label.toLowerCase()}!
            </Text>
          </View>

          {/* Seção de música com link clicável */}
          <View style={s.cardSecao}>
            <Text style={s.cardLabel}>🎵  MÚSICA DO MOMENTO</Text>
            {/* Ao tocar, abre o link no YouTube */}
            <TouchableOpacity
              style={[s.linkBotao, { borderColor: dados.cor + '66' }]}
              onPress={() => Linking.openURL(musica.url)}
              activeOpacity={0.7}
            >
              {/* numberOfLines={2} limita o texto a 2 linhas com "..." */}
              <Text style={[s.linkTexto, { color: dados.cor }]} numberOfLines={2}>
                {musica.nome}
              </Text>
              {/* Botão de play */}
              <View style={[s.playBtn, { backgroundColor: dados.cor }]}>
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>▶</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Seção de filme */}
          <View style={s.cardSecao}>
            <Text style={s.cardLabel}>🎬  FILME SUGERIDO</Text>
            <View style={[s.filmeTag, { backgroundColor: dados.cor + '18' }]}>
              <Text style={[s.filmeTexto, { color: C.brancoSuave }]}>🍿  {filme}</Text>
            </View>
          </View>

          {/* Mensagem motivacional em itálico */}
          <Text style={s.cardMensagem}>"{dados.mensagem}"</Text>

          {/* Botão para sortear outra sugestão sem mudar o humor */}
          <TouchableOpacity
            style={[s.novaSugestaoBtn, { backgroundColor: dados.cor }]}
            onPress={() => recomendar(humorSelecionado)} // chama recomendar com o mesmo humor
            activeOpacity={0.8}
          >
            <Text style={s.novaSugestaoTexto}>🔀  Outra sugestão</Text>
          </TouchableOpacity>

        </Animated.View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}


function TelaSugestao({ onVoltar }) {
  // Tipo de sugestão: 'musica' ou 'filme'
  const [tipo, setTipo] = useState('musica');

  // Campos do formulário
  const [nome, setNome] = useState('');   // nome da música ou filme
  const [link, setLink] = useState('');   // link (só para músicas)
  const [humor, setHumor] = useState(''); // humor selecionado

  // Controla se a mensagem de sucesso está visível
  const [enviado, setEnviado] = useState(false);

  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  // Anima a entrada da tela
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  // Troca entre as abas Música/Filme e limpa o formulário
  function trocarTipo(t) {
    setTipo(t);
    setNome('');
    setLink('');
    setHumor('');
    setEnviado(false);
    successAnim.setValue(0); // reseta a animação de sucesso
  }

  // Função de envio da sugestão
  function enviar() {
    // Validações: verifica se os campos obrigatórios estão preenchidos
    if (!nome.trim()) {
      Alert.alert('Ops!', `Por favor, coloque o nome d${tipo === 'musica' ? 'a música' : 'o filme'}.`);
      return;
    }
    if (tipo === 'musica' && !link.trim()) {
      Alert.alert('Ops!', 'Por favor, coloque o link da música.');
      return;
    }
    if (!humor) {
      Alert.alert('Ops!', `Escolha para qual humor esse ${tipo === 'musica' ? 'música' : 'filme'} se encaixa.`);
      return;
    }

    // Anima e exibe o card de sucesso
    Animated.timing(successAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
    setEnviado(true);

    // Limpa os campos após envio
    setNome('');
    setLink('');
    setHumor('');
  }

  // Lista de humores para os chips de seleção
  const humores = ['feliz', 'triste', 'animado', 'calmo'];

  return (
    // KeyboardAvoidingView evita que o teclado cubra os campos no iOS
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.telaConteudo} showsVerticalScrollIndicator={false}>

        {/* Botão de voltar */}
        <TouchableOpacity onPress={onVoltar} style={s.voltarBotao}>
          <Text style={s.voltarTexto}>‹ Voltar</Text>
        </TouchableOpacity>

        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={s.telaTitulo}>💌 Sugerir conteúdo</Text>
          <Text style={s.telaSubtitulo}>Indica uma música ou filme que você ama!</Text>

          {/* ── Abas Música / Filme ── */}
          <View style={s.abas}>
            <TouchableOpacity
              style={[s.aba, tipo === 'musica' && s.abaAtiva]}
              onPress={() => trocarTipo('musica')}
              activeOpacity={0.8}
            >
              <Text style={[s.abaTexto, tipo === 'musica' && s.abaTextoAtivo]}>🎵  Música</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.aba, tipo === 'filme' && s.abaAtiva]}
              onPress={() => trocarTipo('filme')}
              activeOpacity={0.8}
            >
              <Text style={[s.abaTexto, tipo === 'filme' && s.abaTextoAtivo]}>🎬  Filme</Text>
            </TouchableOpacity>
          </View>

          {/* ── Formulário ── */}
          <View style={s.formulario}>

            {/* Campo: nome da música ou filme */}
            <Text style={s.inputLabel}>
              {tipo === 'musica' ? 'Nome da música e artista' : 'Nome do filme'}
            </Text>
            <TextInput
              style={s.input}
              placeholder={tipo === 'musica' ? 'Ex: Bohemian Rhapsody – Queen' : 'Ex: Divertida Mente'}
              placeholderTextColor={C.cinza}
              value={nome}
              onChangeText={setNome} // atualiza o estado a cada tecla
              maxLength={100}        // limite de caracteres
            />

            {/* Campo de link, aparece APENAS quando tipo é música */}
            {tipo === 'musica' && (
              <>
                <Text style={s.inputLabel}>Link do YouTube ou Spotify</Text>
                <TextInput
                  style={s.input}
                  placeholder="Ex: https://youtube.com/..."
                  placeholderTextColor={C.cinza}
                  value={link}
                  onChangeText={setLink}
                  autoCapitalize="none" 
                  keyboardType="url"    
                  maxLength={300}
                />
              </>
            )}

            {/* Campo: seleção de humor com chips */}
            <Text style={s.inputLabel}>
              Qual humor combina com {tipo === 'musica' ? 'essa música' : 'esse filme'}?
            </Text>
            <View style={s.humorGrid}>
              {humores.map(h => {
                const d = recomendacoes[h];
                return (
                  <TouchableOpacity
                    key={h}
                    style={[
                      s.humorChip,
                      humor === h && { backgroundColor: d.cor + '33', borderColor: d.cor },
                    ]}
                    onPress={() => setHumor(h)}
                    activeOpacity={0.8}
                  >
                    <Text style={s.humorChipEmoji}>{d.emoji}</Text>
                    <Text style={[s.humorChipLabel, humor === h && { color: d.cor }]}>
                      {d.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Botão de envio */}
            <TouchableOpacity style={s.enviarBtn} onPress={enviar} activeOpacity={0.8}>
              <Text style={s.enviarTexto}>Enviar sugestão 🚀</Text>
            </TouchableOpacity>

            {/* Mensagem de sucesso, aparece após o envio com animação */}
            {enviado && (
              <Animated.View style={[s.sucessoCard, { opacity: successAnim }]}>
                <Text style={s.sucessoTexto}>
                  ✅ Sugestão enviada! Obrigado pelo amor ao{' '}
                  {tipo === 'musica' ? 'música' : 'cinema'}!{' '}
                  {tipo === 'musica' ? '🎶' : '🍿'}
                </Text>
              </Animated.View>
            )}

          </View>
        </Animated.View>

        {/* Espaço extra para o teclado não tampar o botão */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default function App() {
  // 'tela' guarda qual tela está aberta: 'inicio', 'humor' ou 'sugestao'
  const [tela, setTela] = useState('inicio');

  return (
    // Container principal que ocupa toda a tela
    <View style={s.appContainer}>
      {/* Barra de status clara (ícones brancos) */}
      <StatusBar style="light" />

      {/* Renderização condicional: só mostra o componente da tela atual */}
      {tela === 'inicio'   && <TelaInicio onNavegar={setTela} />}
      {tela === 'humor'    && <TelaHumor onVoltar={() => setTela('inicio')} />}

      {tela === 'sugestao' && <TelaSugestao onVoltar={() => setTela('inicio')} />}
    </View>
  );
}



const s = StyleSheet.create({

  appContainer: {
    flex: 1,                                          
    backgroundColor: C.bg,                            
    paddingTop: Platform.OS === 'ios' ? 50 : 35,     
  },

  telaInicio: {
    flex: 1,
    paddingHorizontal: 22,
  },
  headerGlowContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  headerGlow: {
    position: 'absolute',  
    width: 200,
    height: 200,
    borderRadius: 100,     
    backgroundColor: C.roxo,
    opacity: 0.15,         
    top: -30,
  },
  appEmoji: {
    fontSize: 56,
    marginBottom: 10,
  },
  appTitulo: {
    fontSize: 42,
    fontWeight: '900',     
    color: C.branco,
    letterSpacing: -1.5,   
  },
  appSubtitulo: {
    fontSize: 14,
    color: C.cinza,
    marginTop: 6,
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  menuContainer: {
    gap: 14, 
  },
  menuBotao: {
    flexDirection: 'row',    
    alignItems: 'center',
    backgroundColor: C.bgCard,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: C.cinzaEscuro,
    gap: 14,
  },
  menuIcone: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconeEmoji: {
    fontSize: 24,
  },
  menuTextoContainer: {
    flex: 1, 
  },
  menuBotaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: C.branco,
    marginBottom: 3,
  },
  menuBotaoSub: {
    fontSize: 12,
    color: C.cinza,
  },
  menuSeta: {
    fontSize: 24,
    color: C.cinza,
    fontWeight: '300',
  },

  telaConteudo: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  voltarBotao: {
    marginBottom: 20,
    alignSelf: 'flex-start', 
  },
  voltarTexto: {
    fontSize: 16,
    color: C.lilas,
    fontWeight: '600',
  },
  telaTitulo: {
    fontSize: 30,
    fontWeight: '900',
    color: C.branco,
    letterSpacing: -0.8,
    marginBottom: 6,
  },
  telaSubtitulo: {
    fontSize: 14,
    color: C.cinza,
    marginBottom: 28,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',    
    gap: 12,
    marginBottom: 24,
  },
  botaoHumorWrapper: {
    width: '47%', 
  },
  botaoHumor: {
    backgroundColor: C.bgCard,
    borderRadius: 20,
    borderWidth: 1.5,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
   
    shadowColor: C.roxo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6, 
  },
  botaoEmoji: {
    fontSize: 38,
    marginBottom: 8,
  },
  botaoLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: C.brancoSuave,
    letterSpacing: 0.3,
  },
  indicador: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 10,
  },

  card: {
    backgroundColor: C.bgCard,
    borderRadius: 24,
    overflow: 'hidden',  
    borderWidth: 1,
    borderColor: C.cinzaEscuro,
    shadowColor: C.roxo,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 10,
  },
  cardHeaderEmoji: {
    fontSize: 26,
  },
  cardHeaderTexto: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  cardSecao: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: C.cinza,
    letterSpacing: 1.5,  
    marginBottom: 10,
  },
  linkBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: C.roxoEscuro + '88', 
    gap: 10,
  },
  linkTexto: {
    fontSize: 14,
    fontWeight: '700',
    flex: 1,        
    lineHeight: 20,
  },
  playBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filmeTag: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  filmeTexto: {
    fontSize: 14,
    fontWeight: '700',
  },
  cardMensagem: {
    fontSize: 13,
    fontStyle: 'italic',
    color: C.cinza,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
    lineHeight: 20,
  },
  novaSugestaoBtn: {
    margin: 16,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  novaSugestaoTexto: {
    color: C.branco,
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.4,
  },


  abas: {
    flexDirection: 'row',
    backgroundColor: C.bgCard,
    borderRadius: 16,
    padding: 4,       
    marginBottom: 24,
    borderWidth: 1,
    borderColor: C.cinzaEscuro,
  },
  aba: {
    flex: 1,          
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 13,
  },
  abaAtiva: {
    backgroundColor: C.roxo, a
  },
  abaTexto: {
    fontSize: 15,
    fontWeight: '700',
    color: C.cinza,
  },
  abaTextoAtivo: {
    color: C.branco, 
  },

  formulario: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: C.lilasClaro,
    marginBottom: 6,
    marginTop: 14,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: C.bgCard,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.cinzaEscuro,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: C.branco,
  },
  humorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  humorChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bgCard,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: C.cinzaEscuro,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
  },
  humorChipEmoji: {
    fontSize: 18,
  },
  humorChipLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: C.brancoSuave,
  },
  enviarBtn: {
    backgroundColor: C.roxo,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: C.roxo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  enviarTexto: {
    color: C.branco,
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 0.4,
  },
  sucessoCard: {
    backgroundColor: '#4CAF5022', 
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4CAF5044',
    marginTop: 16,
  },
  sucessoTexto: {
    color: '#81C784', 
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});