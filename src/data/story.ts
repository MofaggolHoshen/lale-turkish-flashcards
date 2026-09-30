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
  {
    title: "V-1. Sabah Rutini / Morning Routine",
    turkish:
      "Sabah saat yedide kalkıyorum. Önce banyo yapıyorum, sonra kısa bir duş alıyorum. Annem kahvaltıyı hazırlıyor. Kardeşim ve ben birlikte kahvaltı ediyoruz. Sonra işe gitmek için hazırlanıyorum.",
    english:
      "I get up at seven in the morning. First I take a bath, then I take a short shower. My mother prepares the breakfast. My brother and I have breakfast together. Then I get ready to go to work.",
    words:
      "kalkmak = to get up · banyo yapmak = to take a bath · duş almak = to take a shower · hazırlamak = to prepare · kahvaltı etmek = to have breakfast · hazırlanmak = to get ready",
  },
  {
    title: "V-2. Mutfakta / In the Kitchen",
    turkish:
      "Mutfağı temizliyorum çünkü akşam misafirlerimiz var. Annem güzel bir yemek pişiriyor. Ben buzdolabını açıyorum ve sebzeleri masaya koyuyorum. Mikseri kullanıyorum. Misafirler gelince hep birlikte yemek yiyoruz.",
    english:
      "I am cleaning the kitchen because we have guests this evening. My mother is cooking a nice meal. I open the fridge and put the vegetables on the table. I use the mixer. When the guests arrive, we all eat together.",
    words:
      "temizlemek = to clean · pişirmek = to cook · açmak = to open · koymak = to put · kullanmak = to use · yemek = to eat",
  },
  {
    title: "V-3. Okulda / At School",
    turkish:
      "Okulda her gün Türkçe kitap okuyorum. Öğretmen tahtaya yazıyor, ben defterime yazıyorum. Yeni kelimeler öğreniyorum. Bir şeyi anlamıyorsam öğretmene soruyorum. Akşam evde kelimeleri tekrar ediyorum.",
    english:
      "At school I read a Turkish book every day. The teacher writes on the board, and I write in my notebook. I learn new words. If I don't understand something, I ask the teacher. In the evening at home I repeat the words.",
    words:
      "okumak = to read · yazmak = to write · öğrenmek = to learn · anlamak = to understand · sormak = to ask · tekrar etmek = to repeat",
  },
  {
    title: "V-4. İş Yerinde / At the Workplace",
    turkish:
      "Dokuzda işe başlıyorum. Bütün gün bilgisayarda çalışıyorum. Raporlarımı kontrol ediyorum. Bir sorun olursa arkadaşımdan yardım istiyorum. O da bana hemen cevap veriyor. Akşam altıda iş bitiyor.",
    english:
      "I start work at nine. I work on the computer all day. I check my reports. If there is a problem, I ask my friend for help. He gives me an answer right away. Work ends at six in the evening.",
    words:
      "başlamak = to start · çalışmak = to work · kontrol etmek = to check · yardım istemek = to ask for help · vermek = to give · bitmek = to end",
  },
  {
    title: "V-5. Şehirde / In the City",
    turkish:
      "Otobüse biniyorum ve şehir merkezine gidiyorum. Otobüs köprüden geçiyor. Durakta duruyor, ben iner inmez biraz yürüyorum. Yaklaşık on dakika sonra müzeye varıyorum.",
    english:
      "I get on the bus and go to the city center. The bus passes over the bridge. It stops at the bus stop, and as soon as I get off I walk a little. After about ten minutes I arrive at the museum.",
    words:
      "binmek = to get on · gitmek = to go · geçmek = to pass · durmak = to stop · yürümek = to walk · varmak = to arrive",
  },
  {
    title: "V-6. Parkta / At the Park",
    turkish:
      "Hafta sonu parka gidiyorum. Sabah koşuyorum ve arkadaşlarımla futbol oynuyorum. Spor yapmak stres atmak için çok iyi. Sonra ağacın altında dinleniyorum. Çimenin üstüne uzanıyorum ve gökyüzüne bakıyorum.",
    english:
      "On the weekend I go to the park. In the morning I run and play football with my friends. Exercising is very good for relieving stress. Then I rest under the tree. I lie down on the grass and look at the sky.",
    words:
      "koşmak = to run · oynamak = to play · spor yapmak = to do sports · stres atmak = to relieve stress · dinlenmek = to rest · uzanmak = to lie down",
  },
  {
    title: "V-7. Arkadaşlarla / With Friends",
    turkish:
      "Cumartesi günü kafede arkadaşlarımla buluşuyoruz. Yeni bir arkadaşla tanışıyorum, adı Can. Uzun uzun sohbet ediyoruz. Can çok güzel konuşuyor, ben de onu dikkatle dinliyorum. Ona 'Çok teşekkürler!' diyorum. Sonra ona telefon numaramı söylüyorum.",
    english:
      "On Saturday we meet my friends at the café. I meet a new friend, his name is Can. We chat for a long time. Can speaks very nicely, and I listen to him carefully. I say to him, 'Thank you very much!' Then I tell him my phone number.",
    words:
      "buluşmak = to meet · tanışmak = to meet (for the first time) · sohbet etmek = to chat · konuşmak = to speak · dinlemek = to listen · demek = to say · söylemek = to tell",
  },
  {
    title: "V-8. Tatilde / On Vacation",
    turkish:
      "Yazın İzmir'e tatile gidiyoruz. Şehri geziyoruz ve sokaklarda dolaşıyoruz. Her yerde fotoğraf çekiyorum. Denizde yüzüyoruz. Küçük bir otelde kalıyoruz. Bir hafta sonra evimize dönüyoruz.",
    english:
      "In the summer we go on vacation to İzmir. We tour the city and wander through the streets. I take photos everywhere. We swim in the sea. We stay in a small hotel. After a week we return to our home.",
    words:
      "gezmek = to travel / to stroll · dolaşmak = to wander · fotoğraf çekmek = to take a photo · yüzmek = to swim · kalmak = to stay · dönmek = to return",
  },
  {
    title: "V-9. Dağda / In the Mountains",
    turkish:
      "Kardeşim ve ben dağa tırmanıyoruz. Yolun başında biraz korkuyorum ama zirveye çıkıyoruz. Çok yoruluyorum. Manzaraya bayılıyorum! Orada ailemi özlüyorum ve onlara fotoğraf gönderiyorum.",
    english:
      "My brother and I climb the mountain. At the start of the path I am a little afraid, but we reach the summit. I get very tired. I love the view! There I miss my family and send them a photo.",
    words:
      "tırmanmak = to climb · korkmak = to be afraid · çıkmak = to go out / to climb · yorulmak = to get tired · bayılmak = to love intensely · özlemek = to miss",
  },
  {
    title: "V-10. Akşam Evde / Evening at Home",
    turkish:
      "Akşam evde film izliyorum. Bazen televizyona bakıyorum ama çok sıkılıyorum. Komedi filmlerinden hoşlanıyorum. Korku filmlerinden nefret ediyorum. Ama ailemi çok seviyorum, o yüzden hep birlikte izliyoruz.",
    english:
      "In the evening I watch a movie at home. Sometimes I look at the television but I get very bored. I like comedy films. I hate horror films. But I love my family very much, so we always watch together.",
    words:
      "izlemek = to watch · bakmak = to look · sıkılmak = to get bored · hoşlanmak = to like · nefret etmek = to hate · sevmek = to love",
  },
  {
    title: "V-11. Bankada / At the Bank",
    turkish:
      "Bankaya giriyorum ve bankamatikten para çekiyorum. Her ay biraz para biriktiriyorum çünkü yeni bir telefon almak istiyorum. Bankadaki görevliyi tanıyorum, adı Ayşe. Bir sorum var, ama cevabı bilmiyorum. Ayşe'yi arıyorum ve soruyorum.",
    english:
      "I enter the bank and withdraw money from the ATM. Every month I save a little money because I want to buy a new phone. I know the bank clerk, her name is Ayşe. I have a question, but I don't know the answer. I call Ayşe and ask.",
    words:
      "girmek = to enter · para çekmek = to withdraw money · biriktirmek = to save · tanımak = to know (a person) · bilmek = to know · aramak = to search / to call",
  },
  {
    title: "V-12. Gece / At Night",
    turkish:
      "Akşam sağlıklı yemek yiyorum, çünkü iyi beslenmek önemli. Ödevimi yapıyorum. Koltukta oturuyorum ve kitap okuyorum. Saat on bir gibi yatıyorum. Yarın erken kalkacağımı sanıyorum. Mutlu yaşamak için iyi uyumak gerekiyor.",
    english:
      "In the evening I eat healthy food, because it is important to eat well. I do my homework. I sit on the sofa and read a book. I go to bed around eleven. I suppose I will get up early tomorrow. To live happily, it is necessary to sleep well.",
    words:
      "beslenmek = to feed / to be nourished · yemek = to eat · yapmak = to do / to make · oturmak = to sit · yatmak = to go to bed · sanmak = to think / to suppose · yaşamak = to live · uyumak = to sleep",
  },
];
