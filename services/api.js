// services/mood.js
const LASTFM_KEY = process.env.EXPO_PUBLIC_LASTFM_KEY;
const TMDB_KEY   = process.env.EXPO_PUBLIC_TMDB_KEY;

const MOOD_MAP = {
  feliz:   { lastfmTags: ['happy', 'feel good'], tmdbGenres: [35, 10751] },
  triste:  { lastfmTags: ['sad', 'melancholic'], tmdbGenres: [18, 10749] },
  animado: { lastfmTags: ['energetic', 'workout'], tmdbGenres: [28, 12] },
  calmo:   { lastfmTags: ['chill', 'relaxing'], tmdbGenres: [14, 878] },
  ansioso: { lastfmTags: ['peaceful', 'calm'], tmdbGenres: [35, 16] },
  bravo:   { lastfmTags: ['heavy metal', 'angry'], tmdbGenres: [28, 53] },
};

export async function buscarMusicasPorHumor(humor, quantidade = 5) {
  const moodData = MOOD_MAP[humor] || MOOD_MAP.calmo;
  const tag = moodData.lastfmTags[Math.floor(Math.random() * moodData.lastfmTags.length)];
  const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${encodeURIComponent(tag)}&api_key=${LASTFM_KEY}&format=json&limit=20`;

  const response = await fetch(url);
  const data = await response.json();
  const tracks = data.tracks?.track || [];
  return tracks.sort(() => Math.random() - 0.5).slice(0, quantidade).map(t => ({
    musica: t.name,
    artista: t.artist.name,
    url: t.url
  }));
}

export async function buscarFilmesPorHumor(humor, quantidade = 5) {
  const moodData = MOOD_MAP[humor] || MOOD_MAP.calmo;
  const genero = moodData.tmdbGenres[Math.floor(Math.random() * moodData.tmdbGenres.length)];
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=${genero}&language=pt-BR&sort_by=popularity.desc&page=1`;

  const response = await fetch(url);
  const data = await response.json();
  const movies = data.results || [];
  return movies.sort(() => Math.random() - 0.5).slice(0, quantidade).map(f => ({
    titulo: f.title,
    sinopse: f.overview,
    nota: f.vote_average
  }));
}