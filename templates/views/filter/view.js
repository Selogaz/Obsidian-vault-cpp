const { type } = input;
const prefix = type;

// Configuration objects with [tag, display_label] format
const TYPE_CONFIGS = {
  sources: {
    paper: ['source/article/paper', '📃 paper'],
    resource: ['source/article/resource', '🌐 resource'],
    book: ['source/book', '📚 book'],
    course: ['source/course', '🎓 course'],
    movie: ['source/cinematic/movie', '🎬 movie'],
    series: ['source/cinematic/series', '🍿 series'],
    anime: ['source/cinematic/anime', '🌸 anime'],
    podcast: ['source/podcast', '📻 podcast'],
    video: ['source/video/recording', '📹 recording'],
    playlist: ['source/video/playlist', '📼 playlist'],
    album: ['source/music/album', '💽 album'],
    tracklist: ['source/music/tracklist', '🎧 tracklist'],
    game: ['source/game', '🎮 game'],
  },
  fun: {
    movie: ['source/cinematic/movie', '🎬 movie'],
    series: ['source/cinematic/series', '🍿 series'],
    anime: ['source/cinematic/anime', '🌸 anime'],
    album: ['source/music/album', '💽 album'],
    tracklist: ['source/music/tracklist', '🎧 tracklist'],
    game: ['source/game', '🎮 game'],
  },
  projects: {
    short: ['project/short', '🗞️ short'],
    single: ['project/single', '✏️ single'],
    longform: ['project/longform', '🖊️ longform'],
  },
  contacts: {
    working: ['contact/working', '👤 working'],
    client: ['contact/client', '🤝 client'],
    personal: ['contact/personal', '🧑‍🤝‍🧑 personal'],
    routine: ['contact/routine', '🧟 routine'],
  },
  creators: {
    writer: ['creator/writer', '👩🏻‍💻 writer'],
    director: ['creator/director', '🧑‍✈️ director'],
    researcher: ['creator/researcher', '🧑‍🔬 researcher'],
    contentmaker: ['creator/contentmaker', '🦸 contentmaker'],
    businessman: ['creator/businessman', '🫅 businessman'],
    expert: ['creator/expert', '😎 expert'],
    musician: ['creator/musician', '🧑‍🎤 musician'],
    composer: ['creator/composer', '🎼 composer'],
    actor: ['creator/actor', '🤵 actor'],
    painter: ['creator/painter', '🧑‍🎨 painter'],
    photographer: ['creator/photographer', '📷 photographer'],
    cinematographer: ['creator/cinematographer', '🎥 cinematographer'],
  },
  productions: {
    channel: ['production/channel', '🔔 channel'],
    podcast: ['production/podcast', '🔔 podcast'],
    film_studio: ['production/film_studio', '🎛️ film studio'],
    art_studio: ['production/art_studio', '🎛️ art studio'],
    game_studio: ['production/game_studio', '🎛️ game studio'],
    label: ['production/label', '🎛️ label'],
    band: ['production/band', '🎸 band'],
    organization: ['production/organization', '🏢 organization'],
    company: ['production/company', '💼 company'],
    platform: ['production/platform', '🏨 platform'],
    publisher: ['production/publisher', '🖨 publisher'],
    journal: ['production/journal', '📰 journal'],
  },
};

const STATUS_CONFIGS = {
  source_status: {
    todo: ['🟥', '🟥 todo'],
    wip: ['🟦', '🟦 wip'],
    atom: ['⚛', '⚛ atom'],
    done: ['🟩', '🟩 done'],
    drop: ['⬛', '⬛ drop'],
  },
  project_status: {
    todo: ['🟥', '🟥 todo'],
    wip: ['🟦', '🟦 wip'],
    done: ['🟩', '🟩 done'],
    published: ['📢', '📢 published'],
    hold: ['❄', '❄ hold'],
    drop: ['⬛', '⬛ drop'],
  },
};

