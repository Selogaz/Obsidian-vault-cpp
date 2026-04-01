module.exports = async function source() {
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const shortTypes = {
    article: ['📄', 'source/article/paper'],
    book: ['📖', 'source/book'],
    course: ['🎓', 'source/course'],
    movie: ['🎬', 'source/cinematic/movie'],
    podcast: ['📻', 'source/podcast'],
    video: ['📺', 'source/video/recording'],
    '...show all': ['➕', 'show all'],
  };

  const fullTypes = {
    paper: ['📄', 'source/article/paper'],
    resource: ['🌐', 'source/article/resource'],
    book: ['📖', 'source/book'],
    course: ['🎓', 'source/course'],
    movie: ['🎬', 'source/cinematic/movie'],
    series: ['🍿', 'source/cinematic/series'],
    anime: ['🌸', 'source/cinematic/anime'],
    podcast: ['📻', 'source/podcast'],
    recording: ['📹', 'source/video/recording'],
    playlist: ['📼', 'source/video/playlist'],
    album: ['💽', 'source/music/album'],
    tracklist: ['🎧', 'source/music/tracklist'],
    game: ['🎮', 'source/game'],
  };

  const shortChoice = await tp.system.suggester(
    Object.keys(shortTypes).map((key) => shortTypes[key][0] + ' ' + key),
    Object.keys(shortTypes),
    false,
    'Source type:'
  );

  if (shortChoice === null || shortChoice === '') {
    return 'source/article/paper';
  }

  if (shortChoice === '...show all') {
    const fullChoice = await tp.system.suggester(
      Object.keys(fullTypes).map((key) => fullTypes[key][0] + ' ' + key),
      Object.values(fullTypes).map((value) => value[1]),
      false,
      'Source type (full list):'
    );

    if (fullChoice === null || fullChoice === '') {
      return 'source/article/paper';
    }

    return fullChoice;
  }

  return shortTypes[shortChoice][1];
};
