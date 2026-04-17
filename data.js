// Dekiru / AP Japanese vocabulary and kanji data

const VOCABULARY = [
  // Chapter 1 - Introductions & Daily Life
  { id: "v001", word: "挨拶", reading: "あいさつ", romaji: "aisatsu", meaning: "greeting", example: "毎朝、挨拶をします。", exampleEn: "I greet people every morning.", chapter: 1, tags: ["daily", "social"] },
  { id: "v002", word: "自己紹介", reading: "じこしょうかい", romaji: "jikoshoukai", meaning: "self-introduction", example: "自己紹介をお願いします。", exampleEn: "Please introduce yourself.", chapter: 1, tags: ["social"] },
  { id: "v003", word: "趣味", reading: "しゅみ", romaji: "shumi", meaning: "hobby; interest", example: "私の趣味は音楽です。", exampleEn: "My hobby is music.", chapter: 1, tags: ["daily"] },
  { id: "v004", word: "出身", reading: "しゅっしん", romaji: "shusshin", meaning: "hometown; origin", example: "出身はどこですか。", exampleEn: "Where are you from?", chapter: 1, tags: ["social"] },
  { id: "v005", word: "専門", reading: "せんもん", romaji: "senmon", meaning: "specialty; major", example: "専門は何ですか。", exampleEn: "What is your specialty?", chapter: 1, tags: ["school"] },

  // Chapter 2 - Family & Relationships
  { id: "v006", word: "家族", reading: "かぞく", romaji: "kazoku", meaning: "family", example: "家族と一緒に住んでいます。", exampleEn: "I live with my family.", chapter: 2, tags: ["family"] },
  { id: "v007", word: "両親", reading: "りょうしん", romaji: "ryoushin", meaning: "parents", example: "両親はとても優しいです。", exampleEn: "My parents are very kind.", chapter: 2, tags: ["family"] },
  { id: "v008", word: "兄弟", reading: "きょうだい", romaji: "kyoudai", meaning: "siblings", example: "兄弟はいますか。", exampleEn: "Do you have siblings?", chapter: 2, tags: ["family"] },
  { id: "v009", word: "祖父母", reading: "そふぼ", romaji: "sofubo", meaning: "grandparents", example: "祖父母と話すのが好きです。", exampleEn: "I like talking with my grandparents.", chapter: 2, tags: ["family"] },
  { id: "v010", word: "友達", reading: "ともだち", romaji: "tomodachi", meaning: "friend", example: "友達と映画を見に行きます。", exampleEn: "I'm going to see a movie with a friend.", chapter: 2, tags: ["social"] },
  { id: "v011", word: "関係", reading: "かんけい", romaji: "kankei", meaning: "relationship; connection", example: "人間関係は大切です。", exampleEn: "Human relationships are important.", chapter: 2, tags: ["social"] },
  { id: "v012", word: "結婚", reading: "けっこん", romaji: "kekkon", meaning: "marriage", example: "来年、結婚する予定です。", exampleEn: "I plan to get married next year.", chapter: 2, tags: ["family"] },

  // Chapter 3 - Food & Dining
  { id: "v013", word: "料理", reading: "りょうり", romaji: "ryouri", meaning: "cooking; cuisine", example: "日本料理が大好きです。", exampleEn: "I love Japanese cuisine.", chapter: 3, tags: ["food"] },
  { id: "v014", word: "食材", reading: "しょくざい", romaji: "shokuzai", meaning: "ingredients; food ingredients", example: "新鮮な食材を使います。", exampleEn: "I use fresh ingredients.", chapter: 3, tags: ["food"] },
  { id: "v015", word: "味", reading: "あじ", romaji: "aji", meaning: "taste; flavor", example: "この料理の味はどうですか。", exampleEn: "How does this dish taste?", chapter: 3, tags: ["food"] },
  { id: "v016", word: "食事", reading: "しょくじ", romaji: "shokuji", meaning: "meal; dining", example: "一緒に食事しませんか。", exampleEn: "Would you like to have a meal together?", chapter: 3, tags: ["food"] },
  { id: "v017", word: "注文", reading: "ちゅうもん", romaji: "chuumon", meaning: "order (at restaurant)", example: "注文してもいいですか。", exampleEn: "May I order?", chapter: 3, tags: ["food"] },
  { id: "v018", word: "値段", reading: "ねだん", romaji: "nedan", meaning: "price; cost", example: "値段はいくらですか。", exampleEn: "How much is the price?", chapter: 3, tags: ["shopping", "food"] },

  // Chapter 4 - Transportation & Travel
  { id: "v019", word: "交通", reading: "こうつう", romaji: "koutsuu", meaning: "traffic; transportation", example: "交通が便利です。", exampleEn: "Transportation is convenient.", chapter: 4, tags: ["travel"] },
  { id: "v020", word: "電車", reading: "でんしゃ", romaji: "densha", meaning: "train; electric train", example: "毎日電車で通勤します。", exampleEn: "I commute by train every day.", chapter: 4, tags: ["travel"] },
  { id: "v021", word: "乗り換え", reading: "のりかえ", romaji: "norikae", meaning: "transfer (trains/buses)", example: "渋谷で乗り換えてください。", exampleEn: "Please transfer at Shibuya.", chapter: 4, tags: ["travel"] },
  { id: "v022", word: "目的地", reading: "もくてきち", romaji: "mokutekichi", meaning: "destination", example: "目的地はどこですか。", exampleEn: "Where is your destination?", chapter: 4, tags: ["travel"] },
  { id: "v023", word: "旅行", reading: "りょこう", romaji: "ryokou", meaning: "travel; trip", example: "夏休みに旅行します。", exampleEn: "I'm going on a trip during summer vacation.", chapter: 4, tags: ["travel"] },
  { id: "v024", word: "予約", reading: "よやく", romaji: "yoyaku", meaning: "reservation; booking", example: "ホテルを予約しました。", exampleEn: "I made a hotel reservation.", chapter: 4, tags: ["travel"] },
  { id: "v025", word: "空港", reading: "くうこう", romaji: "kuukou", meaning: "airport", example: "空港まで車で行きます。", exampleEn: "I'll go to the airport by car.", chapter: 4, tags: ["travel"] },

  // Chapter 5 - Shopping
  { id: "v026", word: "買い物", reading: "かいもの", romaji: "kaimono", meaning: "shopping", example: "週末に買い物に行きます。", exampleEn: "I go shopping on weekends.", chapter: 5, tags: ["shopping"] },
  { id: "v027", word: "割引", reading: "わりびき", romaji: "waribiki", meaning: "discount", example: "今日は三割引です。", exampleEn: "Today it's 30% off.", chapter: 5, tags: ["shopping"] },
  { id: "v028", word: "レシート", reading: "レシート", romaji: "reshiito", meaning: "receipt", example: "レシートをください。", exampleEn: "Please give me a receipt.", chapter: 5, tags: ["shopping"] },
  { id: "v029", word: "品質", reading: "ひんしつ", romaji: "hinshitsu", meaning: "quality", example: "この商品は品質がいいです。", exampleEn: "This product has good quality.", chapter: 5, tags: ["shopping"] },
  { id: "v030", word: "交換", reading: "こうかん", romaji: "koukan", meaning: "exchange; swap", example: "サイズを交換したいです。", exampleEn: "I'd like to exchange the size.", chapter: 5, tags: ["shopping"] },

  // Chapter 6 - Health & Body
  { id: "v031", word: "健康", reading: "けんこう", romaji: "kenkou", meaning: "health", example: "健康が一番大切です。", exampleEn: "Health is the most important.", chapter: 6, tags: ["health"] },
  { id: "v032", word: "病院", reading: "びょういん", romaji: "byouin", meaning: "hospital", example: "病院に行ってきました。", exampleEn: "I went to the hospital.", chapter: 6, tags: ["health"] },
  { id: "v033", word: "症状", reading: "しょうじょう", romaji: "shoujou", meaning: "symptom", example: "どんな症状ですか。", exampleEn: "What are your symptoms?", chapter: 6, tags: ["health"] },
  { id: "v034", word: "薬", reading: "くすり", romaji: "kusuri", meaning: "medicine; drug", example: "この薬を飲んでください。", exampleEn: "Please take this medicine.", chapter: 6, tags: ["health"] },
  { id: "v035", word: "運動", reading: "うんどう", romaji: "undou", meaning: "exercise; sports", example: "毎日運動しています。", exampleEn: "I exercise every day.", chapter: 6, tags: ["health"] },
  { id: "v036", word: "睡眠", reading: "すいみん", romaji: "suimin", meaning: "sleep", example: "十分な睡眠が必要です。", exampleEn: "Sufficient sleep is necessary.", chapter: 6, tags: ["health"] },

  // Chapter 7 - School & Education
  { id: "v037", word: "授業", reading: "じゅぎょう", romaji: "jugyou", meaning: "class; lesson", example: "授業は九時から始まります。", exampleEn: "Class starts at 9 o'clock.", chapter: 7, tags: ["school"] },
  { id: "v038", word: "宿題", reading: "しゅくだい", romaji: "shukudai", meaning: "homework", example: "宿題を忘れました。", exampleEn: "I forgot my homework.", chapter: 7, tags: ["school"] },
  { id: "v039", word: "試験", reading: "しけん", romaji: "shiken", meaning: "exam; test", example: "来週、試験があります。", exampleEn: "There's an exam next week.", chapter: 7, tags: ["school"] },
  { id: "v040", word: "成績", reading: "せいせき", romaji: "seiseki", meaning: "grades; results", example: "成績が上がりました。", exampleEn: "My grades went up.", chapter: 7, tags: ["school"] },
  { id: "v041", word: "卒業", reading: "そつぎょう", romaji: "sotsugyou", meaning: "graduation", example: "来年卒業します。", exampleEn: "I'm graduating next year.", chapter: 7, tags: ["school"] },
  { id: "v042", word: "留学", reading: "りゅうがく", romaji: "ryuugaku", meaning: "studying abroad", example: "日本に留学したいです。", exampleEn: "I want to study abroad in Japan.", chapter: 7, tags: ["school"] },
  { id: "v043", word: "図書館", reading: "としょかん", romaji: "toshokan", meaning: "library", example: "図書館で勉強します。", exampleEn: "I study at the library.", chapter: 7, tags: ["school"] },

  // Chapter 8 - Work & Career
  { id: "v044", word: "仕事", reading: "しごと", romaji: "shigoto", meaning: "work; job", example: "今の仕事が好きです。", exampleEn: "I like my current job.", chapter: 8, tags: ["work"] },
  { id: "v045", word: "会社", reading: "かいしゃ", romaji: "kaisha", meaning: "company", example: "大きな会社に勤めています。", exampleEn: "I work at a large company.", chapter: 8, tags: ["work"] },
  { id: "v046", word: "就職", reading: "しゅうしょく", romaji: "shuushoku", meaning: "finding employment; getting a job", example: "就職活動をしています。", exampleEn: "I'm doing job hunting.", chapter: 8, tags: ["work"] },
  { id: "v047", word: "給料", reading: "きゅうりょう", romaji: "kyuuryou", meaning: "salary; wages", example: "給料が上がりました。", exampleEn: "My salary increased.", chapter: 8, tags: ["work"] },
  { id: "v048", word: "残業", reading: "ざんぎょう", romaji: "zangyou", meaning: "overtime work", example: "残業が多すぎます。", exampleEn: "There's too much overtime.", chapter: 8, tags: ["work"] },
  { id: "v049", word: "会議", reading: "かいぎ", romaji: "kaigi", meaning: "meeting; conference", example: "午後に会議があります。", exampleEn: "There's a meeting this afternoon.", chapter: 8, tags: ["work"] },
  { id: "v050", word: "退職", reading: "たいしょく", romaji: "taishoku", meaning: "retirement; resignation", example: "六十歳で退職します。", exampleEn: "I'll retire at 60.", chapter: 8, tags: ["work"] },

  // Chapter 9 - Weather & Environment
  { id: "v051", word: "天気", reading: "てんき", romaji: "tenki", meaning: "weather", example: "今日の天気はいいですね。", exampleEn: "The weather is nice today, isn't it?", chapter: 9, tags: ["weather"] },
  { id: "v052", word: "気候", reading: "きこう", romaji: "kikou", meaning: "climate", example: "日本の気候は四季があります。", exampleEn: "Japan's climate has four seasons.", chapter: 9, tags: ["weather"] },
  { id: "v053", word: "環境", reading: "かんきょう", romaji: "kankyou", meaning: "environment", example: "環境問題が深刻です。", exampleEn: "Environmental problems are serious.", chapter: 9, tags: ["environment"] },
  { id: "v054", word: "自然", reading: "しぜん", romaji: "shizen", meaning: "nature", example: "自然が豊かな国です。", exampleEn: "It's a country rich in nature.", chapter: 9, tags: ["environment"] },
  { id: "v055", word: "災害", reading: "さいがい", romaji: "saigai", meaning: "disaster; calamity", example: "地震などの自然災害が多い。", exampleEn: "There are many natural disasters like earthquakes.", chapter: 9, tags: ["environment"] },
  { id: "v056", word: "台風", reading: "たいふう", romaji: "taifuu", meaning: "typhoon", example: "台風が近づいています。", exampleEn: "A typhoon is approaching.", chapter: 9, tags: ["weather"] },

  // Chapter 10 - Culture & Traditions
  { id: "v057", word: "文化", reading: "ぶんか", romaji: "bunka", meaning: "culture", example: "日本の文化に興味があります。", exampleEn: "I'm interested in Japanese culture.", chapter: 10, tags: ["culture"] },
  { id: "v058", word: "伝統", reading: "でんとう", romaji: "dentou", meaning: "tradition", example: "日本の伝統を大切にしたい。", exampleEn: "I want to value Japanese traditions.", chapter: 10, tags: ["culture"] },
  { id: "v059", word: "祭り", reading: "まつり", romaji: "matsuri", meaning: "festival", example: "夏祭りは楽しいです。", exampleEn: "Summer festivals are fun.", chapter: 10, tags: ["culture"] },
  { id: "v060", word: "習慣", reading: "しゅうかん", romaji: "shuukan", meaning: "custom; habit", example: "日本独特の習慣があります。", exampleEn: "There are customs unique to Japan.", chapter: 10, tags: ["culture"] },
  { id: "v061", word: "芸術", reading: "げいじゅつ", romaji: "geijutsu", meaning: "art; fine arts", example: "日本の芸術は美しい。", exampleEn: "Japanese art is beautiful.", chapter: 10, tags: ["culture"] },
  { id: "v062", word: "茶道", reading: "さどう", romaji: "sadou", meaning: "tea ceremony", example: "茶道を習っています。", exampleEn: "I'm learning the tea ceremony.", chapter: 10, tags: ["culture"] },
  { id: "v063", word: "着物", reading: "きもの", romaji: "kimono", meaning: "kimono (traditional garment)", example: "成人式に着物を着ます。", exampleEn: "I wear a kimono at the coming-of-age ceremony.", chapter: 10, tags: ["culture"] },

  // Chapter 11 - Social Issues
  { id: "v064", word: "社会", reading: "しゃかい", romaji: "shakai", meaning: "society", example: "社会問題について考えます。", exampleEn: "I think about social issues.", chapter: 11, tags: ["society"] },
  { id: "v065", word: "問題", reading: "もんだい", romaji: "mondai", meaning: "problem; issue; question", example: "この問題は複雑です。", exampleEn: "This issue is complex.", chapter: 11, tags: ["society"] },
  { id: "v066", word: "少子化", reading: "しょうしか", romaji: "shoushika", meaning: "declining birthrate", example: "少子化が進んでいます。", exampleEn: "The declining birthrate is progressing.", chapter: 11, tags: ["society"] },
  { id: "v067", word: "高齢化", reading: "こうれいか", romaji: "koureika", meaning: "aging population", example: "高齢化社会が課題です。", exampleEn: "An aging society is a challenge.", chapter: 11, tags: ["society"] },
  { id: "v068", word: "格差", reading: "かくさ", romaji: "kakusa", meaning: "disparity; gap", example: "経済格差が広がっています。", exampleEn: "Economic disparity is widening.", chapter: 11, tags: ["society"] },
  { id: "v069", word: "差別", reading: "さべつ", romaji: "sabetsu", meaning: "discrimination", example: "差別をなくす努力が必要です。", exampleEn: "Effort to eliminate discrimination is needed.", chapter: 11, tags: ["society"] },
  { id: "v070", word: "ボランティア", reading: "ボランティア", romaji: "borantia", meaning: "volunteer", example: "ボランティア活動をしています。", exampleEn: "I do volunteer activities.", chapter: 11, tags: ["society"] },

  // Chapter 12 - Technology & Media
  { id: "v071", word: "技術", reading: "ぎじゅつ", romaji: "gijutsu", meaning: "technology; technique", example: "日本の技術は世界一です。", exampleEn: "Japan's technology is the best in the world.", chapter: 12, tags: ["technology"] },
  { id: "v072", word: "インターネット", reading: "インターネット", romaji: "intaanetto", meaning: "internet", example: "インターネットで調べます。", exampleEn: "I'll look it up on the internet.", chapter: 12, tags: ["technology"] },
  { id: "v073", word: "情報", reading: "じょうほう", romaji: "jouhou", meaning: "information", example: "情報を集めています。", exampleEn: "I'm gathering information.", chapter: 12, tags: ["technology"] },
  { id: "v074", word: "人工知能", reading: "じんこうちのう", romaji: "jinkou chinou", meaning: "artificial intelligence (AI)", example: "人工知能の発展が目覚ましい。", exampleEn: "The development of AI is remarkable.", chapter: 12, tags: ["technology"] },
  { id: "v075", word: "SNS", reading: "エスエヌエス", romaji: "esu en esu", meaning: "social networking service", example: "SNSをよく使います。", exampleEn: "I use social media a lot.", chapter: 12, tags: ["technology"] },
  { id: "v076", word: "スマートフォン", reading: "スマートフォン", romaji: "sumaatofon", meaning: "smartphone", example: "スマートフォンが欠かせない。", exampleEn: "Smartphones are indispensable.", chapter: 12, tags: ["technology"] },

  // Additional AP Japanese vocabulary
  { id: "v077", word: "政治", reading: "せいじ", romaji: "seiji", meaning: "politics", example: "政治に興味があります。", exampleEn: "I'm interested in politics.", chapter: 13, tags: ["society"] },
  { id: "v078", word: "経済", reading: "けいざい", romaji: "keizai", meaning: "economy", example: "経済が回復してきました。", exampleEn: "The economy has been recovering.", chapter: 13, tags: ["society"] },
  { id: "v079", word: "国際", reading: "こくさい", romaji: "kokusai", meaning: "international", example: "国際交流が大切です。", exampleEn: "International exchange is important.", chapter: 13, tags: ["society"] },
  { id: "v080", word: "平和", reading: "へいわ", romaji: "heiwa", meaning: "peace", example: "世界平和を願っています。", exampleEn: "I wish for world peace.", chapter: 13, tags: ["society"] },
  { id: "v081", word: "グローバル化", reading: "グローバルか", romaji: "guroobaruka", meaning: "globalization", example: "グローバル化が進んでいます。", exampleEn: "Globalization is advancing.", chapter: 13, tags: ["society"] },
  { id: "v082", word: "意見", reading: "いけん", romaji: "iken", meaning: "opinion", example: "あなたの意見を聞かせてください。", exampleEn: "Please let me hear your opinion.", chapter: 13, tags: ["communication"] },
  { id: "v083", word: "議論", reading: "ぎろん", romaji: "giron", meaning: "discussion; argument", example: "クラスで議論しました。", exampleEn: "We had a discussion in class.", chapter: 13, tags: ["communication"] },
  { id: "v084", word: "解決", reading: "かいけつ", romaji: "kaiketsu", meaning: "solution; resolution", example: "問題を解決しなければなりません。", exampleEn: "We must solve the problem.", chapter: 13, tags: ["society"] },
  { id: "v085", word: "影響", reading: "えいきょう", romaji: "eikyou", meaning: "influence; effect", example: "環境に悪い影響を与えます。", exampleEn: "It has a bad effect on the environment.", chapter: 13, tags: ["society"] },
  { id: "v086", word: "比較", reading: "ひかく", romaji: "hikaku", meaning: "comparison", example: "二つを比較してみましょう。", exampleEn: "Let's compare the two.", chapter: 13, tags: ["communication"] },
  { id: "v087", word: "批判", reading: "ひはん", romaji: "hihan", meaning: "criticism", example: "建設的な批判が大切です。", exampleEn: "Constructive criticism is important.", chapter: 13, tags: ["communication"] },
  { id: "v088", word: "提案", reading: "ていあん", romaji: "teian", meaning: "proposal; suggestion", example: "新しい提案があります。", exampleEn: "I have a new proposal.", chapter: 13, tags: ["communication"] },
  { id: "v089", word: "目標", reading: "もくひょう", romaji: "mokuhyou", meaning: "goal; target", example: "目標を達成しました。", exampleEn: "I achieved my goal.", chapter: 13, tags: ["school", "work"] },
  { id: "v090", word: "努力", reading: "どりょく", romaji: "doryoku", meaning: "effort; hard work", example: "努力すれば夢は叶う。", exampleEn: "If you make an effort, dreams come true.", chapter: 13, tags: ["school", "work"] },
  { id: "v091", word: "経験", reading: "けいけん", romaji: "keiken", meaning: "experience", example: "海外での経験が生きています。", exampleEn: "My experience abroad is useful.", chapter: 13, tags: ["work"] },
  { id: "v092", word: "成長", reading: "せいちょう", romaji: "seichou", meaning: "growth; development", example: "子供の成長を見守ります。", exampleEn: "I watch over the child's growth.", chapter: 13, tags: ["family", "society"] },
  { id: "v093", word: "責任", reading: "せきにん", romaji: "sekinin", meaning: "responsibility", example: "自分の責任を果たします。", exampleEn: "I fulfill my own responsibilities.", chapter: 13, tags: ["society", "work"] },
  { id: "v094", word: "協力", reading: "きょうりょく", romaji: "kyouryoku", meaning: "cooperation", example: "みんなで協力しましょう。", exampleEn: "Let's all cooperate.", chapter: 13, tags: ["society"] },
  { id: "v095", word: "競争", reading: "きょうそう", romaji: "kyousou", meaning: "competition", example: "激しい競争があります。", exampleEn: "There is fierce competition.", chapter: 13, tags: ["society", "work"] },
  { id: "v096", word: "地球温暖化", reading: "ちきゅうおんだんか", romaji: "chikyuu ondanka", meaning: "global warming", example: "地球温暖化を防ぐ必要があります。", exampleEn: "We need to prevent global warming.", chapter: 9, tags: ["environment"] },
  { id: "v097", word: "リサイクル", reading: "リサイクル", romaji: "risaikuru", meaning: "recycling", example: "リサイクルを心がけています。", exampleEn: "I try to recycle.", chapter: 9, tags: ["environment"] },
  { id: "v098", word: "再生可能エネルギー", reading: "さいせいかのうエネルギー", romaji: "saisei kanou enerugi", meaning: "renewable energy", example: "再生可能エネルギーが注目されています。", exampleEn: "Renewable energy is attracting attention.", chapter: 9, tags: ["environment"] },
  { id: "v099", word: "人口", reading: "じんこう", romaji: "jinkou", meaning: "population", example: "日本の人口が減っています。", exampleEn: "Japan's population is decreasing.", chapter: 11, tags: ["society"] },
  { id: "v100", word: "移民", reading: "いみん", romaji: "imin", meaning: "immigration; immigrant", example: "移民問題が増えています。", exampleEn: "Immigration issues are increasing.", chapter: 11, tags: ["society"] },
  { id: "v101", word: "多様性", reading: "たようせい", romaji: "tayousei", meaning: "diversity", example: "多様性を認め合うことが大切です。", exampleEn: "It's important to recognize diversity.", chapter: 11, tags: ["society"] },
  { id: "v102", word: "教育", reading: "きょういく", romaji: "kyouiku", meaning: "education", example: "教育の機会は平等であるべきです。", exampleEn: "Educational opportunities should be equal.", chapter: 7, tags: ["school", "society"] },
  { id: "v103", word: "奨学金", reading: "しょうがくきん", romaji: "shougakukin", meaning: "scholarship", example: "奨学金をもらっています。", exampleEn: "I receive a scholarship.", chapter: 7, tags: ["school"] },
  { id: "v104", word: "進学", reading: "しんがく", romaji: "shingaku", meaning: "advancing to next level of school", example: "大学に進学します。", exampleEn: "I'll advance to university.", chapter: 7, tags: ["school"] },
  { id: "v105", word: "就活", reading: "しゅうかつ", romaji: "shuukatsu", meaning: "job hunting (short for 就職活動)", example: "就活を始めました。", exampleEn: "I've started job hunting.", chapter: 8, tags: ["work"] },
  { id: "v106", word: "起業", reading: "きぎょう", romaji: "kigyou", meaning: "starting a business; entrepreneurship", example: "将来、起業したいです。", exampleEn: "I want to start a business in the future.", chapter: 8, tags: ["work"] },
  { id: "v107", word: "在宅勤務", reading: "ざいたくきんむ", romaji: "zaitaku kinmu", meaning: "working from home; remote work", example: "在宅勤務が増えました。", exampleEn: "Remote work has increased.", chapter: 8, tags: ["work", "technology"] },
  { id: "v108", word: "医療", reading: "いりょう", romaji: "iryou", meaning: "medical care; healthcare", example: "医療費が高くなっています。", exampleEn: "Medical costs are rising.", chapter: 6, tags: ["health", "society"] },
  { id: "v109", word: "予防", reading: "よぼう", romaji: "yobou", meaning: "prevention", example: "病気の予防が大切です。", exampleEn: "Prevention of illness is important.", chapter: 6, tags: ["health"] },
  { id: "v110", word: "精神的", reading: "せいしんてき", romaji: "seishinteki", meaning: "mental; psychological", example: "精神的なストレスを感じます。", exampleEn: "I feel mental stress.", chapter: 6, tags: ["health"] },

  // Chapter 1 additions - Basic introductions
  { id: "v111", word: "学生", reading: "がくせい", romaji: "gakusei", meaning: "student", example: "私は大学の学生です。", exampleEn: "I am a university student.", chapter: 1, tags: ["school"] },
  { id: "v112", word: "先生", reading: "せんせい", romaji: "sensei", meaning: "teacher", example: "先生に質問があります。", exampleEn: "I have a question for the teacher.", chapter: 1, tags: ["school"] },
  { id: "v113", word: "名前", reading: "なまえ", romaji: "namae", meaning: "name", example: "お名前は何ですか。", exampleEn: "What is your name?", chapter: 1, tags: ["social"] },
  { id: "v114", word: "映画", reading: "えいが", romaji: "eiga", meaning: "movie; film", example: "週末に映画を見ました。", exampleEn: "I watched a movie on the weekend.", chapter: 1, tags: ["daily", "culture"] },
  { id: "v115", word: "音楽", reading: "おんがく", romaji: "ongaku", meaning: "music", example: "音楽を聴くのが好きです。", exampleEn: "I like listening to music.", chapter: 1, tags: ["daily", "culture"] },
  { id: "v116", word: "誕生日", reading: "たんじょうび", romaji: "tanjoubi", meaning: "birthday", example: "今日は私の誕生日です。", exampleEn: "Today is my birthday.", chapter: 1, tags: ["social"] },
  { id: "v117", word: "国", reading: "くに", romaji: "kuni", meaning: "country; nation", example: "あなたの国はどこですか。", exampleEn: "What country are you from?", chapter: 1, tags: ["social"] },

  // Chapter 2 additions - Food and shopping basics
  { id: "v118", word: "食べ物", reading: "たべもの", romaji: "tabemono", meaning: "food", example: "好きな食べ物は何ですか。", exampleEn: "What is your favorite food?", chapter: 2, tags: ["food"] },
  { id: "v119", word: "飲み物", reading: "のみもの", romaji: "nomimono", meaning: "beverage; drink", example: "何か飲み物はいかがですか。", exampleEn: "Would you like something to drink?", chapter: 2, tags: ["food"] },
  { id: "v120", word: "魚", reading: "さかな", romaji: "sakana", meaning: "fish", example: "毎日魚を食べています。", exampleEn: "I eat fish every day.", chapter: 2, tags: ["food"] },
  { id: "v121", word: "野菜", reading: "やさい", romaji: "yasai", meaning: "vegetable", example: "野菜をたくさん食べてください。", exampleEn: "Please eat lots of vegetables.", chapter: 2, tags: ["food", "health"] },
  { id: "v122", word: "肉", reading: "にく", romaji: "niku", meaning: "meat", example: "肉より魚が好きです。", exampleEn: "I like fish more than meat.", chapter: 2, tags: ["food"] },
  { id: "v123", word: "お茶", reading: "おちゃ", romaji: "ocha", meaning: "green tea; tea", example: "日本では毎日お茶を飲みます。", exampleEn: "In Japan, we drink tea every day.", chapter: 2, tags: ["food", "culture"] },
  { id: "v124", word: "コーヒー", reading: "コーヒー", romaji: "koohii", meaning: "coffee", example: "朝はコーヒーを飲みます。", exampleEn: "I drink coffee in the morning.", chapter: 2, tags: ["food", "daily"] },
  { id: "v125", word: "メニュー", reading: "メニュー", romaji: "menyuu", meaning: "menu", example: "メニューを見せてください。", exampleEn: "Please show me the menu.", chapter: 2, tags: ["food"] },

  // Chapter 3 additions - Schedule and time
  { id: "v126", word: "時間", reading: "じかん", romaji: "jikan", meaning: "time; hour", example: "時間がありません。", exampleEn: "I don't have time.", chapter: 3, tags: ["daily"] },
  { id: "v127", word: "週末", reading: "しゅうまつ", romaji: "shuumatsu", meaning: "weekend", example: "週末は友達と遊びます。", exampleEn: "I hang out with friends on the weekend.", chapter: 3, tags: ["daily"] },
  { id: "v128", word: "平日", reading: "へいじつ", romaji: "heijitsu", meaning: "weekday", example: "平日は毎日学校に行きます。", exampleEn: "On weekdays, I go to school every day.", chapter: 3, tags: ["daily", "school"] },
  { id: "v129", word: "銀行", reading: "ぎんこう", romaji: "ginkou", meaning: "bank", example: "銀行でお金を下ろしました。", exampleEn: "I withdrew money from the bank.", chapter: 3, tags: ["daily"] },
  { id: "v130", word: "郵便局", reading: "ゆうびんきょく", romaji: "yuubinkyoku", meaning: "post office", example: "郵便局で荷物を送りました。", exampleEn: "I sent a package at the post office.", chapter: 3, tags: ["daily"] },
  { id: "v131", word: "朝", reading: "あさ", romaji: "asa", meaning: "morning", example: "朝早く起きるのが苦手です。", exampleEn: "I'm not good at waking up early in the morning.", chapter: 3, tags: ["daily"] },
  { id: "v132", word: "夜", reading: "よる", romaji: "yoru", meaning: "night; evening", example: "夜は静かに勉強します。", exampleEn: "I study quietly at night.", chapter: 3, tags: ["daily"] },
  { id: "v133", word: "毎日", reading: "まいにち", romaji: "mainichi", meaning: "every day", example: "毎日日本語を練習しています。", exampleEn: "I practice Japanese every day.", chapter: 3, tags: ["daily"] },

  // Chapter 4 additions - Transportation and places
  { id: "v134", word: "新幹線", reading: "しんかんせん", romaji: "shinkansen", meaning: "bullet train; Shinkansen", example: "東京から大阪まで新幹線で行きます。", exampleEn: "I'll go from Tokyo to Osaka by bullet train.", chapter: 4, tags: ["travel"] },
  { id: "v135", word: "飛行機", reading: "ひこうき", romaji: "hikouki", meaning: "airplane", example: "飛行機は電車より速いです。", exampleEn: "Airplanes are faster than trains.", chapter: 4, tags: ["travel"] },
  { id: "v136", word: "バス", reading: "バス", romaji: "basu", meaning: "bus", example: "バスで学校に通っています。", exampleEn: "I commute to school by bus.", chapter: 4, tags: ["travel", "daily"] },
  { id: "v137", word: "山", reading: "やま", romaji: "yama", meaning: "mountain", example: "富士山は日本一高い山です。", exampleEn: "Mt. Fuji is the tallest mountain in Japan.", chapter: 4, tags: ["travel", "environment"] },
  { id: "v138", word: "川", reading: "かわ", romaji: "kawa", meaning: "river", example: "川の近くで遊びました。", exampleEn: "We played near the river.", chapter: 4, tags: ["environment"] },
  { id: "v139", word: "神社", reading: "じんじゃ", romaji: "jinja", meaning: "Shinto shrine", example: "新年に神社に行きました。", exampleEn: "I went to a Shinto shrine for New Year's.", chapter: 4, tags: ["culture", "travel"] },
  { id: "v140", word: "温泉", reading: "おんせん", romaji: "onsen", meaning: "hot spring; onsen", example: "温泉に入るのが大好きです。", exampleEn: "I love soaking in hot springs.", chapter: 4, tags: ["travel", "culture"] },
  { id: "v141", word: "町", reading: "まち", romaji: "machi", meaning: "town; city; neighborhood", example: "この町はとても静かです。", exampleEn: "This town is very quiet.", chapter: 4, tags: ["daily"] },

  // Chapter 5 additions - Days off and leisure
  { id: "v142", word: "家", reading: "いえ", romaji: "ie", meaning: "house; home", example: "私の家は駅の近くにあります。", exampleEn: "My house is near the station.", chapter: 5, tags: ["daily"] },
  { id: "v143", word: "部屋", reading: "へや", romaji: "heya", meaning: "room", example: "部屋を掃除しました。", exampleEn: "I cleaned my room.", chapter: 5, tags: ["daily"] },
  { id: "v144", word: "写真", reading: "しゃしん", romaji: "shashin", meaning: "photograph; photo", example: "旅行で写真をたくさん撮りました。", exampleEn: "I took many photos during the trip.", chapter: 5, tags: ["daily", "travel"] },
  { id: "v145", word: "自転車", reading: "じてんしゃ", romaji: "jitensha", meaning: "bicycle", example: "毎日自転車で通学しています。", exampleEn: "I commute to school by bicycle every day.", chapter: 5, tags: ["travel", "daily"] },
  { id: "v146", word: "公園", reading: "こうえん", romaji: "kouen", meaning: "park", example: "公園で子供たちが遊んでいます。", exampleEn: "Children are playing in the park.", chapter: 5, tags: ["daily"] },

  // Chapter 6 additions - Entertainment and plans
  { id: "v147", word: "映画館", reading: "えいがかん", romaji: "eigakan", meaning: "movie theater; cinema", example: "映画館で新しい映画を見ました。", exampleEn: "I watched a new movie at the movie theater.", chapter: 6, tags: ["daily", "culture"] },
  { id: "v148", word: "カラオケ", reading: "カラオケ", romaji: "karaoke", meaning: "karaoke", example: "友達とカラオケに行きました。", exampleEn: "I went to karaoke with my friends.", chapter: 6, tags: ["daily", "social"] },
  { id: "v149", word: "コンサート", reading: "コンサート", romaji: "konsaato", meaning: "concert", example: "好きな歌手のコンサートに行きます。", exampleEn: "I'm going to my favorite singer's concert.", chapter: 6, tags: ["daily", "culture"] },
  { id: "v150", word: "試合", reading: "しあい", romaji: "shiai", meaning: "match; game; competition", example: "明日、サッカーの試合があります。", exampleEn: "There is a soccer match tomorrow.", chapter: 6, tags: ["daily"] },
  { id: "v151", word: "約束", reading: "やくそく", romaji: "yakusoku", meaning: "promise; appointment", example: "友達との約束を忘れました。", exampleEn: "I forgot my promise with my friend.", chapter: 6, tags: ["social"] },
  { id: "v152", word: "地下鉄", reading: "ちかてつ", romaji: "chikatetsu", meaning: "subway; underground train", example: "地下鉄で会社に通っています。", exampleEn: "I commute to work by subway.", chapter: 6, tags: ["travel", "daily"] },

  // Chapter 7 additions - Directions and locations
  { id: "v153", word: "右", reading: "みぎ", romaji: "migi", meaning: "right (direction)", example: "次の角を右に曲がってください。", exampleEn: "Please turn right at the next corner.", chapter: 7, tags: ["daily"] },
  { id: "v154", word: "左", reading: "ひだり", romaji: "hidari", meaning: "left (direction)", example: "郵便局は左側にあります。", exampleEn: "The post office is on the left side.", chapter: 7, tags: ["daily"] },
  { id: "v155", word: "橋", reading: "はし", romaji: "hashi", meaning: "bridge", example: "川の上に大きな橋があります。", exampleEn: "There is a large bridge over the river.", chapter: 7, tags: ["daily", "travel"] },
  { id: "v156", word: "道", reading: "みち", romaji: "michi", meaning: "road; path; way", example: "この道を真っすぐ行ってください。", exampleEn: "Please go straight along this road.", chapter: 7, tags: ["travel", "daily"] },
  { id: "v157", word: "信号", reading: "しんごう", romaji: "shingou", meaning: "traffic light; signal", example: "信号が赤のときは止まります。", exampleEn: "Stop when the traffic light is red.", chapter: 7, tags: ["travel"] },
  { id: "v158", word: "交差点", reading: "こうさてん", romaji: "kousaten", meaning: "intersection; crossroads", example: "交差点を左に曲がってください。", exampleEn: "Please turn left at the intersection.", chapter: 7, tags: ["travel"] },

  // Chapter 8 additions - Family and body
  { id: "v159", word: "父", reading: "ちち", romaji: "chichi", meaning: "father (my own)", example: "父は会社員です。", exampleEn: "My father is a company employee.", chapter: 8, tags: ["family"] },
  { id: "v160", word: "母", reading: "はは", romaji: "haha", meaning: "mother (my own)", example: "母は料理が上手です。", exampleEn: "My mother is good at cooking.", chapter: 8, tags: ["family"] },
  { id: "v161", word: "兄", reading: "あに", romaji: "ani", meaning: "older brother (my own)", example: "兄は大学に通っています。", exampleEn: "My older brother attends university.", chapter: 8, tags: ["family"] },
  { id: "v162", word: "姉", reading: "あね", romaji: "ane", meaning: "older sister (my own)", example: "姉はもう結婚しています。", exampleEn: "My older sister is already married.", chapter: 8, tags: ["family"] },
  { id: "v163", word: "弟", reading: "おとうと", romaji: "otouto", meaning: "younger brother", example: "弟は高校生です。", exampleEn: "My younger brother is a high school student.", chapter: 8, tags: ["family"] },
  { id: "v164", word: "妹", reading: "いもうと", romaji: "imouto", meaning: "younger sister", example: "妹と仲良しです。", exampleEn: "I get along well with my younger sister.", chapter: 8, tags: ["family"] },
  { id: "v165", word: "目", reading: "め", romaji: "me", meaning: "eye", example: "目が悪くなってきました。", exampleEn: "My eyes have been getting worse.", chapter: 8, tags: ["health"] },
  { id: "v166", word: "耳", reading: "みみ", romaji: "mimi", meaning: "ear", example: "耳が痛いので病院に行きます。", exampleEn: "My ear hurts so I'll go to the hospital.", chapter: 8, tags: ["health"] },
  { id: "v167", word: "鼻", reading: "はな", romaji: "hana", meaning: "nose", example: "花粉症で鼻が出ます。", exampleEn: "My nose runs because of hay fever.", chapter: 8, tags: ["health"] },
  { id: "v168", word: "口", reading: "くち", romaji: "kuchi", meaning: "mouth", example: "口の中が痛いです。", exampleEn: "The inside of my mouth hurts.", chapter: 8, tags: ["health"] },
  { id: "v169", word: "手", reading: "て", romaji: "te", meaning: "hand", example: "手を洗ってから食べてください。", exampleEn: "Please wash your hands before eating.", chapter: 8, tags: ["health", "daily"] },
  { id: "v170", word: "頭", reading: "あたま", romaji: "atama", meaning: "head", example: "頭が痛くて学校を休みました。", exampleEn: "I had a headache and stayed home from school.", chapter: 8, tags: ["health"] },
  { id: "v171", word: "足", reading: "あし", romaji: "ashi", meaning: "foot; leg", example: "昨日から足が痛いです。", exampleEn: "My leg has been hurting since yesterday.", chapter: 8, tags: ["health"] },

  // Chapter 9 additions - Hobbies
  { id: "v172", word: "小説", reading: "しょうせつ", romaji: "shousetsu", meaning: "novel; fiction", example: "この小説はとても面白いです。", exampleEn: "This novel is very interesting.", chapter: 9, tags: ["culture", "daily"] },
  { id: "v173", word: "漫画", reading: "まんが", romaji: "manga", meaning: "manga; comics", example: "日本の漫画は世界中で人気があります。", exampleEn: "Japanese manga is popular all over the world.", chapter: 9, tags: ["culture"] },
  { id: "v174", word: "書道", reading: "しょどう", romaji: "shodou", meaning: "calligraphy", example: "書道の授業で美しい字を練習します。", exampleEn: "I practice beautiful characters in calligraphy class.", chapter: 9, tags: ["culture", "school"] },

  // Chapter 10 additions - Directions and sightseeing
  { id: "v175", word: "入り口", reading: "いりぐち", romaji: "iriguchi", meaning: "entrance", example: "入り口で待っています。", exampleEn: "I'm waiting at the entrance.", chapter: 10, tags: ["daily", "travel"] },
  { id: "v176", word: "出口", reading: "でぐち", romaji: "deguchi", meaning: "exit", example: "出口はどこですか。", exampleEn: "Where is the exit?", chapter: 10, tags: ["daily", "travel"] },
  { id: "v177", word: "場所", reading: "ばしょ", romaji: "basho", meaning: "place; location; spot", example: "この場所はとても静かです。", exampleEn: "This place is very quiet.", chapter: 10, tags: ["daily"] },
  { id: "v178", word: "動物園", reading: "どうぶつえん", romaji: "doubutsuen", meaning: "zoo", example: "子供と一緒に動物園に行きました。", exampleEn: "I went to the zoo with my child.", chapter: 10, tags: ["daily", "travel"] },

  // Chapter 11 additions - Daily life
  { id: "v179", word: "生活", reading: "せいかつ", romaji: "seikatsu", meaning: "daily life; lifestyle; living", example: "日本での生活に慣れてきました。", exampleEn: "I've gotten used to life in Japan.", chapter: 11, tags: ["daily"] },
  { id: "v180", word: "日記", reading: "にっき", romaji: "nikki", meaning: "diary; journal", example: "毎晩日記を書いています。", exampleEn: "I write in my diary every evening.", chapter: 11, tags: ["daily"] },
  { id: "v181", word: "一人暮らし", reading: "ひとりぐらし", romaji: "hitorigurashi", meaning: "living alone", example: "大学から一人暮らしを始めました。", exampleEn: "I started living alone since university.", chapter: 11, tags: ["daily"] },

  // Chapter 12 additions - Illness and injury
  { id: "v182", word: "けが", reading: "けが", romaji: "kega", meaning: "injury; wound", example: "スポーツでけがをしました。", exampleEn: "I got injured playing sports.", chapter: 12, tags: ["health"] },
  { id: "v183", word: "熱", reading: "ねつ", romaji: "netsu", meaning: "fever; temperature", example: "熱が出て、学校を休みました。", exampleEn: "I had a fever and missed school.", chapter: 12, tags: ["health"] },
  { id: "v184", word: "病気", reading: "びょうき", romaji: "byouki", meaning: "illness; disease; sickness", example: "先週から病気で寝ていました。", exampleEn: "I was sick in bed since last week.", chapter: 12, tags: ["health"] },
  { id: "v185", word: "のど", reading: "のど", romaji: "nodo", meaning: "throat", example: "のどが痛いので薬を飲みました。", exampleEn: "My throat hurts so I took medicine.", chapter: 12, tags: ["health"] },
  { id: "v186", word: "歯", reading: "は", romaji: "ha", meaning: "tooth; teeth", example: "歯が痛くて歯医者に行きました。", exampleEn: "My tooth hurt so I went to the dentist.", chapter: 12, tags: ["health"] },
  { id: "v187", word: "調子", reading: "ちょうし", romaji: "choushi", meaning: "condition; how one feels", example: "最近、体の調子がよくないです。", exampleEn: "I haven't been feeling well lately.", chapter: 12, tags: ["health"] },

  // Chapter 13 additions - Culture and recommendations
  { id: "v188", word: "浴衣", reading: "ゆかた", romaji: "yukata", meaning: "yukata; summer kimono", example: "夏祭りで浴衣を着ました。", exampleEn: "I wore a yukata at the summer festival.", chapter: 13, tags: ["culture"] },
  { id: "v189", word: "人気", reading: "にんき", romaji: "ninki", meaning: "popularity; being popular", example: "このお店は人気があります。", exampleEn: "This restaurant is popular.", chapter: 13, tags: ["daily", "society"] },
  { id: "v190", word: "紅葉", reading: "こうよう", romaji: "kouyou", meaning: "autumn leaves; fall foliage", example: "秋になると紅葉がきれいです。", exampleEn: "When autumn comes, the autumn leaves are beautiful.", chapter: 13, tags: ["culture", "environment"] },
  { id: "v191", word: "相撲", reading: "すもう", romaji: "sumou", meaning: "sumo wrestling", example: "相撲は日本の伝統的なスポーツです。", exampleEn: "Sumo is a traditional Japanese sport.", chapter: 13, tags: ["culture"] },

  // Chapter 14 - Country customs (Dekiru 初級 Ch.14)
  { id: "v192", word: "こたつ", reading: "こたつ", romaji: "kotatsu", meaning: "kotatsu; heated table", example: "冬はこたつに入って温まります。", exampleEn: "In winter, I warm up inside the kotatsu.", chapter: 14, tags: ["culture", "daily"] },
  { id: "v193", word: "布団", reading: "ふとん", romaji: "futon", meaning: "futon; Japanese bedding", example: "毎朝布団を片付けます。", exampleEn: "I put away the futon every morning.", chapter: 14, tags: ["culture", "daily"] },
  { id: "v194", word: "玄関", reading: "げんかん", romaji: "genkan", meaning: "entrance hall; entryway", example: "玄関で靴を脱いでください。", exampleEn: "Please take off your shoes at the entrance.", chapter: 14, tags: ["culture", "daily"] },
  { id: "v195", word: "制服", reading: "せいふく", romaji: "seifuku", meaning: "school uniform; uniform", example: "日本の高校生は制服を着ます。", exampleEn: "Japanese high school students wear uniforms.", chapter: 14, tags: ["school", "culture"] },
  { id: "v196", word: "田舎", reading: "いなか", romaji: "inaka", meaning: "countryside; rural area", example: "田舎の生活はのんびりしています。", exampleEn: "Life in the countryside is relaxing.", chapter: 14, tags: ["daily", "society"] },
  { id: "v197", word: "都会", reading: "とかい", romaji: "tokai", meaning: "city; urban area", example: "都会は便利ですが、うるさいです。", exampleEn: "The city is convenient but noisy.", chapter: 14, tags: ["daily", "society"] },
  { id: "v198", word: "料金", reading: "りょうきん", romaji: "ryoukin", meaning: "fee; charge; fare", example: "入場料金はいくらですか。", exampleEn: "How much is the entrance fee?", chapter: 14, tags: ["shopping", "daily"] },
  { id: "v199", word: "自由", reading: "じゆう", romaji: "jiyuu", meaning: "freedom; liberty", example: "自由な時間に本を読みます。", exampleEn: "I read books in my free time.", chapter: 14, tags: ["daily", "society"] },
  { id: "v200", word: "話", reading: "はなし", romaji: "hanashi", meaning: "story; talk; conversation", example: "友達から面白い話を聞きました。", exampleEn: "I heard an interesting story from my friend.", chapter: 14, tags: ["communication"] },
  { id: "v201", word: "お湯", reading: "おゆ", romaji: "oyu", meaning: "hot water", example: "お湯を沸かしてコーヒーを作ります。", exampleEn: "I boil hot water to make coffee.", chapter: 14, tags: ["daily"] },
  { id: "v202", word: "電気", reading: "でんき", romaji: "denki", meaning: "electricity; electric light", example: "部屋を出るときは電気を消してください。", exampleEn: "Please turn off the light when you leave the room.", chapter: 14, tags: ["daily"] },
  { id: "v203", word: "空気", reading: "くうき", romaji: "kuuki", meaning: "air; atmosphere", example: "山の空気は気持ちいいです。", exampleEn: "The mountain air feels refreshing.", chapter: 14, tags: ["environment", "daily"] },
  { id: "v204", word: "身分証", reading: "みぶんしょう", romaji: "mibunjou", meaning: "ID; identification card", example: "身分証を見せてください。", exampleEn: "Please show me your ID.", chapter: 14, tags: ["daily"] },

  // Chapter 15 - News and media (Dekiru 初級 Ch.15)
  { id: "v205", word: "地震", reading: "じしん", romaji: "jishin", meaning: "earthquake", example: "地震が起きたら、机の下に隠れます。", exampleEn: "When an earthquake occurs, hide under a desk.", chapter: 15, tags: ["environment", "society"] },
  { id: "v206", word: "事故", reading: "じこ", romaji: "jiko", meaning: "accident; incident", example: "道路で事故がありました。", exampleEn: "There was an accident on the road.", chapter: 15, tags: ["society", "daily"] },
  { id: "v207", word: "中止", reading: "ちゅうし", romaji: "chuushi", meaning: "cancellation; discontinuation", example: "雨のため、試合が中止になりました。", exampleEn: "The game was cancelled due to rain.", chapter: 15, tags: ["daily"] },
  { id: "v208", word: "昔", reading: "むかし", romaji: "mukashi", meaning: "old times; the past; long ago", example: "昔はここに森がありました。", exampleEn: "Long ago, there was a forest here.", chapter: 15, tags: ["culture", "society"] },
  { id: "v209", word: "無料", reading: "むりょう", romaji: "muryou", meaning: "free of charge; no cost", example: "このサービスは無料で使えます。", exampleEn: "This service can be used for free.", chapter: 15, tags: ["shopping", "daily"] },
  { id: "v210", word: "夕方", reading: "ゆうがた", romaji: "yuugata", meaning: "early evening; dusk", example: "夕方から雨が降り始めました。", exampleEn: "It started raining in the early evening.", chapter: 15, tags: ["daily"] },
  { id: "v211", word: "風", reading: "かぜ", romaji: "kaze", meaning: "wind; breeze", example: "今日は風が強いです。", exampleEn: "The wind is strong today.", chapter: 15, tags: ["weather"] },
  { id: "v212", word: "席", reading: "せき", romaji: "seki", meaning: "seat; place", example: "電車の席が空いていました。", exampleEn: "There was an open seat on the train.", chapter: 15, tags: ["travel", "daily"] },

  // Chapter 16 - New beginnings (Dekiru 初中級 Ch.1)
  { id: "v213", word: "面接", reading: "めんせつ", romaji: "mensetsu", meaning: "interview (job or school)", example: "明日、就職の面接があります。", exampleEn: "I have a job interview tomorrow.", chapter: 16, tags: ["work", "school"] },
  { id: "v214", word: "履歴書", reading: "りれきしょ", romaji: "rirekisho", meaning: "resume; CV", example: "面接のために履歴書を書きました。", exampleEn: "I wrote a resume for the interview.", chapter: 16, tags: ["work"] },
  { id: "v215", word: "楽器", reading: "がっき", romaji: "gakki", meaning: "musical instrument", example: "ピアノという楽器を習っています。", exampleEn: "I'm learning to play the piano.", chapter: 16, tags: ["culture", "daily"] },
  { id: "v216", word: "歴史", reading: "れきし", romaji: "rekishi", meaning: "history", example: "日本の歴史をもっと知りたいです。", exampleEn: "I want to learn more about Japanese history.", chapter: 16, tags: ["culture", "school"] },
  { id: "v217", word: "言葉", reading: "ことば", romaji: "kotoba", meaning: "word; language; expression", example: "言葉の意味を調べました。", exampleEn: "I looked up the meaning of the word.", chapter: 16, tags: ["communication", "school"] },
  { id: "v218", word: "自分", reading: "じぶん", romaji: "jibun", meaning: "oneself; myself", example: "自分の意見をしっかり言えます。", exampleEn: "I can express my own opinion clearly.", chapter: 16, tags: ["social", "communication"] },
  { id: "v219", word: "字幕", reading: "じまく", romaji: "jimaku", meaning: "subtitles; captions", example: "字幕を見ながら映画を楽しみます。", exampleEn: "I enjoy movies while reading the subtitles.", chapter: 16, tags: ["technology", "culture"] },
  { id: "v220", word: "問い合わせ", reading: "といあわせ", romaji: "toiawase", meaning: "inquiry; question", example: "問い合わせはメールで受け付けています。", exampleEn: "Inquiries are accepted by email.", chapter: 16, tags: ["communication", "work"] },
  { id: "v221", word: "日常会話", reading: "にちじょうかいわ", romaji: "nichijou kaiwa", meaning: "everyday conversation; daily conversation", example: "日常会話なら日本語でできます。", exampleEn: "I can manage everyday conversation in Japanese.", chapter: 16, tags: ["communication", "school"] },

  // Chapter 17 - Shopping (Dekiru 初中級 Ch.2)
  { id: "v222", word: "画面", reading: "がめん", romaji: "gamen", meaning: "screen; display", example: "スマホの画面が割れてしまいました。", exampleEn: "The smartphone screen cracked.", chapter: 17, tags: ["technology"] },
  { id: "v223", word: "指輪", reading: "ゆびわ", romaji: "yubiwa", meaning: "ring (jewelry)", example: "結婚記念日に指輪をもらいました。", exampleEn: "I received a ring on my wedding anniversary.", chapter: 17, tags: ["shopping"] },
  { id: "v224", word: "棚", reading: "たな", romaji: "tana", meaning: "shelf; rack", example: "本を棚に並べました。", exampleEn: "I lined up the books on the shelf.", chapter: 17, tags: ["daily"] },
  { id: "v225", word: "売り場", reading: "うりば", romaji: "uriba", meaning: "sales floor; sales area", example: "この商品は二階の売り場にあります。", exampleEn: "This product is on the second-floor sales area.", chapter: 17, tags: ["shopping"] },
  { id: "v226", word: "壁", reading: "かべ", romaji: "kabe", meaning: "wall", example: "壁に絵を飾りました。", exampleEn: "I decorated the wall with a painting.", chapter: 17, tags: ["daily"] },

  // Chapter 18 - Goals (Dekiru 初中級 Ch.3)
  { id: "v227", word: "専門学校", reading: "せんもんがっこう", romaji: "senmon gakkou", meaning: "vocational school; technical college", example: "料理の専門学校に通っています。", exampleEn: "I attend a culinary vocational school.", chapter: 18, tags: ["school"] },
  { id: "v228", word: "将来", reading: "しょうらい", romaji: "shourai", meaning: "future; one's future", example: "将来は医者になりたいです。", exampleEn: "I want to become a doctor in the future.", chapter: 18, tags: ["school", "work"] },
  { id: "v229", word: "間違い", reading: "まちがい", romaji: "machigai", meaning: "mistake; error", example: "間違いを直してもらいました。", exampleEn: "I had my mistakes corrected.", chapter: 18, tags: ["school", "communication"] },
  { id: "v230", word: "夢", reading: "ゆめ", romaji: "yume", meaning: "dream; aspiration", example: "夢を持って努力することが大切です。", exampleEn: "It's important to have a dream and work hard.", chapter: 18, tags: ["school", "work"] },
  { id: "v231", word: "書類", reading: "しょるい", romaji: "shorui", meaning: "documents; paperwork", example: "申し込みに必要な書類を集めました。", exampleEn: "I gathered the documents needed for the application.", chapter: 18, tags: ["work", "school"] },
  { id: "v232", word: "通訳", reading: "つうやく", romaji: "tsuuyaku", meaning: "interpreter; interpreting", example: "国際会議で通訳をしました。", exampleEn: "I worked as an interpreter at an international conference.", chapter: 18, tags: ["work", "communication"] },
  { id: "v233", word: "笑顔", reading: "えがお", romaji: "egao", meaning: "smile; smiling face", example: "笑顔で接客することが大切です。", exampleEn: "It's important to serve customers with a smile.", chapter: 18, tags: ["social", "work"] },
  { id: "v234", word: "法律", reading: "ほうりつ", romaji: "houritsu", meaning: "law; legislation", example: "法律を守ることは大切です。", exampleEn: "It is important to follow the law.", chapter: 18, tags: ["society"] },
  { id: "v235", word: "答え", reading: "こたえ", romaji: "kotae", meaning: "answer; solution", example: "難しい問題の答えが分かりました。", exampleEn: "I found the answer to the difficult question.", chapter: 18, tags: ["school", "communication"] },
  { id: "v236", word: "資格", reading: "しかく", romaji: "shikaku", meaning: "qualification; license; certificate", example: "日本語の資格を取りたいです。", exampleEn: "I want to obtain a Japanese language qualification.", chapter: 18, tags: ["work", "school"] },

  // Chapter 19 - Community life (Dekiru 初中級 Ch.4)
  { id: "v237", word: "美容院", reading: "びよういん", romaji: "biyouin", meaning: "hair salon; beauty parlor", example: "月に一度、美容院に行きます。", exampleEn: "I go to the hair salon once a month.", chapter: 19, tags: ["daily"] },
  { id: "v238", word: "市民", reading: "しみん", romaji: "shimin", meaning: "citizen; resident", example: "市民として地域に貢献したいです。", exampleEn: "I want to contribute to the community as a citizen.", chapter: 19, tags: ["society"] },
  { id: "v239", word: "種類", reading: "しゅるい", romaji: "shurui", meaning: "type; kind; variety", example: "この店にはたくさんの種類のお菓子があります。", exampleEn: "This store has many kinds of sweets.", chapter: 19, tags: ["daily"] },
  { id: "v240", word: "水道", reading: "すいどう", romaji: "suidou", meaning: "tap water; water supply", example: "水道の水は安全に飲めます。", exampleEn: "The tap water is safe to drink.", chapter: 19, tags: ["daily"] },
  { id: "v241", word: "市役所", reading: "しやくしょ", romaji: "shiyakusho", meaning: "city hall; municipal office", example: "市役所で住民票を取りました。", exampleEn: "I got my residence certificate at the city hall.", chapter: 19, tags: ["daily", "society"] },
  { id: "v242", word: "大使館", reading: "たいしかん", romaji: "taishikan", meaning: "embassy", example: "大使館でビザの手続きをしました。", exampleEn: "I completed the visa procedures at the embassy.", chapter: 19, tags: ["society", "travel"] },
  { id: "v243", word: "小学校", reading: "しょうがっこう", romaji: "shougakkou", meaning: "elementary school; primary school", example: "小学校で算数を教えています。", exampleEn: "I teach mathematics at an elementary school.", chapter: 19, tags: ["school"] },
  { id: "v244", word: "中学校", reading: "ちゅうがっこう", romaji: "chuugakkou", meaning: "junior high school; middle school", example: "中学校から英語の勉強を始めました。", exampleEn: "I started studying English from junior high school.", chapter: 19, tags: ["school"] },
  { id: "v245", word: "坂", reading: "さか", romaji: "saka", meaning: "slope; hill", example: "この坂はとても急です。", exampleEn: "This slope is very steep.", chapter: 19, tags: ["daily", "travel"] },
  { id: "v246", word: "交流会", reading: "こうりゅうかい", romaji: "kouryuukai", meaning: "exchange event; mixer; meetup", example: "留学生との交流会に参加しました。", exampleEn: "I participated in an exchange event with international students.", chapter: 19, tags: ["social", "school"] },

  // Chapter 20 - A hectic day (Dekiru 初中級 Ch.5)
  { id: "v247", word: "階段", reading: "かいだん", romaji: "kaidan", meaning: "stairs; staircase", example: "エレベーターが壊れているので階段を使います。", exampleEn: "The elevator is broken so I use the stairs.", chapter: 20, tags: ["daily"] },
  { id: "v248", word: "鍵", reading: "かぎ", romaji: "kagi", meaning: "key; lock", example: "家の鍵を忘れてしまいました。", exampleEn: "I forgot my house key.", chapter: 20, tags: ["daily"] },
  { id: "v249", word: "教科書", reading: "きょうかしょ", romaji: "kyoukasho", meaning: "textbook", example: "教科書を読んで授業の準備をします。", exampleEn: "I prepare for class by reading the textbook.", chapter: 20, tags: ["school"] },
  { id: "v250", word: "色", reading: "いろ", romaji: "iro", meaning: "color", example: "好きな色は青です。", exampleEn: "My favorite color is blue.", chapter: 20, tags: ["daily"] },
  { id: "v251", word: "形", reading: "かたち", romaji: "katachi", meaning: "shape; form", example: "この石は面白い形をしています。", exampleEn: "This stone has an interesting shape.", chapter: 20, tags: ["daily"] },
  { id: "v252", word: "忘れ物", reading: "わすれもの", romaji: "wasuremono", meaning: "forgotten item; something left behind", example: "電車に忘れ物をしてしまいました。", exampleEn: "I left something behind on the train.", chapter: 20, tags: ["daily", "travel"] },
  { id: "v253", word: "終点", reading: "しゅうてん", romaji: "shuuten", meaning: "terminal station; last stop", example: "この電車の終点はどこですか。", exampleEn: "Where is the terminal station of this train?", chapter: 20, tags: ["travel"] },
  { id: "v254", word: "窓口", reading: "まどぐち", romaji: "madoguchi", meaning: "ticket window; service counter", example: "窓口でチケットを買いました。", exampleEn: "I bought a ticket at the ticket window.", chapter: 20, tags: ["travel", "daily"] },
  { id: "v255", word: "途中", reading: "とちゅう", romaji: "tochuu", meaning: "on the way; midway; in the middle of", example: "途中で友達に会いました。", exampleEn: "I met a friend on the way.", chapter: 20, tags: ["daily", "travel"] },
];

