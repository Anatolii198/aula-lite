/* ==========================================================================
   Aula Lite — everything the school teaches: courses, modules, lessons.

   This is the main content file. Titles live right here, in all three
   languages, so you can change the programme without opening the translation
   file:

       { en: 'Light', pl: 'Światło', uk: 'Світло' }

   Remove a language from LANGS in js/i18n.js and the extra lines here simply
   stop being used — you do not have to delete them.

   Course fields:
     id        — short, latin letters; it goes into the address:
                 course.html?id=basics
     level     — 'start' | 'mid' | 'pro', shown as a label on the card
     topic     — 'tech' | 'people' | 'post', the second label
     price     — a plain number, no currency: the page adds it from
                 js/config.js
     old       — the previous price if you show a discount; 0 hides it
     img       — the cover in img/
     modules   — the programme; lesson minutes add themselves up

   Course length, lesson count and every progress percentage are written down
   NOWHERE: they are all counted from this list. Add a lesson and the numbers
   across the site update themselves.
   ========================================================================== */

const COURSES = [
  {
    id: 'basics',
    level: 'start',
    topic: 'tech',
    price: 890,
    old: 1190,
    img: 'img/c-basics.jpg',
    title: { en: 'Camera basics', pl: 'Podstawy aparatu', uk: 'Основи камери' },
    short: {
      en: 'Stop shooting on auto. Aperture, shutter, ISO — and why they argue with each other.',
      pl: 'Koniec z trybem auto. Przysłona, czas, ISO — i dlaczego się kłócą.',
      uk: 'Досить знімати на авто. Діафрагма, витримка, ISO — і чому вони сперечаються.'
    },
    about: {
      en: 'Six weeks to the moment when you stop turning the dial at random. '
        + 'We take one setting at a time, shoot it wrong on purpose, and look at what broke.',
      pl: 'Sześć tygodni do chwili, gdy przestajesz kręcić pokrętłem na ślepo. '
        + 'Bierzemy po jednym ustawieniu, psujemy je celowo i patrzymy, co się stało.',
      uk: 'Шість тижнів до моменту, коли ви перестаєте крутити коліщатко навмання. '
        + 'Беремо по одному параметру, псуємо кадр навмисно й дивимось, що зламалось.'
    },
    modules: [
      {
        title: { en: 'How a camera sees', pl: 'Jak widzi aparat', uk: 'Як бачить камера' },
        lessons: [
          { id: 'basics-1-1', min: 14, t: { en: 'Exposure in one picture', pl: 'Ekspozycja na jednym zdjęciu', uk: 'Експозиція на одному знімку' } },
          { id: 'basics-1-2', min: 18, t: { en: 'Aperture and what blurs', pl: 'Przysłona i co się rozmywa', uk: 'Діафрагма і що розмивається' } },
          { id: 'basics-1-3', min: 16, t: { en: 'Shutter speed and movement', pl: 'Czas i ruch', uk: 'Витримка і рух' } }
        ]
      },
      {
        title: { en: 'Noise and light', pl: 'Szum i światło', uk: 'Шум і світло' },
        lessons: [
          { id: 'basics-2-1', min: 12, t: { en: 'ISO without fear', pl: 'ISO bez strachu', uk: 'ISO без страху' } },
          { id: 'basics-2-2', min: 21, t: { en: 'White balance', pl: 'Balans bieli', uk: 'Баланс білого' } },
          { id: 'basics-2-3', min: 17, t: { en: 'Reading the histogram', pl: 'Czytanie histogramu', uk: 'Читаємо гістограму' } }
        ]
      }
    ]
  },

  {
    id: 'portrait',
    level: 'mid',
    topic: 'people',
    price: 1290,
    old: 0,
    img: 'img/c-portrait.jpg',
    title: { en: 'Portrait', pl: 'Portret', uk: 'Портрет' },
    short: {
      en: 'A person in front of the lens is not an object. How to talk, where to stand, what to say.',
      pl: 'Człowiek przed obiektywem to nie przedmiot. Jak rozmawiać, gdzie stanąć, co mówić.',
      uk: 'Людина перед об’єктивом — не предмет. Як говорити, де стати, що казати.'
    },
    about: {
      en: 'The technical part of a portrait takes one evening. The rest is the hour '
        + 'you spend with a stranger who is uncomfortable being looked at.',
      pl: 'Technika portretu to jeden wieczór. Reszta to godzina z obcą osobą, '
        + 'której jest niewygodnie, gdy się na nią patrzy.',
      uk: 'Технічна частина портрета — один вечір. Решта — година з незнайомою людиною, '
        + 'якій незручно, коли на неї дивляться.'
    },
    modules: [
      {
        title: { en: 'Before the shutter', pl: 'Zanim naciśniesz', uk: 'До натискання' },
        lessons: [
          { id: 'portrait-1-1', min: 16, t: { en: 'The first five minutes', pl: 'Pierwsze pięć minut', uk: 'Перші п’ять хвилин' } },
          { id: 'portrait-1-2', min: 22, t: { en: 'Posing without posing', pl: 'Pozowanie bez pozowania', uk: 'Пози без позування' } },
          { id: 'portrait-1-3', min: 14, t: { en: 'Hands, chin, shoulders', pl: 'Dłonie, broda, ramiona', uk: 'Руки, підборіддя, плечі' } }
        ]
      },
      {
        title: { en: 'Light on a face', pl: 'Światło na twarzy', uk: 'Світло на обличчі' },
        lessons: [
          { id: 'portrait-2-1', min: 20, t: { en: 'Window light', pl: 'Światło z okna', uk: 'Світло з вікна' } },
          { id: 'portrait-2-2', min: 18, t: { en: 'Shadow as a tool', pl: 'Cień jako narzędzie', uk: 'Тінь як інструмент' } },
          { id: 'portrait-2-3', min: 25, t: { en: 'Backlight and haze', pl: 'Pod światło', uk: 'Проти світла' } }
        ]
      }
    ]
  },

  {
    id: 'light',
    level: 'pro',
    topic: 'tech',
    price: 1690,
    old: 0,
    img: 'img/c-light.jpg',
    title: { en: 'Studio light', pl: 'Światło studyjne', uk: 'Студійне світло' },
    short: {
      en: 'One source, one reflector, full control. Studio without a studio budget.',
      pl: 'Jedno źródło, jedna blenda, pełna kontrola. Studio bez budżetu na studio.',
      uk: 'Одне джерело, один відбивач, повний контроль. Студія без студійного бюджету.'
    },
    about: {
      en: 'We start with a single lamp, because a person who can do one light well '
        + 'can do four. Schemes, modifiers, and why most beginners buy the wrong softbox.',
      pl: 'Zaczynamy od jednej lampy, bo kto umie jedno światło, poradzi sobie z czterema. '
        + 'Schematy, modyfikatory i dlaczego początkujący kupują zły softbox.',
      uk: 'Починаємо з однієї лампи: хто вміє одне світло, впорається і з чотирма. '
        + 'Схеми, модифікатори і чому новачки купують не той софтбокс.'
    },
    modules: [
      {
        title: { en: 'One lamp', pl: 'Jedna lampa', uk: 'Одна лампа' },
        lessons: [
          { id: 'light-1-1', min: 23, t: { en: 'Hard and soft', pl: 'Twarde i miękkie', uk: 'Жорстке і м’яке' } },
          { id: 'light-1-2', min: 19, t: { en: 'Distance changes everything', pl: 'Odległość zmienia wszystko', uk: 'Відстань змінює все' } },
          { id: 'light-1-3', min: 26, t: { en: 'Four classic schemes', pl: 'Cztery klasyczne schematy', uk: 'Чотири класичні схеми' } }
        ]
      },
      {
        title: { en: 'Adding the second', pl: 'Dodajemy drugą', uk: 'Додаємо другу' },
        lessons: [
          { id: 'light-2-1', min: 21, t: { en: 'Fill and ratio', pl: 'Wypełnienie i proporcja', uk: 'Заповнення і співвідношення' } },
          { id: 'light-2-2', min: 24, t: { en: 'Separating from the background', pl: 'Odcięcie od tła', uk: 'Відділення від фону' } },
          { id: 'light-2-3', min: 18, t: { en: 'Colour gels', pl: 'Filtry barwne', uk: 'Кольорові фільтри' } }
        ]
      }
    ]
  }
];

/* ---- reviews ---------------------------------------------------------
   Invented for the demo. Replace them with your own, or delete the whole
   block — the page hides the section by itself when the array is empty. */
const REVIEWS = [
  {
    name: 'Kasia',
    course: 'basics',
    text: {
      en: 'I had the camera for two years on auto. Two weeks in, I finally understood what the numbers mean.',
      pl: 'Miałam aparat dwa lata na aucie. Po dwóch tygodniach wreszcie zrozumiałam, co znaczą te liczby.',
      uk: 'Два роки знімала на авто. За два тижні нарешті зрозуміла, що означають ці цифри.'
    }
  },
  {
    name: 'Oleh',
    course: 'portrait',
    text: {
      en: 'The part about the first five minutes with a person is worth the whole course.',
      pl: 'Sam fragment o pierwszych pięciu minutach z człowiekiem wart jest całego kursu.',
      uk: 'Сама частина про перші п’ять хвилин із людиною варта всього курсу.'
    }
  }
];
