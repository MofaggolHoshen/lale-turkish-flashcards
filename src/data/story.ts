export interface Story {
  title: string;
  turkish: string;
  english: string;
  words: string;
}

export const stories: Story[] = [
  {
    title: "1. Benim Ailem / My Family",
    turkish:
      "Benim adım Ayşe. Babam ve annem büyük bir evde yaşıyor. Evimizin bahçesinde bir ağaç var. Bahçede küçük bir çocuk oynuyor, o benim kız kardeşim. Evde bir bebek var, o çok güzel. Bir kedimiz var ama evde bir fare de var! Salonda bir koltuk ve iki sandalye var. Halı çok temiz.",
    english:
      "My name (is) Ayşe. My father and my mother live in a big house. In our house's garden there is a tree. In the garden a small child is playing, she is my sister. At home there is a baby, she is very beautiful. We have a cat, but there is also a mouse at home! In the living room there is one armchair and two chairs. The carpet (is) very clean.",
    words:
      "ad = name · baba = father · ev = house · bahçe = garden · ağaç = tree · çocuk = child · kız = girl/daughter · bebek = baby · kedi = cat · fare = mouse · salon = living room · koltuk = armchair · sandalye = chair · halı = carpet · büyük = big · temiz = clean",
  },
  {
    title: "2. Kafede / At the Café",
    turkish:
      "Ben ve arkadaşım bir kafeye gidiyoruz. Ben çay içiyorum, o kahve içiyor. Garson bize iki bardak su getiriyor. Masada bir şişe su var. Ben ekmek ve elma yiyorum. O üzüm ve ceviz yiyor. Kafede çok kalabalık var.",
    english:
      "My friend and I are going to a café. I am drinking tea, he/she is drinking coffee. The waiter brings us two glasses of water. On the table there is a bottle of water. I am eating bread and an apple. He/she is eating grapes and walnuts. In the café there is a lot of crowd (it's very crowded).",
    words:
      "arkadaş = friend · kafe = café · çay = tea · kahve = coffee · garson = waiter · bardak = glass/cup · şişe = bottle · ekmek = bread · elma = apple · üzüm = grape · ceviz = walnut · kalabalık = crowd, crowded",
  },
  {
    title: "3. Markette / At the Market",
    turkish:
      "Annem çarşıya gidiyor. O balık, tavuk, havuç ve ıspanak alıyor. Zeytin de alıyor, çünkü babam zeytin seviyor. Eve dönünce ızgara tavuk yapıyor. Yemekten sonra bulaşık yıkıyoruz ve çamaşır yıkıyoruz. Çok iş var ama hiç sorun değil.",
    english:
      "My mother is going to the market/bazaar. She is buying fish, chicken, carrot, and spinach. She is also buying olives, because my father loves olives. When she returns home, she makes grilled chicken. After the meal we wash the dishes and wash the laundry. There is a lot of work, but it's no problem at all.",
    words:
      "çarşı = market/bazaar · balık = fish · tavuk = chicken · havuç = carrot · ıspanak = spinach · zeytin = olive · ızgara = grill/grilled · bulaşık = (dirty) dishes · çamaşır = laundry · iş = work/job · hiç = at all/never · sorun = problem",
  },
  {
    title: "4. Doktor ve Hastane / The Doctor and Health",
    turkish:
      "Doktor ve hemşire hastanede çalışıyor. Bir kadının kalbi ağrıyor, bir erkeğin gözü ağrıyor. Bu bir hastalık. Doktor onlara ilaç yazıyor, sonra eczaneye gidiyorlar. Bir avukat da orada, çünkü onun işi var — o bürosundan geliyor. Saçları ıslak, çünkü dışarıda yağmur var.",
    english:
      "The doctor and the nurse work at the hospital. A woman's heart hurts, a man's eye hurts. This is an illness. The doctor writes them medicine, then they go to the pharmacy. A lawyer is also there, because he has work — he is coming from his office. His hair is wet, because it is raining outside.",
    words:
      "doktor = doctor · hemşire = nurse · kadın = woman · kalp = heart · erkek = man · göz = eye · hastalık = illness · eczane = pharmacy · avukat = lawyer · büro = office · saç = hair",
  },
  {
    title: "5. Okulda / At School",
    turkish:
      "Sınıfta defter, kalem, silgi, cetvel ve sözlük var. Öğretmen bir soru soruyor, ama bu soru zor, bir sorun var! Çocuklar kitap okuyor. Ders çok uzun ama güzel. Sınıfta çok az çocuk var, çok kalabalık değil.",
    english:
      "In the classroom there is a notebook, a pencil, an eraser, a ruler, and a dictionary. The teacher asks a question, but this question is hard, there's a problem! The children are reading a book. The lesson is very long but nice. In the classroom there are very few children, it's not very crowded.",
    words:
      "defter = notebook · kalem = pen/pencil · silgi = eraser · cetvel = ruler · sözlük = dictionary · soru = question · kitap = book · ders = lesson/class · güzel = beautiful/nice · az = few/little",
  },
  {
    title: "6. Bayram ve Düğün / Holidays and Weddings",
    turkish:
      "Bugün bayram! Anneler günü için anneme çiçek ve bir gül alıyorum. Yarın bir düğün var. Gelin beyaz elbise giyiyor ve bir yüzük takıyor. Bir şarkıcı şarkı söylüyor. Dün benim doğum günümdü.",
    english:
      "Today (is) a holiday! For Mother's Day I am buying flowers and a rose for my mother. Tomorrow there is a wedding. The bride wears a white dress and puts on a ring. A singer sings a song. Yesterday was my birthday.",
    words:
      "bayram = holiday · anneler günü = Mother's Day · çiçek = flower · gül = rose · düğün = wedding · elbise = dress · yüzük = ring · şarkıcı = singer · doğum günü = birthday",
  },
  {
    title: "7. Seyahat / Travel",
    turkish:
      "Ben bir turistim ve seyahat etmeyi seviyorum. Türkiye, Almanya, Avusturya, Fransa, İngiltere, İspanya, İtalya, Japonya, Çin ve Suriye'ye gitmek istiyorum. Uçak bileti alıyorum ve havaalanına gidiyorum. Trende bir vagonda oturuyorum. Her ülkede farklı insanlar ve farklı kişiler var; ben orada yabancıyım.",
    english:
      "I am a tourist and I love to travel. I want to go to Turkey, Germany, Austria, France, England, Spain, Italy, Japan, China, and Syria. I am buying a plane ticket and going to the airport. On the train I am sitting in a train car. In every country there are different people and different persons; I am a foreigner there.",
    words:
      "turist = tourist · seyahat = travel/trip · Türkiye = Turkey · Almanya = Germany · Avusturya = Austria · Fransa = France · İngiltere = England · İspanya = Spain · İtalya = Italy · Japonya = Japan · Çin = China · Suriye = Syria · uçak = airplane · bilet = ticket · vagon = train car · insan = human/person · kişi = person · yabancı = foreigner",
  },
  {
    title: "8. Sokakta / On the Street",
    turkish:
      "Sokakta bir cami var, yanında bir banka var. Arabamı sokakta park ediyorum. Bay Ahmet ve Bayan Ela sokakta yürüyor. Hanım ve Bey çok temiz giyiniyor. Hava yağmurlu, bu yüzden bir şemsiyem var. Çantamda telefonum ve bilgisayarım var.",
    english:
      "On the street there is a mosque, next to it there is a bank. I park my car on the street. Mr. Ahmet and Ms. Ela are walking on the street. The lady and the gentleman are dressed very neatly. It's rainy, that's why I have an umbrella. In my bag I have my phone and my computer.",
    words:
      "sokak = street · cami = mosque · banka = bank · araba = car · bay = Mr. · bayan = Ms./Mrs. · hanım = lady/madam · bey = sir/gentleman · şemsiye = umbrella · çanta = bag · telefon = phone · bilgisayar = computer",
  },
  {
    title: "9. Parkta / At the Park",
    turkish:
      "Çocuklar parkta top oynuyor ve bir uçurtma uçuruyor. Gökyüzünde yıldızlar var, gece oluyor. Yakında bir çiftlik var: orada bir inek var. Bir zürafa da varmış gibi düşünüyorum ama bu benim hayalim! Bir futbolcu parkta koşuyor. Deniz çok yakın, oyun makinesi bir jetonla çalışıyor.",
    english:
      "The children are playing ball in the park and flying a kite. There are stars in the sky, it's becoming night. Nearby there is a farm: there is a cow there. I imagine there's also a giraffe, but that is my imagination! A football player is running in the park. The sea is very close, the game machine works with one token.",
    words:
      "top = ball · uçurtma = kite · yıldız = star · inek = cow · zürafa = giraffe · hayal = imagination/dream · futbolcu = football player · deniz = sea · jeton = token",
  },
  {
    title: "10. Ev İşleri / House Things & Odds and Ends",
    turkish:
      "Evde bir vazo var, içinde çiçek var. Tahta masa çok yeni. Dolapta bir jilet ve biraz alkol var. Bu yıl her şey çok ideal geçti. Hiç sorun yoktu, her şey sembolik olarak güzeldi. Bu hâlde, hayat çok güzel!",
    english:
      "At home there is a vase, inside it there are flowers. The wooden table is very new. In the cabinet there is a razor and some alcohol. This year everything went very ideally. There was no problem at all, everything was symbolically nice. In this state/condition, life is very beautiful!",
    words:
      "vazo = vase · tahta = wood/wooden · yeni = new · dolap = cabinet/closet · jilet = razor · alkol = alcohol · yıl = year · ideal = ideal · sembol = symbol · hâl = state/condition",
  },
];
