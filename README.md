# 🎵 MoodPlay

Aplicativo desenvolvido em **React Native com Expo** que recomenda músicas e filmes com base no humor do usuário.

---

## 📱 Sobre o aplicativo

O MoodPlay é um app simples e interativo onde o usuário escolhe como está se sentindo e recebe sugestões personalizadas de músicas (com link direto para o YouTube) e filmes. O app também permite que o próprio usuário sugira músicas para serem adicionadas.

---

## ⚙️ Funcionalidades

### 1. Recomendação por humor
O usuário seleciona um dos quatro humores disponíveis:
- 😄 **Feliz** — músicas animadas e comédias
- 😢 **Triste** — músicas calmas e dramas acolhedores
- 🔥 **Animado** — batidas pesadas e filmes de ação
- 🌙 **Calmo** — músicas instrumentais e filmes tranquilos

O app sorteia uma música e um filme aleatoriamente para o humor escolhido. O botão **"Outra sugestão"** gera uma nova recomendação sem repetir a música anterior.

---

O índice da última música sorteada é guardado por humor no estado `ultimosIndices`, garantindo que ao trocar de humor e voltar, a lógica ainda funcione corretamente.

---

## 🗂️ Estrutura do código

```
App.js
│
├── Paleta de cores (objeto C)
├── Dados de recomendações (objeto recomendacoes)
├── sortearSemRepetir()       → algoritmo de sorteio
│
├── TelaInicio                → menu principal com navegação
├── BotaoHumor                → botão animado de cada humor
├── TelaHumor                 → seleção de humor + card de resultado
├── TelaSugestao              → formulário de sugestão de música
│
└── App (principal)           → controla qual tela está visível
```



