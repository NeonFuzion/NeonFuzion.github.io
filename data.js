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