const KANJI = [
  // N4 level Kanji
  { id: "k001", character: "愛", onyomi: "アイ", kunyomi: "あい・する", meaning: "love", strokes: 13, examples: ["愛情", "恋愛", "愛する"], examplesEn: ["affection", "love (romantic)", "to love"], level: "N4" },
  { id: "k002", character: "安", onyomi: "アン", kunyomi: "やす・い", meaning: "cheap; safe; peaceful", strokes: 6, examples: ["安心", "安全", "安い"], examplesEn: ["relief", "safety", "cheap"], level: "N4" },
  { id: "k003", character: "意", onyomi: "イ", kunyomi: "—", meaning: "idea; mind; heart", strokes: 13, examples: ["意見", "意味", "注意"], examplesEn: ["opinion", "meaning", "caution"], level: "N4" },
  { id: "k004", character: "医", onyomi: "イ", kunyomi: "—", meaning: "doctor; medicine", strokes: 7, examples: ["医者", "医療", "医学"], examplesEn: ["doctor", "medical care", "medical science"], level: "N4" },
  { id: "k005", character: "育", onyomi: "イク", kunyomi: "そだ・てる", meaning: "raise; educate", strokes: 8, examples: ["教育", "育てる", "保育"], examplesEn: ["education", "to raise", "childcare"], level: "N4" },
  { id: "k006", character: "員", onyomi: "イン", kunyomi: "—", meaning: "member; staff", strokes: 10, examples: ["会員", "社員", "店員"], examplesEn: ["member", "employee", "store clerk"], level: "N4" },
  { id: "k007", character: "院", onyomi: "イン", kunyomi: "—", meaning: "institution; temple", strokes: 10, examples: ["病院", "大学院", "入院"], examplesEn: ["hospital", "graduate school", "hospitalization"], level: "N4" },
  { id: "k008", character: "運", onyomi: "ウン", kunyomi: "はこ・ぶ", meaning: "carry; luck; fate", strokes: 12, examples: ["運動", "運転", "運命"], examplesEn: ["exercise", "driving", "fate"], level: "N4" },
  { id: "k009", character: "映", onyomi: "エイ", kunyomi: "うつ・る", meaning: "reflect; project", strokes: 9, examples: ["映画", "映像", "上映"], examplesEn: ["movie", "image/video", "screening"], level: "N4" },
  { id: "k010", character: "駅", onyomi: "エキ", kunyomi: "—", meaning: "station", strokes: 14, examples: ["駅", "駅員", "終点駅"], examplesEn: ["station", "station staff", "terminal station"], level: "N4" },
  { id: "k011", character: "遠", onyomi: "エン・オン", kunyomi: "とお・い", meaning: "far; distant", strokes: 13, examples: ["遠い", "遠足", "遠慮"], examplesEn: ["far", "field trip", "reserve/hesitation"], level: "N4" },
  { id: "k012", character: "音", onyomi: "オン・イン", kunyomi: "おと・ね", meaning: "sound; noise", strokes: 9, examples: ["音楽", "音声", "騒音"], examplesEn: ["music", "voice/audio", "noise"], level: "N4" },
  { id: "k013", character: "化", onyomi: "カ・ケ", kunyomi: "ば・ける", meaning: "change; transform", strokes: 4, examples: ["文化", "変化", "高齢化"], examplesEn: ["culture", "change", "aging"], level: "N4" },
  { id: "k014", character: "会", onyomi: "カイ・エ", kunyomi: "あ・う", meaning: "meet; assembly; society", strokes: 6, examples: ["会社", "会議", "社会"], examplesEn: ["company", "meeting", "society"], level: "N4" },
  { id: "k015", character: "解", onyomi: "カイ・ゲ", kunyomi: "と・く", meaning: "solve; untie; understand", strokes: 13, examples: ["解決", "理解", "解答"], examplesEn: ["solution", "understanding", "answer"], level: "N3" },
  { id: "k016", character: "界", onyomi: "カイ", kunyomi: "—", meaning: "world; boundary", strokes: 9, examples: ["世界", "業界", "限界"], examplesEn: ["world", "industry", "limit"], level: "N4" },
  { id: "k017", character: "感", onyomi: "カン", kunyomi: "—", meaning: "feeling; sense; emotion", strokes: 13, examples: ["感謝", "感動", "感情"], examplesEn: ["gratitude", "being moved", "emotion"], level: "N4" },
  { id: "k018", character: "関", onyomi: "カン", kunyomi: "せき", meaning: "connection; barrier; involve", strokes: 14, examples: ["関係", "関心", "関連"], examplesEn: ["relationship", "interest", "connection"], level: "N3" },
  { id: "k019", character: "帰", onyomi: "キ", kunyomi: "かえ・る", meaning: "return; go home", strokes: 10, examples: ["帰る", "帰国", "帰宅"], examplesEn: ["to return", "return to homeland", "returning home"], level: "N4" },
  { id: "k020", character: "記", onyomi: "キ", kunyomi: "しる・す", meaning: "record; write; note", strokes: 10, examples: ["記録", "日記", "記念"], examplesEn: ["record", "diary", "commemoration"], level: "N4" },
  { id: "k021", character: "気", onyomi: "キ・ケ", kunyomi: "—", meaning: "spirit; mind; air; atmosphere", strokes: 6, examples: ["天気", "気持ち", "元気"], examplesEn: ["weather", "feeling", "health/vitality"], level: "N4" },
  { id: "k022", character: "期", onyomi: "キ・ゴ", kunyomi: "—", meaning: "period; time; hope", strokes: 12, examples: ["時期", "期待", "長期"], examplesEn: ["season/period", "expectation", "long-term"], level: "N3" },
  { id: "k023", character: "級", onyomi: "キュウ", kunyomi: "—", meaning: "class; grade; rank", strokes: 9, examples: ["上級", "初級", "同級生"], examplesEn: ["advanced level", "beginner level", "classmate"], level: "N4" },
  { id: "k024", character: "計", onyomi: "ケイ", kunyomi: "はか・る", meaning: "measure; plan; calculate", strokes: 9, examples: ["計画", "合計", "時計"], examplesEn: ["plan", "total", "clock/watch"], level: "N4" },
  { id: "k025", character: "決", onyomi: "ケツ", kunyomi: "き・める", meaning: "decide; determine", strokes: 7, examples: ["決める", "解決", "決定"], examplesEn: ["to decide", "solution", "decision"], level: "N4" },
  { id: "k026", character: "建", onyomi: "ケン・コン", kunyomi: "た・てる", meaning: "build; establish", strokes: 9, examples: ["建物", "建設", "建築"], examplesEn: ["building", "construction", "architecture"], level: "N4" },
  { id: "k027", character: "研", onyomi: "ケン", kunyomi: "と・ぐ", meaning: "polish; study; research", strokes: 9, examples: ["研究", "研修", "研究所"], examplesEn: ["research", "training", "research institute"], level: "N4" },
  { id: "k028", character: "言", onyomi: "ゲン・ゴン", kunyomi: "い・う", meaning: "say; word; speech", strokes: 7, examples: ["言語", "言葉", "発言"], examplesEn: ["language", "word/language", "statement"], level: "N4" },
  { id: "k029", character: "考", onyomi: "コウ", kunyomi: "かんが・える", meaning: "think; consider", strokes: 6, examples: ["考える", "考え方", "考察"], examplesEn: ["to think", "way of thinking", "consideration"], level: "N4" },
  { id: "k030", character: "合", onyomi: "ゴウ・ガッ・カッ", kunyomi: "あ・う", meaning: "fit; join; combine", strokes: 6, examples: ["合う", "合計", "場合"], examplesEn: ["to fit/match", "total", "case/situation"], level: "N4" },
  { id: "k031", character: "国", onyomi: "コク", kunyomi: "くに", meaning: "country; nation", strokes: 8, examples: ["国際", "外国", "国内"], examplesEn: ["international", "foreign country", "domestic"], level: "N4" },
  { id: "k032", character: "際", onyomi: "サイ", kunyomi: "きわ", meaning: "occasion; side; edge; international", strokes: 14, examples: ["国際", "実際", "際立つ"], examplesEn: ["international", "actually", "to stand out"], level: "N3" },
  { id: "k033", character: "産", onyomi: "サン", kunyomi: "う・む", meaning: "produce; birth; property", strokes: 11, examples: ["生産", "産業", "出産"], examplesEn: ["production", "industry", "childbirth"], level: "N3" },
  { id: "k034", character: "試", onyomi: "シ", kunyomi: "こころ・みる", meaning: "try; test; exam", strokes: 13, examples: ["試験", "試合", "試みる"], examplesEn: ["exam", "match/game", "to try"], level: "N4" },
  { id: "k035", character: "事", onyomi: "ジ・ズ", kunyomi: "こと", meaning: "thing; matter; fact", strokes: 8, examples: ["仕事", "大事", "事故"], examplesEn: ["work/job", "important", "accident"], level: "N4" },
  { id: "k036", character: "社", onyomi: "シャ", kunyomi: "やしろ", meaning: "company; society; shrine", strokes: 7, examples: ["会社", "社会", "社員"], examplesEn: ["company", "society", "employee"], level: "N4" },
  { id: "k037", character: "種", onyomi: "シュ", kunyomi: "たね", meaning: "kind; type; seed", strokes: 14, examples: ["種類", "人種", "各種"], examplesEn: ["type/kind", "race (ethnicity)", "various kinds"], level: "N3" },
  { id: "k038", character: "集", onyomi: "シュウ", kunyomi: "あつ・める", meaning: "collect; gather; assemble", strokes: 12, examples: ["集める", "集合", "収集"], examplesEn: ["to collect", "gathering", "collection"], level: "N4" },
  { id: "k039", character: "習", onyomi: "シュウ", kunyomi: "なら・う", meaning: "learn; practice; custom", strokes: 11, examples: ["習慣", "練習", "学習"], examplesEn: ["habit/custom", "practice", "learning"], level: "N4" },
  { id: "k040", character: "重", onyomi: "ジュウ・チョウ", kunyomi: "おも・い", meaning: "heavy; important; overlap", strokes: 9, examples: ["重要", "重い", "二重"], examplesEn: ["important", "heavy", "double"], level: "N4" },
  { id: "k041", character: "場", onyomi: "ジョウ", kunyomi: "ば", meaning: "place; scene; occasion", strokes: 12, examples: ["場合", "場所", "立場"], examplesEn: ["case/situation", "place", "standpoint"], level: "N4" },
  { id: "k042", character: "職", onyomi: "ショク", kunyomi: "—", meaning: "employment; occupation", strokes: 18, examples: ["就職", "職場", "職業"], examplesEn: ["employment", "workplace", "occupation"], level: "N3" },
  { id: "k043", character: "信", onyomi: "シン", kunyomi: "—", meaning: "faith; trust; message", strokes: 9, examples: ["信じる", "信頼", "自信"], examplesEn: ["to believe", "trust/reliance", "self-confidence"], level: "N3" },
  { id: "k044", character: "進", onyomi: "シン", kunyomi: "すす・む", meaning: "advance; progress", strokes: 11, examples: ["進む", "進学", "前進"], examplesEn: ["to advance", "going to school", "progress"], level: "N4" },
  { id: "k045", character: "世", onyomi: "セイ・セ", kunyomi: "よ", meaning: "world; era; generation", strokes: 5, examples: ["世界", "世紀", "世代"], examplesEn: ["world", "century", "generation"], level: "N4" },
  { id: "k046", character: "政", onyomi: "セイ・ショウ", kunyomi: "まつりごと", meaning: "government; politics", strokes: 9, examples: ["政治", "政府", "行政"], examplesEn: ["politics", "government", "administration"], level: "N3" },
  { id: "k047", character: "制", onyomi: "セイ", kunyomi: "—", meaning: "system; control; regulate", strokes: 8, examples: ["制度", "制限", "体制"], examplesEn: ["system", "restriction", "system/regime"], level: "N3" },
  { id: "k048", character: "責", onyomi: "セキ", kunyomi: "せ・める", meaning: "responsibility; blame", strokes: 11, examples: ["責任", "責める", "無責任"], examplesEn: ["responsibility", "to blame", "irresponsible"], level: "N3" },
  { id: "k049", character: "増", onyomi: "ゾウ", kunyomi: "ふ・える", meaning: "increase; add", strokes: 14, examples: ["増える", "増加", "急増"], examplesEn: ["to increase", "increase", "rapid increase"], level: "N3" },
  { id: "k050", character: "対", onyomi: "タイ・ツイ", kunyomi: "—", meaning: "versus; against; opposite", strokes: 7, examples: ["対話", "反対", "対策"], examplesEn: ["dialogue", "opposition", "countermeasure"], level: "N4" },
  { id: "k051", character: "達", onyomi: "タツ・ダ", kunyomi: "—", meaning: "reach; accomplish; plural", strokes: 12, examples: ["友達", "達成", "発達"], examplesEn: ["friend", "achievement", "development"], level: "N4" },
  { id: "k052", character: "地", onyomi: "チ・ジ", kunyomi: "—", meaning: "earth; ground; place", strokes: 6, examples: ["地球", "地域", "土地"], examplesEn: ["earth/globe", "area/region", "land"], level: "N4" },
  { id: "k053", character: "注", onyomi: "チュウ", kunyomi: "そそ・ぐ", meaning: "pour; concentrate; annotate", strokes: 8, examples: ["注意", "注文", "注目"], examplesEn: ["caution", "order", "attention"], level: "N4" },
  { id: "k054", character: "的", onyomi: "テキ", kunyomi: "まと", meaning: "-like; target; -ness", strokes: 8, examples: ["的確", "目的", "精神的"], examplesEn: ["accurate", "purpose", "mental/psychological"], level: "N4" },
  { id: "k055", character: "転", onyomi: "テン", kunyomi: "ころ・ぶ", meaning: "roll; turn; change", strokes: 11, examples: ["運転", "転職", "転換"], examplesEn: ["driving", "job change", "conversion"], level: "N4" },
  { id: "k056", character: "伝", onyomi: "デン", kunyomi: "つた・える", meaning: "transmit; legend; tradition", strokes: 6, examples: ["伝統", "伝える", "伝言"], examplesEn: ["tradition", "to convey", "message"], level: "N4" },
  { id: "k057", character: "度", onyomi: "ド・ト・タク", kunyomi: "たび", meaning: "degree; time (occurrence); limit", strokes: 9, examples: ["制度", "温度", "程度"], examplesEn: ["system", "temperature", "degree/extent"], level: "N4" },
  { id: "k058", character: "働", onyomi: "ドウ", kunyomi: "はたら・く", meaning: "work; labor", strokes: 13, examples: ["働く", "労働", "働き方"], examplesEn: ["to work", "labor", "work style"], level: "N4" },
  { id: "k059", character: "特", onyomi: "トク", kunyomi: "—", meaning: "special; particular", strokes: 10, examples: ["特別", "特徴", "特に"], examplesEn: ["special", "characteristic", "especially"], level: "N4" },
  { id: "k060", character: "内", onyomi: "ナイ・ダイ", kunyomi: "うち", meaning: "inside; within; home", strokes: 4, examples: ["国内", "内容", "以内"], examplesEn: ["domestic", "content", "within"], level: "N4" },
  { id: "k061", character: "認", onyomi: "ニン", kunyomi: "みと・める", meaning: "recognize; acknowledge", strokes: 14, examples: ["認める", "確認", "承認"], examplesEn: ["to recognize", "confirmation", "approval"], level: "N3" },
  { id: "k062", character: "発", onyomi: "ハツ・ホツ", kunyomi: "—", meaning: "depart; emit; start; develop", strokes: 9, examples: ["発展", "発言", "出発"], examplesEn: ["development", "statement", "departure"], level: "N4" },
  { id: "k063", character: "比", onyomi: "ヒ", kunyomi: "くら・べる", meaning: "compare; ratio", strokes: 4, examples: ["比較", "比べる", "対比"], examplesEn: ["comparison", "to compare", "contrast"], level: "N3" },
  { id: "k064", character: "表", onyomi: "ヒョウ", kunyomi: "おもて・あらわ・す", meaning: "surface; express; represent", strokes: 8, examples: ["表現", "発表", "代表"], examplesEn: ["expression", "announcement", "representative"], level: "N4" },
  { id: "k065", character: "不", onyomi: "フ・ブ", kunyomi: "—", meaning: "not; un-; negative prefix", strokes: 4, examples: ["不安", "不満", "不可能"], examplesEn: ["anxiety/unease", "dissatisfaction", "impossible"], level: "N4" },
  { id: "k066", character: "文", onyomi: "ブン・モン", kunyomi: "ふみ", meaning: "sentence; writing; literature", strokes: 4, examples: ["文化", "文章", "作文"], examplesEn: ["culture", "sentence/text", "composition"], level: "N4" },
  { id: "k067", character: "変", onyomi: "ヘン", kunyomi: "か・わる", meaning: "change; strange; unusual", strokes: 9, examples: ["変化", "変わる", "大変"], examplesEn: ["change", "to change", "very/terrible"], level: "N4" },
  { id: "k068", character: "保", onyomi: "ホ", kunyomi: "たも・つ", meaning: "protect; maintain; guarantee", strokes: 9, examples: ["保護", "確保", "保存"], examplesEn: ["protection", "securing/ensuring", "preservation"], level: "N3" },
  { id: "k069", character: "望", onyomi: "ボウ・モウ", kunyomi: "のぞ・む", meaning: "hope; wish; expect", strokes: 11, examples: ["希望", "望む", "絶望"], examplesEn: ["hope", "to hope/wish", "despair"], level: "N3" },
  { id: "k070", character: "民", onyomi: "ミン", kunyomi: "たみ", meaning: "people; nation; citizen", strokes: 5, examples: ["国民", "移民", "市民"], examplesEn: ["citizens", "immigrant", "citizen"], level: "N3" },
  { id: "k071", character: "有", onyomi: "ユウ・ウ", kunyomi: "あ・る", meaning: "exist; have; possess", strokes: 6, examples: ["有名", "所有", "有効"], examplesEn: ["famous", "possession", "effective"], level: "N4" },
  { id: "k072", character: "要", onyomi: "ヨウ", kunyomi: "い・る", meaning: "need; essential; main point", strokes: 9, examples: ["重要", "必要", "要求"], examplesEn: ["important", "necessary", "demand"], level: "N4" },
  { id: "k073", character: "利", onyomi: "リ", kunyomi: "き・く", meaning: "advantage; profit; useful", strokes: 7, examples: ["利用", "便利", "利益"], examplesEn: ["use/utilization", "convenient", "profit/benefit"], level: "N4" },
  { id: "k074", character: "力", onyomi: "リョク・リキ", kunyomi: "ちから", meaning: "power; strength; ability", strokes: 2, examples: ["努力", "能力", "体力"], examplesEn: ["effort", "ability", "physical strength"], level: "N4" },
  { id: "k075", character: "連", onyomi: "レン", kunyomi: "つら・なる", meaning: "connect; link; series", strokes: 10, examples: ["関連", "連絡", "連続"], examplesEn: ["connection", "contact", "continuation"], level: "N3" },
  { id: "k076", character: "境", onyomi: "キョウ・ケイ", kunyomi: "さかい", meaning: "boundary; border; environment", strokes: 14, examples: ["環境", "国境", "境界"], examplesEn: ["environment", "national border", "boundary"], level: "N3" },
  { id: "k077", character: "争", onyomi: "ソウ", kunyomi: "あらそ・う", meaning: "contend; dispute; fight", strokes: 6, examples: ["競争", "戦争", "争う"], examplesEn: ["competition", "war", "to compete"], level: "N3" },
  { id: "k078", character: "活", onyomi: "カツ", kunyomi: "—", meaning: "lively; activity; live", strokes: 9, examples: ["活動", "生活", "活躍"], examplesEn: ["activity", "daily life", "active role"], level: "N4" },
  { id: "k079", character: "互", onyomi: "ゴ", kunyomi: "たが・い", meaning: "mutual; reciprocal", strokes: 4, examples: ["互いに", "相互", "互助"], examplesEn: ["each other", "mutual", "mutual aid"], level: "N3" },
  { id: "k080", character: "率", onyomi: "ソツ・リツ", kunyomi: "ひき・いる", meaning: "rate; ratio; lead", strokes: 11, examples: ["効率", "確率", "出生率"], examplesEn: ["efficiency", "probability", "birth rate"], level: "N3" },
];

// Spaced repetition: SM-2 simplified
// Each word has: easeFactor, interval, nextReview, correct, incorrect
function createInitialProgress(id) {
  return {
    id,
    easeFactor: 2.5,
    interval: 0,
    nextReview: Date.now(),
    correct: 0,
    incorrect: 0,
    lastSeen: null,
  };
}

function updateSM2(progress, quality) {
  // quality: 0-5 (0-2 = fail, 3-5 = pass)
  const p = { ...progress };
  if (quality >= 3) {
    if (p.interval === 0) p.interval = 1;
    else if (p.interval === 1) p.interval = 6;
    else p.interval = Math.round(p.interval * p.easeFactor);
    p.easeFactor = Math.max(1.3, p.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    p.correct++;
  } else {
    p.interval = 0;
    p.incorrect++;
  }
  p.nextReview = Date.now() + p.interval * 24 * 60 * 60 * 1000;
  p.lastSeen = Date.now();
  return p;
}