const MISC_CONFIGS = {
  relevance: {
    relevant: [true, '📌 relevant'],
    irrelevant: [false, 'irrelevant'],
  },
  priorities: {
    a: ['🇦', '🇦 Important and urgent'],
    b: ['🇧', '🇧 Important and non-urgent'],
    c: ['🇨', '🇨 Common'],
    d: ['🇩', '🇩 Delegate'],
    e: ['🇪', '🇪 Eliminate'],
  },
  ratings: {
    masterpiece: ['🌕', '🌕 Masterpiece'],
    great: ['🌔', '🌔 Great'],
    good: ['🌓', '🌓 Good'],
    mediocre: ['🌒', '🌒 Mediocre'],
    poor: ['🌑', '🌑 Poor'],
  },
  scientificity: {
    primary: ['🅰️', '🅰️ Primary Research'],
    secondary: ['🅱️', '🅱️ Secondary Research'],
    expert: ['👓', '👓 Expert - Industry'],
    popular: ['📢', '📢 Popular Science - Journalism'],
    unverified: ['💬', '💬 Unverified - Opinion'],
  },
};

// Key configurations for different prefixes
const PREFIX_KEYS = {
  source: [
    'sources',
    'source_status',
    'scientificity',
    'rating',
    'category',
    'meta',
    'problem',
    'creator',
    'production',
    'title',
  ],
  fun: ['fun', 'source_status', 'rating', 'creator', 'genre'],
  project: [
    'projects',
    'project_status',
    'priority',
    'category',
    'meta',
    'problem',
    'creator',
    'production',
    'title',
  ],
  contact: [
    'relevant',
    'contacts',
    'category',
    'meta',
    'problem',
    'production',
    'title',
  ],
  creator: [
    'relevant',
    'creators',
    'category',
    'meta',
    'problem',
    'production',
    'title',
  ],
  production: [
    'relevant',
    'productions',
    'category',
    'meta',
    'problem',
    'production',
    'title',
  ],
  hierarchy: ['relevant', 'category', 'meta', 'problem', 'title'],
  meta: ['relevant', 'category', 'title'],
  problem: ['relevant', 'category', 'meta', 'title'],
};

// Get pages query based on prefix
function getPagesQuery(prefix) {
  const {
    file: { path, name },
  } = dv.current();

  const sourceTag =
    prefix === 'fun'
      ? `(${Object.values(TYPE_CONFIGS.fun)
          .map(([path]) => `#${path}`)
          .join(' OR ')})`
      : `#${prefix}`;

  const categoryTag = path.startsWith('base/categories/')
    ? ` AND #category/${name.replace(/ /g, '_')}`
    : '';

  return ['hierarchy', 'meta', 'problem'].includes(prefix)
    ? `#system/high/${prefix}${categoryTag}`
    : `${sourceTag}${categoryTag}`;
}

// Single pages query - main performance optimization
const pages = dv.pages(getPagesQuery(prefix));

// Extract unique field values once and cache results
const fieldCache = new Map();

function getUniqueFieldValues(fieldName) {
  if (fieldCache.has(fieldName)) {
    return fieldCache.get(fieldName);
  }

  const values = pages
    .where((p) => p.file.frontmatter[fieldName])
    .array()
    .flatMap((p) => p.file.frontmatter[fieldName])
    .map((x) => String(x).replace(/\[\[([^\|\]]+)(?:\|[^\]]*)?\]\]/g, '$1'));

  const uniqueValues = [...new Set(values)];
  fieldCache.set(fieldName, uniqueValues);
  return uniqueValues;
}

// Generate options from structure
function generateOptionsFromStructure(config) {
  return Object.values(config)
    .map(([value, label]) => `option('${value}', '${label}')`)
    .join(', ');
}

