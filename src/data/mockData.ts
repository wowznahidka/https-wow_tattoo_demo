import { Artist, GalleryItem, FlashDesign, BodyZone, Review, ServiceItem, FaqItem } from '../types';

export const RESIDENT_ARTISTS: Artist[] = [
  {
    id: 'art-1',
    name: 'Олексій "Obsidian" Демчук',
    alias: 'Obsidian Black',
    role: 'Засновник & Арт-директор',
    roleEn: 'Founder & Art Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1200&auto=format&fit=crop&q=80',
    experienceYears: 12,
    specialties: ['blackwork', 'ornamental', 'coverup'],
    specialtyTitles: [
      { uk: 'Dark Blackwork', en: 'Dark Blackwork' },
      { uk: 'Орнаментал & Сакральна геометрія', en: 'Ornamental & Sacred Geometry' },
      { uk: 'Складні перекриття (Cover-Up)', en: 'Complex Cover-Ups' }
    ],
    bio: {
      uk: '12 років досвіду. Призер міжнародних конвенцій у Берліні та Кракові. Працює виключно у масштабних проєктах: рукава, торси, спини. Створює анатомічно вивірені чорні масиви з винятковим контрастом.',
      en: '12 years of experience. Winner of international tattoo conventions in Berlin and Krakow. Specializes in large-scale projects: full sleeves, chest pieces, backplates. Creates anatomically fitted blackwork masterpieces.'
    },
    hourlyRate: 2400,
    sessionRate: 11000,
    instagram: '@obsidian.noir.tattoo',
    telegram: '@obsidian_tattoo',
    rating: 4.98,
    completedTattoos: 2400,
    availableDays: ['Вт', 'Ср', 'Пт', 'Сб'],
    featuredWorks: [
      '/tattoos/photo_1_19_07_2024_13_03_11.jpg',
      '/tattoos/photo_7_19_07_2024_13_22_47.jpg',
      '/tattoos/photo_13_19_07_2024_14_40_10.jpg',
      '/tattoos/photo_20_19_07_2024_17_24_13.jpg'
    ]
  },
  {
    id: 'art-2',
    name: 'Марія "Vesper" Коваль',
    alias: 'Vesper Lines',
    role: 'Топ-майстер мікрореалізму',
    roleEn: 'Lead Micro-Realism Artist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
    coverImage: '/tattoos/photo_2_19_07_2024_13_08_08.jpg',
    experienceYears: 7,
    specialties: ['fineline', 'microrealism', 'lettering'],
    specialtyTitles: [
      { uk: 'Fine Line & Мініатюри', en: 'Fine Line & Miniatures' },
      { uk: 'Ботаніка та флористика', en: 'Botanical & Florals' },
      { uk: 'Мікрореалізм та портрети улюбленців', en: 'Micro-Realism & Pet Portraits' }
    ],
    bio: {
      uk: 'Академічна художня освіта. Спеціалізується на тонких одинарних голках (1RL), невагомих контурах, делікатній ботаніці та мікро-картинах, що не розпливаються з роками.',
      en: 'Academic fine arts background. Specializes in single needle (1RL) work, delicate botanical illustrations, micro-portraits, and crisp typography that heals cleanly over time.'
    },
    hourlyRate: 1900,
    sessionRate: 8500,
    instagram: '@vesper.fineline',
    telegram: '@vesper_lines',
    rating: 4.96,
    completedTattoos: 1850,
    availableDays: ['Пн', 'Ср', 'Чт', 'Нд'],
    featuredWorks: [
      '/tattoos/photo_2_19_07_2024_13_08_08.jpg',
      '/tattoos/photo_8_19_07_2024_13_25_29.jpg',
      '/tattoos/photo_14_19_07_2024_15_58_13.jpg',
      '/tattoos/photo_21_19_07_2024_17_24_13.jpg'
    ]
  },
  {
    id: 'art-3',
    name: 'Ярослав "Kitsune" Мороз',
    alias: 'Kitsune Irezumi',
    role: 'Майстер японської традиції & Neo-Trad',
    roleEn: 'Japanese & Neo-Traditional Master',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
    coverImage: '/tattoos/photo_3_19_07_2024_13_08_38.jpg',
    experienceYears: 9,
    specialties: ['japanese', 'neotraditional'],
    specialtyTitles: [
      { uk: 'Японське татуювання (Irezumi & Wabori)', en: 'Japanese Irezumi & Wabori' },
      { uk: 'Neo-Traditional у глибоких тонах', en: 'Deep Tone Neo-Traditional' },
      { uk: 'Міфічні істоти та дракони', en: 'Mythical Beasts & Dragons' }
    ],
    bio: {
      uk: 'Навчався у токійських майстрів традиційного японського татуювання. Поєднує канонічні східні мотиви (коропи, дракони, маски Ханья) з сучасною нео-традиційною динамікою.',
      en: 'Studied under Japanese masters in Tokyo. Blends traditional eastern folklore (Koi fish, Ryu dragons, Hannya masks) with bold, vibrant modern neo-traditional aesthetics.'
    },
    hourlyRate: 2100,
    sessionRate: 9500,
    instagram: '@kitsune.irezumi',
    telegram: '@kitsune_tattoo',
    rating: 4.95,
    completedTattoos: 1600,
    availableDays: ['Ср', 'Чт', 'Пт', 'Сб'],
    featuredWorks: [
      '/tattoos/photo_3_19_07_2024_13_08_38.jpg',
      '/tattoos/photo_9_19_07_2024_14_40_10.jpg',
      '/tattoos/photo_15_19_07_2024_15_58_13.jpg',
      '/tattoos/photo_22_19_07_2024_17_24_13.jpg'
    ]
  },
  {
    id: 'art-4',
    name: 'Діана "Cybersigil" Шевченко',
    alias: 'Cyber Raven',
    role: 'Авангард, Cyber-Tribal & Abstract',
    roleEn: 'Cyber-Sigilism & Dark Abstract Artist',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
    coverImage: '/tattoos/photo_4_19_07_2024_13_09_40.jpg',
    experienceYears: 5,
    specialties: ['ornamental', 'blackwork'],
    specialtyTitles: [
      { uk: 'Cyber-Sigilism & Dark Y2K', en: 'Cyber-Sigilism & Dark Y2K' },
      { uk: 'Freehand каліграфія на тілі', en: 'Freehand Body Calligraphy' },
      { uk: 'Органічний біомех та кіберпанк', en: 'Organic Biomech & Cyberpunk' }
    ],
    bio: {
      uk: 'Майстер freehand-малювання: малює дизайн прямо на вашому тілі спеціальними маркерами, враховуючи рух м’язів та вигини скелета перед нанесенням голкою.',
      en: 'Master of freehand ink styling: creates custom flow forms directly onto client skin with surgical markers to follow muscle contours perfectly before tattooing.'
    },
    hourlyRate: 1800,
    sessionRate: 8000,
    instagram: '@cyber.raven.ink',
    telegram: '@cyber_raven',
    rating: 4.97,
    completedTattoos: 1100,
    availableDays: ['Вт', 'Чт', 'Сб', 'Нд'],
    featuredWorks: [
      '/tattoos/photo_4_19_07_2024_13_09_40.jpg',
      '/tattoos/photo_10_19_07_2024_14_40_10.jpg',
      '/tattoos/photo_16_19_07_2024_15_58_13.jpg',
      '/tattoos/photo_23_19_07_2024_17_24_13.jpg'
    ]
  },
  {
    id: 'art-5',
    name: 'Богдан "Vanguard" Руденко',
    alias: 'Vanguard Realism',
    role: 'Художній чорно-білий реалізм',
    roleEn: 'Black & Grey Realism Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
    coverImage: '/tattoos/photo_5_19_07_2024_13_10_04.jpg',
    experienceYears: 8,
    specialties: ['microrealism', 'coverup'],
    specialtyTitles: [
      { uk: 'Фотореалістичні портрети', en: 'Photorealistic Portraits' },
      { uk: 'Античні скульптури та міфологія', en: 'Antique Statues & Mythology' },
      { uk: 'Кінематографічний B&G реалізм', en: 'Cinematic Black & Grey Realism' }
    ],
    bio: {
      uk: 'Працює з найскладнішими фотографіями, відтворюючи світлотінь, текстуру мармуру та погляди очей з дивовижною глибиною.',
      en: 'Recreates photographic lighting, marble stone textures, and striking portrait expressions with lifelike depth and contrast.'
    },
    hourlyRate: 2300,
    sessionRate: 10500,
    instagram: '@vanguard.realism',
    telegram: '@vanguard_ink',
    rating: 4.99,
    completedTattoos: 1400,
    availableDays: ['Пн', 'Вт', 'Пт', 'Сб'],
    featuredWorks: [
      '/tattoos/photo_5_19_07_2024_13_10_04.jpg',
      '/tattoos/photo_11_19_07_2024_14_40_10.jpg',
      '/tattoos/photo_17_19_07_2024_15_58_13.jpg',
      '/tattoos/photo_24_19_07_2024_17_24_13.jpg'
    ]
  },
  {
    id: 'art-6',
    name: 'Аліна "Aura" Кравчук',
    alias: 'Aura Watercolor',
    role: 'Акварель, Колір & Графіка',
    roleEn: 'Watercolor & Vibrant Color Artist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
    coverImage: '/tattoos/photo_6_19_07_2024_13_10_46.jpg',
    experienceYears: 6,
    specialties: ['watercolor', 'neotraditional'],
    specialtyTitles: [
      { uk: 'Художня акварель та сплески фарби', en: 'Watercolor & Color Splatters' },
      { uk: 'Кольорова ілюстрація та аніме', en: 'Color Illustration & Anime Art' },
      { uk: 'Гармонійне змішування пігментів', en: 'Harmonious Pigment Blending' }
    ],
    bio: {
      uk: 'Використовує преміальні пігменти Fusion та World Famous Ink. Створює яскраві, стійкі кольорові роботи, що зберігають насиченість без тьмяніння.',
      en: 'Utilizes premium Fusion and World Famous Ink pigments. Specializes in radiant, long-lasting color gradients that retain brilliance through years of wear.'
    },
    hourlyRate: 2000,
    sessionRate: 9000,
    instagram: '@aura.watercolor.tattoo',
    telegram: '@aura_tattoo',
    rating: 4.94,
    completedTattoos: 1250,
    availableDays: ['Ср', 'Чт', 'Сб', 'Нд'],
    featuredWorks: [
      '/tattoos/photo_6_19_07_2024_13_10_46.jpg',
      '/tattoos/photo_12_19_07_2024_14_40_10.jpg',
      '/tattoos/photo_18_19_07_2024_15_58_13.jpg',
      '/tattoos/photo_19_19_07_2024_15_58_13.jpg'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: { uk: 'Орнаментальний Сакральний Рукав', en: 'Sacred Geometry Ornamental Sleeve' },
    style: 'blackwork',
    placement: 'Передпліччя & Кисть',
    placementEn: 'Forearm & Hand',
    artistId: 'art-1',
    artistName: 'Олексій "Obsidian"',
    imageUrl: '/tattoos/photo_1_19_07_2024_13_03_11.jpg',
    durationHours: 12,
    sessionsCount: 2,
    description: {
      uk: 'Глибокий матовий чорний колір з мікронними переходами ліній та ідеальною симетрією під рух м’язів кисті.',
      en: 'Deep matte black saturation with micron line gradients and anatomical symmetry fitted for hand articulation.'
    },
    tags: ['blackwork', 'ornamental', 'geometry', 'hand tattoo'],
    likes: 492
  },
  {
    id: 'gal-2',
    title: { uk: 'Мікро-Файнлайн "Ботанічна Гілка"', en: 'Micro Fine Line "Botanical Branch"' },
    style: 'fineline',
    placement: 'Ключиця',
    placementEn: 'Collarbone',
    artistId: 'art-2',
    artistName: 'Марія "Vesper"',
    imageUrl: '/tattoos/photo_2_19_07_2024_13_08_08.jpg',
    durationHours: 3.5,
    sessionsCount: 1,
    description: {
      uk: 'Ультратонка голка 1RL. Легкий делікатний дизайн, що плавно повторює вигин ключиці.',
      en: 'Single 1RL needle work. Delicate and weightless botanical branch following the natural collarbone curvature.'
    },
    tags: ['fineline', 'botanical', 'minimalism', 'collarbone'],
    likes: 624
  },
  {
    id: 'gal-3',
    title: { uk: 'Традиційний Японський Дракон Ryu', en: 'Traditional Japanese Ryu Dragon' },
    style: 'japanese',
    placement: 'Плече та біцепс',
    placementEn: 'Shoulder & Bicep',
    artistId: 'art-3',
    artistName: 'Ярослав "Kitsune"',
    imageUrl: '/tattoos/photo_3_19_07_2024_13_08_38.jpg',
    durationHours: 16,
    sessionsCount: 3,
    description: {
      uk: 'Класичний Wabori з потужними хвилями вітру та детальним промальовуванням луски дракона.',
      en: 'Classic Wabori featuring wind bars, water waves, and hyper-detailed dragon scales in deep carbon ink.'
    },
    tags: ['japanese', 'dragon', 'irezumi', 'wabori'],
    likes: 588
  },
  {
    id: 'gal-4',
    title: { uk: 'Freehand Кібер-Сигілізм', en: 'Cyber-Sigilism Freehand Movement' },
    style: 'ornamental',
    placement: 'Спина & Лопатка',
    placementEn: 'Upper Back & Blade',
    artistId: 'art-4',
    artistName: 'Діана "Cybersigil"',
    imageUrl: '/tattoos/photo_4_19_07_2024_13_09_40.jpg',
    durationHours: 5,
    sessionsCount: 1,
    description: {
      uk: 'Авторський freehand малюнок, створений безпосередньо маркером на тілі клієнта перед татуюванням.',
      en: 'Original freehand design composed live on the client’s skin using surgical markers for organic flow.'
    },
    tags: ['cybersigilism', 'freehand', 'abstract', 'back tattoo'],
    likes: 745
  },
  {
    id: 'gal-5',
    title: { uk: 'B&G Реалізм "Скульптурний Погляд"', en: 'B&G Realism "Sculpted Gaze"' },
    style: 'microrealism',
    placement: 'Передпліччя',
    placementEn: 'Inner Forearm',
    artistId: 'art-5',
    artistName: 'Богдан "Vanguard"',
    imageUrl: '/tattoos/photo_5_19_07_2024_13_10_04.jpg',
    durationHours: 7,
    sessionsCount: 1,
    description: {
      uk: 'М’які кінематографічні градієнти тіней, виразне світло та відтворення текстури мармуру.',
      en: 'Velvety photographic shadow transitions and crisp white highlights depicting classical marble sculpture.'
    },
    tags: ['realism', 'statue', 'portrait', 'black and grey'],
    likes: 611
  },
  {
    id: 'gal-6',
    title: { uk: 'Кольоровий Нео-Традишнл & Флора', en: 'Color Neo-Traditional & Flora' },
    style: 'watercolor',
    placement: 'Стегно',
    placementEn: 'Outer Thigh',
    artistId: 'art-6',
    artistName: 'Аліна "Aura"',
    imageUrl: '/tattoos/photo_6_19_07_2024_13_10_46.jpg',
    durationHours: 8,
    sessionsCount: 2,
    description: {
      uk: 'Яскраві пігменти World Famous Ink з гармонійним поєднанням теплих та холодних акцентів.',
      en: 'Vibrant World Famous Ink pigments with rich contrast and smooth saturation throughout.'
    },
    tags: ['watercolor', 'color', 'floral', 'neotraditional'],
    likes: 478
  },
  {
    id: 'gal-7',
    title: { uk: 'Dark Blackwork "Анатомічний Торс"', en: 'Dark Blackwork "Anatomical Torso"' },
    style: 'blackwork',
    placement: 'Груди & Ребра',
    placementEn: 'Chest & Ribs',
    artistId: 'art-1',
    artistName: 'Олексій "Obsidian"',
    imageUrl: '/tattoos/photo_7_19_07_2024_13_22_47.jpg',
    durationHours: 18,
    sessionsCount: 4,
    description: {
      uk: 'Монументальна композиція з абсолютним насиченням чорного та геометрією вигинів тіла.',
      en: 'Monumental full chest piece combining monolithic pitch-black blocks with fine rhythmic hatching.'
    },
    tags: ['blackwork', 'chest piece', 'large scale', 'dark art'],
    likes: 830
  },
  {
    id: 'gal-8',
    title: { uk: 'Мініатюра "Космічний Горизонт"', en: 'Miniature "Cosmic Horizon"' },
    style: 'fineline',
    placement: 'Зап’ястя',
    placementEn: 'Inner Wrist',
    artistId: 'art-2',
    artistName: 'Марія "Vesper"',
    imageUrl: '/tattoos/photo_8_19_07_2024_13_25_29.jpg',
    durationHours: 2.5,
    sessionsCount: 1,
    description: {
      uk: 'Мікро-лінії та точковий дотворк розміром 5х4 см з дивовижною чіткістю деталей.',
      en: 'Microscopic dotwork and needlework measuring 5x4 cm with crisp healing longevity.'
    },
    tags: ['fineline', 'wrist', 'micro', 'astronomy'],
    likes: 562
  },
  {
    id: 'gal-9',
    title: { uk: 'Маска Ханья & Полум’я', en: 'Hannya Mask & Demon Fire' },
    style: 'japanese',
    placement: 'Повний рукав',
    placementEn: 'Full Arm Sleeve',
    artistId: 'art-3',
    artistName: 'Ярослав "Kitsune"',
    imageUrl: '/tattoos/photo_9_19_07_2024_14_40_10.jpg',
    durationHours: 22,
    sessionsCount: 4,
    description: {
      uk: 'Глибокі традиційні кольори, драматичний вираз маски Ханья та градієнти японського диму.',
      en: 'Deep saturated hues, expressive Hannya demon visage, and swirling wind-smoke backgrounds.'
    },
    tags: ['japanese', 'hannya', 'sleeve', 'traditional'],
    likes: 694
  },
  {
    id: 'gal-10',
    title: { uk: 'Графічний Окуляр & Символи', en: 'Graphic Oculus & Runes' },
    style: 'ornamental',
    placement: 'Передпліччя',
    placementEn: 'Forearm',
    artistId: 'art-4',
    artistName: 'Діана "Cybersigil"',
    imageUrl: '/tattoos/photo_10_19_07_2024_14_40_10.jpg',
    durationHours: 4.5,
    sessionsCount: 1,
    description: {
      uk: 'Чіткі геометричні лінії та сакральні символи з ідеальним вирівнюванням осі.',
      en: 'Crisp geometric symmetry combined with occult runic sigils along the forearm meridian.'
    },
    tags: ['ornamental', 'occult', 'geometry', 'linework'],
    likes: 519
  },
  {
    id: 'gal-11',
    title: { uk: 'Сюрреалістичний Портрет B&G', en: 'Surrealist B&G Portrait' },
    style: 'microrealism',
    placement: 'Плече',
    placementEn: 'Shoulder',
    artistId: 'art-5',
    artistName: 'Богдан "Vanguard"',
    imageUrl: '/tattoos/photo_11_19_07_2024_14_40_10.jpg',
    durationHours: 9,
    sessionsCount: 2,
    description: {
      uk: 'Поєднання реалістичного обличчя з абстрактними розмиттями та графічними мазками пензля.',
      en: 'Blending hyper-realistic portraiture with abstract motion blurs and textured brush strokes.'
    },
    tags: ['realism', 'surrealism', 'portrait', 'black and grey'],
    likes: 760
  },
  {
    id: 'gal-12',
    title: { uk: 'Акварельний Фенікс & Іскри', en: 'Watercolor Phoenix & Embers' },
    style: 'watercolor',
    placement: 'Ребра & Бік',
    placementEn: 'Ribs & Flank',
    artistId: 'art-6',
    artistName: 'Аліна "Aura"',
    imageUrl: '/tattoos/photo_12_19_07_2024_14_40_10.jpg',
    durationHours: 7,
    sessionsCount: 2,
    description: {
      uk: 'Динамічні бризки вогняних пігментів: рубіновий, шафрановий та глибокий пурпур.',
      en: 'Dynamic splatters of fiery pigments: ruby crimson, radiant saffron, and twilight violet.'
    },
    tags: ['watercolor', 'phoenix', 'ribs', 'color'],
    likes: 641
  },
  {
    id: 'gal-13',
    title: { uk: 'Монолітний Браслет Blackwork', en: 'Monolithic Blackwork Cuff' },
    style: 'blackwork',
    placement: 'Зап’ястя & Кисть',
    placementEn: 'Wrist & Hand Cuff',
    artistId: 'art-1',
    artistName: 'Олексій "Obsidian"',
    imageUrl: '/tattoos/photo_13_19_07_2024_14_40_10.jpg',
    durationHours: 4,
    sessionsCount: 1,
    description: {
      uk: 'Ідеально рівний щільний браслет з переходом у тонкі фрактальні лінії на пальцях.',
      en: 'Seamless solid black cuff transitioning into intricate finger fractures and linework.'
    },
    tags: ['blackwork', 'cuff', 'hand', 'solid black'],
    likes: 488
  },
  {
    id: 'gal-14',
    title: { uk: 'Вишуканий Місячний Файнлайн', en: 'Delicate Lunar Phases Fine Line' },
    style: 'fineline',
    placement: 'Вздовж хребта',
    placementEn: 'Spine Column',
    artistId: 'art-2',
    artistName: 'Марія "Vesper"',
    imageUrl: '/tattoos/photo_14_19_07_2024_15_58_13.jpg',
    durationHours: 5,
    sessionsCount: 1,
    description: {
      uk: 'Фази місяця та делікатні зоряні констеляції по осі хребта. Бездоганне загоєння.',
      en: 'Celestial lunar phases and delicate stellar constellations aligned along the spine axis.'
    },
    tags: ['fineline', 'spine', 'moon', 'minimal'],
    likes: 920
  },
  {
    id: 'gal-15',
    title: { uk: 'Японський Короп Коі & Хвилі', en: 'Japanese Koi Fish & Wave Crests' },
    style: 'japanese',
    placement: 'Гомілка & Ікра',
    placementEn: 'Calf & Shin',
    artistId: 'art-3',
    artistName: 'Ярослав "Kitsune"',
    imageUrl: '/tattoos/photo_15_19_07_2024_15_58_13.jpg',
    durationHours: 11,
    sessionsCount: 2,
    description: {
      uk: 'Символ сили та наполегливості. Короп у бурхливому потоці води за всіма законами японського канону.',
      en: 'Symbol of perseverance and triumph: Koi ascending rushing torrents in traditional Irezumi flow.'
    },
    tags: ['japanese', 'koi', 'irezumi', 'leg tattoo'],
    likes: 543
  },
  {
    id: 'gal-16',
    title: { uk: 'Cyber-Tribal Рукав Freehand', en: 'Cyber-Tribal Freehand Arm Flow' },
    style: 'ornamental',
    placement: 'Плече & Рукав',
    placementEn: 'Arm & Shoulder Flow',
    artistId: 'art-4',
    artistName: 'Діана "Cybersigil"',
    imageUrl: '/tattoos/photo_16_19_07_2024_15_58_13.jpg',
    durationHours: 8,
    sessionsCount: 2,
    description: {
      uk: 'Гострі кібернетичні форми з органічним поєднанням біомеханіки 90-х та сучасного Y2K тренду.',
      en: 'Razor-sharp organic cyber spikes hugging deltoid and tricep contours with athletic flow.'
    },
    tags: ['cybersigilism', 'y2k', 'tribal', 'freehand'],
    likes: 672
  },
  {
    id: 'gal-17',
    title: { uk: 'Реалістичний Вовк & Північний Ліс', en: 'Realism Wolf & Boreal Forest' },
    style: 'microrealism',
    placement: 'Передпліччя',
    placementEn: 'Outer Forearm',
    artistId: 'art-5',
    artistName: 'Богдан "Vanguard"',
    imageUrl: '/tattoos/photo_17_19_07_2024_15_58_13.jpg',
    durationHours: 8.5,
    sessionsCount: 2,
    description: {
      uk: 'Ювелірне опрацювання кожної шерстинки та проникливий живий погляд звіра.',
      en: 'Photographic texture rendering every hair strand with intense expressive gaze.'
    },
    tags: ['realism', 'wolf', 'wildlife', 'forearm'],
    likes: 710
  },
  {
    id: 'gal-18',
    title: { uk: 'Складне Перекриття (Cover-Up)', en: 'Advanced Cover-Up Transformation' },
    style: 'coverup',
    placement: 'Плече',
    placementEn: 'Shoulder',
    artistId: 'art-1',
    artistName: 'Олексій "Obsidian"',
    imageUrl: '/tattoos/photo_18_19_07_2024_15_58_13.jpg',
    durationHours: 10,
    sessionsCount: 2,
    description: {
      uk: 'Повне безслідне перекриття старого невдалого татуювання без попереднього лазерного видалення.',
      en: 'Total concealment of heavy scarred old tattoo through engineered contrast management.'
    },
    tags: ['coverup', 'blackwork', 'transformation'],
    likes: 805
  },
  {
    id: 'gal-19',
    title: { uk: 'Графічний Космічний Астронавт', en: 'Graphic Cosmic Astronaut' },
    style: 'microrealism',
    placement: 'Біцепс',
    placementEn: 'Bicep',
    artistId: 'art-5',
    artistName: 'Богдан "Vanguard"',
    imageUrl: '/tattoos/photo_19_19_07_2024_15_58_13.jpg',
    durationHours: 6.5,
    sessionsCount: 1,
    description: {
      uk: 'Відображення зірок у склі скафандра з високою контрастністю та мінімалістичними рамками.',
      en: 'Visor star reflections, textural space fabric, and geometric framing accents.'
    },
    tags: ['realism', 'space', 'astronaut', 'b&g'],
    likes: 630
  },
  {
    id: 'gal-20',
    title: { uk: 'Геометричний Дотворк Мандала', en: 'Geometric Dotwork Mandala' },
    style: 'ornamental',
    placement: 'Лікоть & Передпліччя',
    placementEn: 'Elbow & Forearm',
    artistId: 'art-1',
    artistName: 'Олексій "Obsidian"',
    imageUrl: '/tattoos/photo_20_19_07_2024_17_24_13.jpg',
    durationHours: 7,
    sessionsCount: 1,
    description: {
      uk: 'Сакральна геометрія з центром у ліктьовому суглобі. Градієнти щільності точок (dotwork).',
      en: 'Sacred radial mandala centered precisely on the elbow with pointillism density shading.'
    },
    tags: ['ornamental', 'mandala', 'dotwork', 'geometry'],
    likes: 855
  },
  {
    id: 'gal-21',
    title: { uk: 'Тонкі Ботанічні Півонії', en: 'Fine Line Botanical Peonies' },
    style: 'fineline',
    placement: 'Стегно & Бік',
    placementEn: 'Hip & Side Ribs',
    artistId: 'art-2',
    artistName: 'Марія "Vesper"',
    imageUrl: '/tattoos/photo_21_19_07_2024_17_24_13.jpg',
    durationHours: 6,
    sessionsCount: 1,
    description: {
      uk: 'Шовкові пелюстки з ніжними штрихами тіней, що підкреслюють жіночні лінії тіла.',
      en: 'Silk-like petals with micro-whip shading accentuating natural hip silhouettes.'
    },
    tags: ['fineline', 'peonies', 'floral', 'hip tattoo'],
    likes: 910
  },
  {
    id: 'gal-22',
    title: { uk: 'Нео-Трад Змія & Кинджал', en: 'Neo-Traditional Serpent & Dagger' },
    style: 'japanese',
    placement: 'Передпліччя',
    placementEn: 'Inner Forearm',
    artistId: 'art-3',
    artistName: 'Ярослав "Kitsune"',
    imageUrl: '/tattoos/photo_22_19_07_2024_17_24_13.jpg',
    durationHours: 6.5,
    sessionsCount: 1,
    description: {
      uk: 'Соковиті контрастні контури, градієнти золота та смарагду з гострими акцентами.',
      en: 'Rich weighted linework with emerald and gold transitions on custom cutlery geometry.'
    },
    tags: ['neotraditional', 'serpent', 'dagger', 'color'],
    likes: 574
  },
  {
    id: 'gal-23',
    title: { uk: 'Абстрактна Кібер-Каліграфія', en: 'Abstract Cyber Calligraphy' },
    style: 'ornamental',
    placement: 'Шия & Трапеція',
    placementEn: 'Neck & Trapezius',
    artistId: 'art-4',
    artistName: 'Діана "Cybersigil"',
    imageUrl: '/tattoos/photo_23_19_07_2024_17_24_13.jpg',
    durationHours: 4,
    sessionsCount: 1,
    description: {
      uk: 'Сміливе анатомічне розміщення вздовж м’язів шиї з різкими динамічними переходами.',
      en: 'Bold anatomical placement framing the neck muscle architecture with razor transitions.'
    },
    tags: ['cybersigilism', 'neck tattoo', 'calligraphy'],
    likes: 780
  },
  {
    id: 'gal-24',
    title: { uk: 'B&G Реалізм "Око Часу"', en: 'B&G Realism "Eye of Chronos"' },
    style: 'microrealism',
    placement: 'Плече',
    placementEn: 'Upper Arm',
    artistId: 'art-5',
    artistName: 'Богдан "Vanguard"',
    imageUrl: '/tattoos/photo_24_19_07_2024_17_24_13.jpg',
    durationHours: 8,
    sessionsCount: 2,
    description: {
      uk: 'Гіпердеталізована райдужка ока з механізмами годинника та димними тінями.',
      en: 'Hyper-detailed iris rendering merged into mechanical escapements and velvety shadows.'
    },
    tags: ['realism', 'eye', 'clock', 'sleeve'],
    likes: 890
  }
];

export const FLASH_DESIGNS: FlashDesign[] = [
  {
    id: 'flash-1',
    title: { uk: 'Кинджал Потойбіччя & Змія', en: 'Nether Dagger & Viper' },
    style: 'blackwork',
    artistId: 'art-1',
    artistName: 'Олексій "Obsidian"',
    imageUrl: '/tattoos/photo_1_19_07_2024_13_03_11.jpg',
    priceUah: 4500,
    priceUsd: 110,
    recommendedSizeCm: '15-18 см',
    estimatedHours: 3.5,
    isReserved: false,
    tags: ['dagger', 'snake', 'blackwork', 'exclusive']
  },
  {
    id: 'flash-2',
    title: { uk: 'Місячна Півонія Fine Line', en: 'Lunar Peony Fine Line' },
    style: 'fineline',
    artistId: 'art-2',
    artistName: 'Марія "Vesper"',
    imageUrl: '/tattoos/photo_2_19_07_2024_13_08_08.jpg',
    priceUah: 3800,
    priceUsd: 95,
    recommendedSizeCm: '10-12 см',
    estimatedHours: 2.5,
    isReserved: false,
    tags: ['peony', 'floral', 'fineline', 'minimal']
  },
  {
    id: 'flash-3',
    title: { uk: 'Маска Ханья & Квіти Сакури', en: 'Hannya Mask & Cherry Blossoms' },
    style: 'japanese',
    artistId: 'art-3',
    artistName: 'Ярослав "Kitsune"',
    imageUrl: '/tattoos/photo_3_19_07_2024_13_08_38.jpg',
    priceUah: 6200,
    priceUsd: 150,
    recommendedSizeCm: '18-22 см',
    estimatedHours: 4.5,
    isReserved: true,
    tags: ['hannya', 'japanese', 'irezumi', 'color']
  },
  {
    id: 'flash-4',
    title: { uk: 'Кібернетичні Крила Sigil', en: 'Cybernetic Sigil Wings' },
    style: 'ornamental',
    artistId: 'art-4',
    artistName: 'Діана "Cybersigil"',
    imageUrl: '/tattoos/photo_4_19_07_2024_13_09_40.jpg',
    priceUah: 4900,
    priceUsd: 120,
    recommendedSizeCm: '20-25 см',
    estimatedHours: 3.5,
    isReserved: false,
    tags: ['cybersigilism', 'wings', 'lowerback', 'chest']
  },
  {
    id: 'flash-5',
    title: { uk: 'Скульптурне Око Всесвіту', en: 'Sculpted Cosmic Eye' },
    style: 'microrealism',
    artistId: 'art-5',
    artistName: 'Богдан "Vanguard"',
    imageUrl: '/tattoos/photo_5_19_07_2024_13_10_04.jpg',
    priceUah: 5500,
    priceUsd: 135,
    recommendedSizeCm: '12-14 см',
    estimatedHours: 3.5,
    isReserved: false,
    tags: ['eye', 'realism', 'geometry', 'statue']
  },
  {
    id: 'flash-6',
    title: { uk: 'Неонова Метелиця & Сплески', en: 'Neon Moth & Watercolor Drops' },
    style: 'watercolor',
    artistId: 'art-6',
    artistName: 'Аліна "Aura"',
    imageUrl: '/tattoos/photo_6_19_07_2024_13_10_46.jpg',
    priceUah: 4600,
    priceUsd: 115,
    recommendedSizeCm: '14-16 см',
    estimatedHours: 3.0,
    isReserved: false,
    tags: ['moth', 'watercolor', 'vibrant', 'color']
  }
];

export const BODY_ZONES: BodyZone[] = [
  {
    id: 'zone-forearm',
    name: { uk: 'Передпліччя (зовнішнє/внутрішнє)', en: 'Forearm (Outer/Inner)' },
    painLevel: 3,
    painDescription: {
      uk: 'Мінімальний рівень болю. Чудове місце для першого татуювання та деталізованих робіт.',
      en: 'Low pain level. Perfect canvas for first tattoos and intricate high-detail work.'
    },
    healingDifficulty: 'easy',
    popularStyles: ['Fine Line', 'Micro-Realism', 'Lettering', 'Geometry'],
    tips: {
      uk: 'Швидко загоюється під плівкою. Легко доглядати самостійно.',
      en: 'Heals rapidly with second-skin film. Very easy to clean and moisturize.'
    },
    coordinates: { x: 28, y: 52, view: 'front' }
  },
  {
    id: 'zone-bicep',
    name: { uk: 'Зовнішнє плече / Дельта', en: 'Outer Shoulder / Deltoid' },
    painLevel: 3,
    painDescription: {
      uk: 'Дуже комфортне місце. Відчувається як легка вібрація або дряпання.',
      en: 'Very comfortable zone. Feels like light vibration or mild scratching.'
    },
    healingDifficulty: 'easy',
    popularStyles: ['Neo-Traditional', 'Blackwork', 'Portraits', 'Japanese'],
    tips: {
      uk: 'Відмінно виглядає під час руху м’яза. Зручно носити одяг без тертя.',
      en: 'Flows dynamically with muscle movement. Minimal friction with daily clothing.'
    },
    coordinates: { x: 26, y: 35, view: 'front' }
  },
  {
    id: 'zone-inner-bicep',
    name: { uk: 'Внутрішній біцепс', en: 'Inner Bicep' },
    painLevel: 6,
    painDescription: {
      uk: 'Чутлива шкіра з великою кількістю нервових закінчень. Відчутне печіння ближче до пахви.',
      en: 'Sensitive skin with many nerve endings. Noticeable burning sensation near armpit.'
    },
    healingDifficulty: 'medium',
    popularStyles: ['Lettering', 'Minimalism', 'Floral', 'Blackwork'],
    tips: {
      uk: 'Уникайте тісних футболок перші 5 днів для запобігання тертю.',
      en: 'Avoid tight sleeves for the first 5 days to prevent sweat and friction.'
    },
    coordinates: { x: 34, y: 36, view: 'front' }
  },
  {
    id: 'zone-chest',
    name: { uk: 'Груди / Ключиці', en: 'Chest / Collarbone' },
    painLevel: 7,
    painDescription: {
      uk: 'Близькість до кісток створює відчутну вібрацію. Потребує моральної витримки.',
      en: 'Bone proximity creates intense vibration resonance. Requires mental focus.'
    },
    healingDifficulty: 'medium',
    popularStyles: ['Cyber-Sigilism', 'Lettering', 'Ornamental', 'Dark Blackwork'],
    tips: {
      uk: 'Рекомендуємо добре поїсти перед сеансом і виспатися.',
      en: 'Eat a hearty meal with carbs and get a full night of sleep before your session.'
    },
    coordinates: { x: 50, y: 30, view: 'front' }
  },
  {
    id: 'zone-ribs',
    name: { uk: 'Ребра та бік', en: 'Ribs & Flank' },
    painLevel: 9,
    painDescription: {
      uk: 'Одне з найболючіших місць. Тонка шкіра над ребрами та постійний рух під час дихання.',
      en: 'One of the most intense zones. Thin skin over bone and constant movement during breathing.'
    },
    healingDifficulty: 'hard',
    popularStyles: ['Fine Line Script', 'Botanical', 'Ornamental', 'Japanese'],
    tips: {
      uk: 'Майстер робить короткі паузи. Практикуйте рівне повільне діафрагмальне дихання.',
      en: 'Artist takes micro-breaks. Focus on steady, deep diaphragmatic breathing.'
    },
    coordinates: { x: 42, y: 46, view: 'front' }
  },
  {
    id: 'zone-spine',
    name: { uk: 'Хребет та задня шия', en: 'Spine & Nape' },
    painLevel: 8,
    painDescription: {
      uk: 'Інтенсивне відчуття вібрації вздовж усього хребтового стовпа.',
      en: 'Intense vibrational sensation radiating along the spinal column.'
    },
    healingDifficulty: 'medium',
    popularStyles: ['Spine Calligraphy', 'Sacred Geometry', 'Botanical Vines'],
    tips: {
      uk: 'Виглядає неймовірно естетично та підкреслює поставу.',
      en: 'Stunning visual impact that emphasizes natural body posture.'
    },
    coordinates: { x: 50, y: 35, view: 'back' }
  },
  {
    id: 'zone-thigh',
    name: { uk: 'Стегно (переднє/бокове)', en: 'Thigh (Front/Outer)' },
    painLevel: 4,
    painDescription: {
      uk: 'Помірний біль, чудове велике полотно для масштабних картин та кольору.',
      en: 'Moderate pain level. Large spacious canvas ideal for intricate color pieces.'
    },
    healingDifficulty: 'easy',
    popularStyles: ['Neo-Traditional', 'Watercolor', 'Realism', 'Irezumi'],
    tips: {
      uk: 'Одягайте вільний спортивний одяг або шорти у день сеансу.',
      en: 'Wear loose-fitting sweatpants or shorts on session day for comfort.'
    },
    coordinates: { x: 40, y: 68, view: 'front' }
  },
  {
    id: 'zone-ankle',
    name: { uk: 'Щиколотка & Стопа', en: 'Ankle & Foot' },
    painLevel: 8,
    painDescription: {
      uk: 'Чутливі зв’язки та мінімум підшкірного жиру. Гострий біль.',
      en: 'Dense tendon network and minimal fat cushion. Sharp, stinging sensations.'
    },
    healingDifficulty: 'hard',
    popularStyles: ['Fine Line Anklet', 'Ornamental Bands', 'Minimalist Icons'],
    tips: {
      uk: 'Перші дні після сеансу уникайте взуття, що натирає щиколотку.',
      en: 'Wear low-cut soft socks and avoid boots that press against the fresh tattoo.'
    },
    coordinates: { x: 42, y: 92, view: 'front' }
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-custom',
    title: { uk: 'Авторське татуювання', en: 'Custom Tattoo Art' },
    description: {
      uk: 'Індивідуальна розробка ескізу під анатомію вашого тіла з урахуванням усіх побажань.',
      en: 'Bespoke design drafted specifically for your body anatomy and artistic vision.'
    },
    priceFromUah: 2200,
    duration: { uk: 'від 2 годин', en: 'from 2 hours' },
    iconName: 'Sparkles',
    popular: true
  },
  {
    id: 'srv-flash',
    title: { uk: 'Ексклюзивні Flash-сети', en: 'Exclusive Flash Designs' },
    description: {
      uk: 'Готові унікальні авторські скетчі майстрів, які наносяться лише 1 раз в житті.',
      en: 'One-off flash concepts drawn by our resident masters, inked only once.'
    },
    priceFromUah: 1800,
    duration: { uk: '1.5 - 4 години', en: '1.5 - 4 hours' },
    iconName: 'Flame'
  },
  {
    id: 'srv-coverup',
    title: { uk: 'Cover-Up & Реставрація', en: 'Cover-Up & Rework' },
    description: {
      uk: 'Професійне перекриття старих тату або шрамів без необхідності повного лазерного видалення.',
      en: 'Expert coverage of outdated ink, faded tattoos, and surgical scars.'
    },
    priceFromUah: 2800,
    duration: { uk: 'від 3 годин', en: 'from 3 hours' },
    iconName: 'Layers',
    popular: true
  },
  {
    id: 'srv-consult',
    title: { uk: 'Безкоштовна примірка & Консультація', en: 'Free Consultation & Sketch Fit' },
    description: {
      uk: '30 хвилин з майстром: обговорення ідеї, вибір масштабу, огляд шкіри, точний розрахунок вартості.',
      en: '30-minute session with an artist: idea brainstorm, scale fitting, exact pricing calculation.'
    },
    priceFromUah: 0,
    duration: { uk: '30 хвилин', en: '30 minutes' },
    iconName: 'HelpCircle'
  },
  {
    id: 'srv-piercing',
    title: { uk: 'Професійний пірсинг', en: 'Medical Grade Piercing' },
    description: {
      uk: 'Усі види пірсингу з імплантаційним титаном ASTM F-136 та стерильним одноразовим інструментом.',
      en: 'All piercing placements using ASTM F-136 implant-grade titanium jewelry.'
    },
    priceFromUah: 900,
    duration: { uk: '20-40 хвилин', en: '20-40 minutes' },
    iconName: 'Zap'
  },
  {
    id: 'srv-touchup',
    title: { uk: 'Корекція та освіження', en: 'Touch-Up & Refresh' },
    description: {
      uk: 'Безкоштовна корекція протягом 2 місяців після нанесення в нашій студії.',
      en: 'Complimentary touch-up within 2 months of your original session in our studio.'
    },
    priceFromUah: 0,
    duration: { uk: '1 година', en: '1 hour' },
    iconName: 'RefreshCw'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Максим Терещенко',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '14 Лютого 2026',
    artistName: 'Олексій "Obsidian"',
    tattooTitle: { uk: 'Блекворк рукав з геометрією', en: 'Full Blackwork Sleeve' },
    comment: {
      uk: 'Робив повний рукав у Олексія. Рівень деталізації та насиченості чорного просто космічний! У студії неймовірна атмосфера, грає якісний ембієнт, пропонують каву та снеки. Загоїлося ідеально за 10 днів під плівкою Suprasorb.',
      en: 'Did a full sleeve with Alex Obsidian. Black saturation is unbelievable! Amazing studio vibe, great soundtrack, specialty coffee and snacks. Healed seamlessly in 10 days with Suprasorb.'
    },
    photoUrl: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=600&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Юлія Соловей',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '28 Січня 2026',
    artistName: 'Марія "Vesper"',
    tattooTitle: { uk: 'Ботанічний мікрореалізм', en: 'Botanical Micro-Realism' },
    comment: {
      uk: 'Це моє перше татуювання, і я дуже хвилювалася через біль. Марія створила настільки ніжну і спокійну атмосферу, що я майже заснула під час сеансу! Лінії тонші за волосину. Дякую за втілення мрії!',
      en: 'My very first tattoo and I was terrified of pain. Maria made me feel so comfortable I almost fell asleep during the session! The lines are sharper and thinner than a thread. Pure magic.'
    },
    photoUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Андрій Ковальчук',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    date: '5 Січня 2026',
    artistName: 'Ярослав "Kitsune"',
    tattooTitle: { uk: 'Японська маска Ханья', en: 'Japanese Hannya Mask' },
    comment: {
      uk: 'Ярослав — справжній сенсей японської традиції! Пояснив усю символіку кожного елемента, підібрав відтінки червоного та золотого. Однозначно повернуся за спиною!',
      en: 'Yaroslav is a true master of Japanese Irezumi! Explained every symbolic meaning behind elements and color choices. Definitely coming back for a full backpiece!'
    },
    verified: true
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: {
      uk: 'Наскільки це боляче і чи можна використовувати знеболювальне?',
      en: 'How painful is it and can anesthetic creams be used?'
    },
    answer: {
      uk: 'Рівень болю залежить від зони (найлегше — передпліччя та стегна, найчутливіше — ребра та хребет). Ми не рекомендуємо сильні анестетики на початку сеансу, оскільки вони змінюють структуру шкіри та погіршують якість загоєння, проте для тривалих сеансів майстер може застосувати м’який спрей вторинної анестезії.',
      en: 'Pain level depends heavily on placement (forearms/thighs are mild, while ribs/spine are intense). We advise against heavy primary numbing creams because they alter skin texture and healing, but our artists can apply soothing secondary spray during long sessions.'
    },
    category: 'pain'
  },
  {
    id: 'faq-2',
    question: {
      uk: 'Як правильно підготуватися до сеансу татуювання?',
      en: 'How should I prepare before my tattoo session?'
    },
    answer: {
      uk: '1. Добре виспіться. 2. Щільно поїжте за 1-2 години до сеансу. 3. За 24 години категорично заборонено вживати алкоголь, аспірин та енергетики (вони розріджують кров і вимивають пігмент). 4. Одягніть комфортний вільний одяг темного кольору.',
      en: '1. Get a solid night of rest. 2. Eat a hearty meal 1-2 hours prior. 3. Strictly avoid alcohol, aspirin, and energy drinks for 24h beforehand (they thin blood and push ink out). 4. Wear comfortable loose-fitting dark clothes.'
    },
    category: 'process'
  },
  {
    id: 'faq-3',
    question: {
      uk: 'Які гарантії стерильності та безпеки у вашій студії?',
      en: 'What are your studio safety and sterilization standards?'
    },
    answer: {
      uk: 'Ми дотримуємося європейських стандартів стерильності медичного класу: 100% одноразові картриджі Kwadron та Cheyenne (розпаковуються виключно при вас), автоклавування інструментів класу B, бар’єрний захист на все обладнання та сертифіковані гіпоалергенні веганські пігменти Dynamic та World Famous Ink.',
      en: 'We adhere to medical-grade EU hygiene standards: 100% disposable Kwadron & Cheyenne cartridges unpacked in front of you, Class-B autoclave sterilization, complete barrier protection on all equipment, and certified vegan non-toxic Dynamic & World Famous inks.'
    },
    category: 'process'
  },
  {
    id: 'faq-4',
    question: {
      uk: 'Скільки часу триває загоєння і як доглядати?',
      en: 'How long does healing take and what is the aftercare routine?'
    },
    answer: {
      uk: 'Первинне загоєння під спеціальною захисною дихаючою плівкою Suprasorb F триває 5-6 днів. Повне відновлення епідермісу займає близько 3-4 тижнів. Ми видаємо кожному клієнту фірмовий набір для догляду з загоювальною маззю та детальну інструкцію.',
      en: 'Initial healing under our medical-grade breathable Suprasorb F film takes 5-6 days. Complete deep skin regeneration takes roughly 3-4 weeks. Every client receives a complimentary aftercare care-kit with healing ointment and step-by-step instructions.'
    },
    category: 'care'
  },
  {
    id: 'faq-5',
    question: {
      uk: 'Чи можу я принести свій малюнок чи референс з Pinterest?',
      en: 'Can I bring my own sketch or Pinterest references?'
    },
    answer: {
      uk: 'Так! Ви можете завантажити будь-які референси у формі бронювання або в нашому AI-генераторі ідей. Наш майстер адаптує концепт, переробить його в унікальний авторський дизайн, який ідеально ляже на вигини вашого тіла і не буде повторенням чужої копії.',
      en: 'Yes! You can upload any reference photos in our booking form or explore concepts with our AI idea studio. Our master artist will tailor the concept into an exclusive custom layout designed for your specific muscle contours.'
    },
    category: 'booking'
  }
];

export const AFTERCARE_TIMELINE = [
  {
    stage: { uk: 'День 1-5 (Захисна плівка)', en: 'Days 1-5 (Second-Skin Film)' },
    title: { uk: 'Гідроколоїдна дихаюча мембрана', en: 'Breathable Hydrocolloid Film' },
    desc: {
      uk: 'Майстер наклеює захисну плівку Suprasorb F. Вона захищає від бактерій, бруду та тертя. З нею можна приймати короткий теплий душ (не ванну!). Не зривайте плівку завчасно.',
      en: 'Your artist applies breathable Suprasorb F film. It shields from bacteria, dirt, and friction. You can take brief warm showers (no soaking/baths). Do not peel prematurely.'
    },
    icon: 'ShieldCheck'
  },
  {
    stage: { uk: 'День 6 (Зняття плівки)', en: 'Day 6 (Peeling & Cleansing)' },
    title: { uk: 'Зняття плівки та перше миття', en: 'Film Removal & First Wash' },
    desc: {
      uk: 'Акуратно зніміть плівку під струменем теплої води, підтягуючи за край. Промийте тату рідким антибактеріальним милом без мочалки. Промокніть одноразовим паперовим рушником.',
      en: 'Gently remove film under running warm water by pulling horizontally. Wash with mild antibacterial foam soap using bare hands. Pat dry with clean paper towels.'
    },
    icon: 'Droplets'
  },
  {
    stage: { uk: 'День 7-14 (Зволоження)', en: 'Days 7-14 (Moisturization)' },
    title: { uk: 'Нанесення крему з пантенолом', en: 'Panthenol Ointment Care' },
    desc: {
      uk: 'Наносьте тонкий шар спеціального крему для тату (Doctor Pro або Бепантен Плюс) 3-4 рази на день. Шкіра може злегка лущитися — категорично не здирайте лусочки та не чухайте!',
      en: 'Apply a sheer layer of dedicated tattoo aftercare cream 3-4 times daily. Natural peeling may occur — never scratch or pick at flaking skin.'
    },
    icon: 'Sparkles'
  },
  {
    stage: { uk: 'День 15-30 (Фінішне відновлення)', en: 'Days 15-30 (Final Settling)' },
    title: { uk: 'SPF захист та яскравість', en: 'SPF Protection & Radiance' },
    desc: {
      uk: 'Татуювання стає повністю матовим та інтегрується в шкіру. На сонці завжди використовуйте сонцезахисний крем SPF 50+ для збереження контрасту та чіткості ліній на десятиліття.',
      en: 'Tattoo settles fully into the dermis with a smooth matte texture. Always apply SPF 50+ sunscreen outdoors to preserve crisp dark contrast for decades.'
    },
    icon: 'Sun'
  }
];
