import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, Text, View, TouchableOpacity, 
  ScrollView, Alert, Linking, ActivityIndicator 
} from 'react-native';

// Importando seu serviço de API
import * as API from './services/api'; 

const C = {
  bg: '#0A0510',          // Fundo bem profundo (quase preto)
  card: '#160B25',        // Card um pouco mais claro
  cardAlt: '#1F1133',     // Variação para os itens da lista
  primary: '#8B5CF6',     // Roxo principal
  accent: '#C4B5FD',      // Lilás claro para detalhes
  text: '#FFFFFF',
  textMuted: '#94A3B8',
};

const HUMORES = {
  feliz: { emoji: '😄', label: 'Feliz', cor: '#FBBF24' },
  triste: { emoji: '😢', label: 'Triste', cor: '#60A5FA' },
  animado: { emoji: '🔥', label: 'Animado', cor: '#F87171' },
  calmo: { emoji: '🌙', label: 'Calmo', cor: '#34D399' },
  ansioso: { emoji: '😰', label: 'Ansioso', cor: '#A78BFA' },
  bravo: { emoji: '😡', label: 'Bravo', cor: '#EF4444' },
};

export default function App() {
  const [selecionado, setSelecionado] = useState(null);
  const [itens, setItens] = useState({ musicas: [], filmes: [] });
  const [loading, setLoading] = useState(false);

  async function carregarSugestoes(humor) {
    setLoading(true);
    setSelecionado(humor);
    try {
      const [m, f] = await Promise.all([
        API.buscarMusicasPorHumor(humor, 3),
        API.buscarFilmesPorHumor(humor, 3)
      ]);
      setItens({ musicas: m, filmes: f });
    } catch (e) {
      Alert.alert("Erro", "Falha ao buscar dados das APIs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={s.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={{paddingBottom: 40}} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.titulo}>MoodPlay</Text>
          <View style={s.badge}>
            <Text style={s.badgeTexto}>SUA VIBE</Text>
          </View>
        </View>

        <View style={s.grid}>
          {Object.entries(HUMORES).map(([key, d]) => {
            const isSelected = selecionado === key;
            return (
              <TouchableOpacity 
                key={key} 
                activeOpacity={0.7}
                style={[
                  s.cardHumor, 
                  { 
                    backgroundColor: isSelected ? d.cor + '15' : C.card,
                    borderColor: isSelected ? d.cor : 'transparent' 
                  }
                ]}
                onPress={() => carregarSugestoes(key)}
              >
                <Text style={s.emoji}>{d.emoji}</Text>
                <Text style={[s.label, { color: isSelected ? d.cor : C.text }]}>{d.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {loading ? (
          <ActivityIndicator color={C.primary} size="large" style={{marginTop: 40}} />
        ) : selecionado && (
          <View style={s.resultadoContainer}>
            
            <View style={s.secaoHeader}>
              <Text style={s.secaoTitulo}>Músicas</Text>
              <View style={[s.linha, {backgroundColor: HUMORES[selecionado].cor}]} />
            </View>

            {itens.musicas.map((m, i) => (
              <TouchableOpacity key={i} style={s.itemCard} onPress={() => Linking.openURL(m.url)}>
                <View style={s.playIcon}><Text style={{color: '#fff', fontSize: 10}}>▶</Text></View>
                <View>
                  <Text style={s.itemNome}>{m.musica}</Text>
                  <Text style={s.itemSub}>{m.artista}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <View style={[s.secaoHeader, {marginTop: 25}]}>
              <Text style={s.secaoTitulo}>Filmes</Text>
              <View style={[s.linha, {backgroundColor: HUMORES[selecionado].cor}]} />
            </View>

            {itens.filmes.map((f, i) => (
              <View key={i} style={s.filmeCard}>
                <Text style={s.filmeTitulo}>{f.titulo}</Text>
                <Text style={s.filmeSinopse} numberOfLines={2}>{f.sinopse}</Text>
              </View>
            ))}

            <TouchableOpacity 
              style={[s.btnRefazer, {borderColor: HUMORES[selecionado].cor}]} 
              onPress={() => carregarSugestoes(selecionado)}
            >
              <Text style={[s.btnRefazerTexto, {color: HUMORES[selecionado].cor}]}>🔄 Novas Sugestões</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg, paddingTop: 60, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  titulo: { fontSize: 32, fontWeight: 'bold', color: C.text, letterSpacing: -1 },
  badge: { backgroundColor: C.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeTexto: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  cardHumor: { 
    width: '30%', 
    paddingVertical: 20, 
    borderRadius: 24, 
    alignItems: 'center', 
    borderWidth: 1.5,
    // Efeito de sombra leve para Android
    elevation: 4,
  },
  emoji: { fontSize: 30, marginBottom: 8 },
  label: { fontSize: 12, fontWeight: '700' },

  resultadoContainer: { marginTop: 30 },
  secaoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  secaoTitulo: { color: C.text, fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  linha: { flex: 1, height: 2, borderRadius: 2, opacity: 0.5 },

  itemCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: C.cardAlt, 
    padding: 16, 
    borderRadius: 20, 
    marginBottom: 12 
  },
  playIcon: { 
    width: 32, 
    height: 32, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 15 
  },
  itemNome: { color: C.text, fontWeight: 'bold', fontSize: 15 },
  itemSub: { color: C.textMuted, fontSize: 13 },

  filmeCard: { backgroundColor: C.cardAlt, padding: 18, borderRadius: 20, marginBottom: 12 },
  filmeTitulo: { color: C.text, fontWeight: 'bold', fontSize: 16, marginBottom: 6 },
  filmeSinopse: { color: C.textMuted, fontSize: 12, lineHeight: 18 },

  btnRefazer: { 
    marginTop: 20, 
    padding: 18, 
    borderRadius: 20, 
    alignItems: 'center', 
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  btnRefazerTexto: { fontWeight: 'bold', fontSize: 14 }
});