// Generate options from dataview field
function generateOptionsFromDataview(fieldName, defaultIcon) {
  return getUniqueFieldValues(fieldName)
    .map((value) => {
      const escapedValue = value.replace(/'/g, "\\'");
      return `option('${escapedValue}', '${defaultIcon} ${escapedValue}')`;
    })
    .join(', ');
}

// Filter definitions with lazy evaluation
const FILTER_DEFINITIONS = {
  // Type filters
  sources: () => [
    '🗄️',
    `${prefix}_type`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      TYPE_CONFIGS.sources
    )}):${prefix}_type]\``,
  ],
  fun: () => [
    '🗄️',
    `${prefix}_type`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      TYPE_CONFIGS.fun
    )}):${prefix}_type]\``,
  ],
  projects: () => [
    '🗄️',
    `${prefix}_type`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      TYPE_CONFIGS.projects
    )}):${prefix}_type]\``,
  ],
  contacts: () => [
    '🗄️',
    `${prefix}_type`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      TYPE_CONFIGS.contacts
    )}):${prefix}_type]\``,
  ],
  creators: () => [
    '🗄️',
    `${prefix}_type`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      TYPE_CONFIGS.creators
    )}):${prefix}_type]\``,
  ],
  productions: () => [
    '🗄️',
    `${prefix}_type`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      TYPE_CONFIGS.productions
    )}):${prefix}_type]\``,
  ],

  // Status filters
  source_status: () => [
    '💯',
    `${prefix}_status`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      STATUS_CONFIGS.source_status
    )}):${prefix}_status]\``,
  ],
  project_status: () => [
    '💯',
    `${prefix}_status`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      STATUS_CONFIGS.project_status
    )}):${prefix}_status]\``,
  ],

  // Priority and relevance
  priority: () => [
    '🔺',
    `${prefix}_priority`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      MISC_CONFIGS.priorities
    )}):${prefix}_priority]\``,
  ],
  relevant: () => [
    '📌',
    `${prefix}_relevant`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      MISC_CONFIGS.relevance
    )}):${prefix}_relevant]\``,
  ],

  // Scientific and rating
  scientificity: () => [
    '🅰️',
    `${prefix}_scientificity`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      MISC_CONFIGS.scientificity
    )}):${prefix}_scientificity]\``,
  ],
  rating: () => [
    '🌕️',
    `${prefix}_rating`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromStructure(
      MISC_CONFIGS.ratings
    )}):${prefix}_rating]\``,
  ],

  // Dynamic fields from pages
  category: () => [
    '🗺️',
    `${prefix}_category`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromDataview(
      'category',
      '🗺️'
    )}):${prefix}_category]\``,
  ],
  meta: () => [
    '🔎',
    `${prefix}_meta`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromDataview(
      'meta',
      '🔎'
    )}):${prefix}_meta]\``,
  ],
  problem: () => [
    '⚡️',
    `${prefix}_problem`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromDataview(
      'problem',
      '⚡️'
    )}):${prefix}_problem]\``,
  ],
  genre: () => [
    '🎭',
    `${prefix}_genre`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromDataview(
      'genre',
      '🎭'
    )}):${prefix}_genre]\``,
  ],
  creator: () => [
    '👨',
    `${prefix}_creator`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromDataview(
      'creator',
      '👨'
    )}):${prefix}_creator]\``,
  ],
  production: () => [
    '🏬',
    `${prefix}_production`,
    `\`INPUT[inlineListSuggester(${generateOptionsFromDataview(
      'production',
      '🏬'
    )}):${prefix}_production]\``,
  ],

  // Title search
  title: () => [
    '🔤',
    `${prefix}_title`,
    `\`INPUT[text(placeholder('Search')):${prefix}_title]\``,
  ],
};

// Get keys for current prefix and generate queries
const keys = PREFIX_KEYS[prefix] || [];
const queries = keys.map((key) => {
  const [icon, , input] = FILTER_DEFINITIONS[key]();
  return [icon, input];
});

// Render filter buttons
queries.forEach(([icon, input]) => {
  dv.el('span', `${icon} ${input}`, {
    attr: {
      style:
        'display:inline-block;border:1px solid #404040;border-radius:4px;padding:3px; margin:2px;',
    },
  });
});
