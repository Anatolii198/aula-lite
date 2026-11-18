/* ==========================================================================
   Aula — every interface word, in three languages.

   How it works
     An element with data-i18n="key" takes its text from here, in the current
     language. data-i18n-attr="placeholder:key" fills an attribute instead.
     {braces} are replaced with real values by the page.

   Course and lesson titles are NOT here — they live in js/courses.js next to
   the programme, so the school owner edits content in one file.

   Adding a language
     1. copy the `en` block and rename it ('cs', 'de', …);
     2. add the code to LANGS below;
     3. add its locale to LOCALES in js/main.js — without that line the new
        language prints English dates and the price in the wrong shape.
   A missing key falls back to English, so there are never empty gaps.
   ========================================================================== */

const LANGS = ['en', 'pl', 'uk'];

const I18N = {

  /* ===================================================== English ======= */
  en: {
    'doc.title': '{name} — online school of photography',
    'doc.desc': 'Three courses, 18 lessons, your own pace. Watch the first lesson free.',

    'misc.skip': 'Skip to content',
    'nav.courses': 'Courses',
    'nav.how': 'How it works',
    'nav.teacher': 'Teacher',
    'nav.lang': 'Language',
    'nav.theme': 'Light or dark',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.start': 'Start learning',

    'hero.eyebrow': 'Online school · {city}',
    'hero.h': 'Learn to see light.\nThe camera will follow.',
    'hero.p': 'Three courses from the first manual frame to studio light and colour. '
            + 'Watch at your own pace, come back to any lesson, keep the materials forever.',
    'hero.cta': 'Choose a course',
    'hero.cta2': 'Watch the first lesson',
    'hero.note': 'The first lesson of “Camera basics” is open to everyone, no card needed.',

    'fig.courses': 'courses',
    'fig.lessons': 'lessons',
    'fig.students': 'students since 2014',

    'how.eyebrow': 'How it works',
    'how.h': 'No timetable, no group, no catching up',
    'how.1': 'Buy once',
    'how.1.d': 'No subscription. A course you bought stays yours, including every lesson added to it later.',
    'how.2': 'Watch when it suits you',
    'how.2.d': 'Lessons are short — ten to thirty minutes. The page remembers where you stopped.',
    'how.3': 'Shoot, send, get an answer',
    'how.3.d': 'Every module ends with a task. You send frames, you get a written review — not a thumbs up.',

    'cat.eyebrow': 'Courses',
    'cat.h': 'Three courses',
    'cat.p': 'Start anywhere. Most people take “Camera basics” first and then pick by what they want to shoot.',

    'level.start': 'Beginner',
    'level.mid': 'Confident',
    'level.pro': 'Advanced',
    'topic.tech': 'Technique',
    'topic.people': 'People',
    'topic.post': 'Editing',

    'card.lessons': '{n} lessons',
    'card.hours': '{t} of video',
    'card.open': 'Open course',
    'card.free': 'First lesson free',

    'course.about': 'About the course',
    'course.program': 'Programme',
    'course.module': 'Module {n}',
    'course.total': '{lessons} lessons · {time}',
    'course.start': 'Start learning',
    'course.continue': 'Continue',
    'course.done': 'Course finished',
    'course.progress': '{done} of {total} lessons',
    'course.included': 'What is included',
    'course.inc.1': 'Lifetime access, including later additions',
    'course.inc.2': 'Materials and presets to download',
    'course.inc.3': 'A written review of your homework',
    'course.inc.4': 'A certificate when you finish',
    'course.free': 'free',
    'course.other': 'Other courses',

    'lesson.back': 'To the programme',
    'lesson.next': 'Next lesson',
    'lesson.prev': 'Previous',
    'lesson.done': 'Mark as done',
    'lesson.undone': 'Done — undo',
    'lesson.materials': 'Materials for this lesson',
    'lesson.m1': 'Lesson notes, PDF',
    'lesson.m2': 'Raw files to practise on',
    'lesson.task': 'Task',
    'lesson.task.d': 'Shoot five frames on this subject and send them in. You will get a written answer within two working days.',
    'lesson.demo': 'Demo: the video is not connected. Put a link to your own video in js/courses.js — YouTube, Vimeo, or a file on your hosting.',
    'lesson.free': 'Free lesson',

    'rev.h': 'What students say',
    'rev.about': 'about',

    'teacher.h': 'Who teaches',
    'teacher.cta': 'Choose a course',

    'cta.h': 'Start with the free lesson',
    'cta.p': 'Fourteen minutes. If the way it is explained does not suit you, you have lost nothing.',

    'foot.rights': 'All rights reserved.',
    'foot.note': 'This page sets no cookies and loads nothing from anybody else.',
    'foot.top': 'Back to top',
    'foot.courses': 'Courses',
    'foot.contact': 'Contact',

    '404.h': 'No such page',
    '404.p': 'The link is broken or the page has moved.',
    '404.cta': 'To the home page'
  },

  /* ====================================================== Polski ======== */
  pl: {
    'doc.title': '{name} — internetowa szkoła fotografii',
    'doc.desc': 'Trzy kursy, 18 lekcji, własne tempo. Pierwsza lekcja za darmo.',

    'misc.skip': 'Przejdź do treści',
    'nav.courses': 'Kursy',
    'nav.how': 'Jak to działa',
    'nav.teacher': 'Prowadząca',
    'nav.lang': 'Język',
    'nav.theme': 'Jasny albo ciemny',
    'nav.menu': 'Menu',
    'nav.close': 'Zamknij',
    'nav.start': 'Zacznij naukę',

    'hero.eyebrow': 'Szkoła online · {city}',
    'hero.h': 'Naucz się widzieć światło.\nAparat nadąży.',
    'hero.p': 'Trzy kursy od pierwszego kadru w trybie manualnym po światło studyjne i kolor. '
            + 'Oglądasz we własnym tempie, wracasz do każdej lekcji, materiały zostają na zawsze.',
    'hero.cta': 'Wybierz kurs',
    'hero.cta2': 'Obejrzyj pierwszą lekcję',
    'hero.note': 'Pierwsza lekcja „Podstaw aparatu” jest otwarta dla wszystkich, bez karty.',

    'fig.courses': 'kursy',
    'fig.lessons': 'lekcji',
    'fig.students': 'kursantów od 2014 roku',

    'how.eyebrow': 'Jak to działa',
    'how.h': 'Bez planu zajęć, bez grupy, bez nadrabiania',
    'how.1': 'Kupujesz raz',
    'how.1.d': 'Żadnej subskrypcji. Kupiony kurs zostaje twój, razem z lekcjami dodanymi później.',
    'how.2': 'Oglądasz, kiedy ci pasuje',
    'how.2.d': 'Lekcje są krótkie — od dziesięciu do trzydziestu minut. Strona pamięta, gdzie skończyłeś.',
    'how.3': 'Fotografujesz, wysyłasz, dostajesz odpowiedź',
    'how.3.d': 'Każdy moduł kończy się zadaniem. Wysyłasz kadry, dostajesz pisemną opinię, a nie kciuk w górę.',

    'cat.eyebrow': 'Kursy',
    'cat.h': 'Trzy kursy',
    'cat.p': 'Zacznij od dowolnego. Większość bierze najpierw „Podstawy aparatu”, potem wybiera po temacie.',

    'level.start': 'Początkujący',
    'level.mid': 'Pewny siebie',
    'level.pro': 'Zaawansowany',
    'topic.tech': 'Technika',
    'topic.people': 'Ludzie',
    'topic.post': 'Obróbka',

    'card.lessons': 'lekcji: {n}',
    'card.hours': '{t} wideo',
    'card.open': 'Zobacz kurs',
    'card.free': 'Pierwsza lekcja gratis',

    'course.about': 'O kursie',
    'course.program': 'Program',
    'course.module': 'Moduł {n}',
    'course.total': 'lekcji: {lessons} · {time}',
    'course.start': 'Zacznij naukę',
    'course.continue': 'Kontynuuj',
    'course.done': 'Kurs ukończony',
    'course.progress': '{done} z {total} lekcji',
    'course.included': 'Co w środku',
    'course.inc.1': 'Dostęp bezterminowy, razem z późniejszymi lekcjami',
    'course.inc.2': 'Materiały i presety do pobrania',
    'course.inc.3': 'Pisemna opinia o pracy domowej',
    'course.inc.4': 'Certyfikat po ukończeniu',
    'course.free': 'gratis',
    'course.other': 'Pozostałe kursy',

    'lesson.back': 'Do programu',
    'lesson.next': 'Następna lekcja',
    'lesson.prev': 'Poprzednia',
    'lesson.done': 'Oznacz jako zrobioną',
    'lesson.undone': 'Zrobiona — cofnij',
    'lesson.materials': 'Materiały do lekcji',
    'lesson.m1': 'Notatki do lekcji, PDF',
    'lesson.m2': 'Pliki raw do ćwiczeń',
    'lesson.task': 'Zadanie',
    'lesson.task.d': 'Zrób pięć kadrów na ten temat i wyślij. Pisemną odpowiedź dostaniesz w dwa dni robocze.',
    'lesson.demo': 'Demo: wideo nie jest podłączone. Właściciel szkoły wpisuje własny link w js/courses.js — YouTube, Vimeo albo plik na swoim hostingu.',
    'lesson.free': 'Lekcja gratis',

    'rev.h': 'Co mówią kursanci',
    'rev.about': 'o kursie',

    'teacher.h': 'Kto uczy',
    'teacher.cta': 'Wybierz kurs',

    'cta.h': 'Zacznij od darmowej lekcji',
    'cta.p': 'Czternaście minut. Jeśli sposób tłumaczenia ci nie pasuje, nic nie tracisz.',

    'foot.rights': 'Wszelkie prawa zastrzeżone.',
    'foot.note': 'Ta strona nie zapisuje ciasteczek i nie ładuje niczego z zewnątrz.',
    'foot.top': 'Do góry',
    'foot.courses': 'Kursy',
    'foot.contact': 'Kontakt',

    '404.h': 'Nie ma takiej strony',
    '404.p': 'Link jest zepsuty albo strona się przeniosła.',
    '404.cta': 'Na stronę główną'
  },

  /* ==================================================== Українська ====== */
  uk: {
    'doc.title': '{name} — онлайн-школа фотографії',
    'doc.desc': 'Три курси, 18 уроків, власний темп. Перший урок безплатний.',

    'misc.skip': 'Перейти до вмісту',
    'nav.courses': 'Курси',
    'nav.how': 'Як це влаштовано',
    'nav.teacher': 'Викладачка',
    'nav.lang': 'Мова',
    'nav.theme': 'Світла чи темна',
    'nav.menu': 'Меню',
    'nav.close': 'Закрити',
    'nav.start': 'Почати навчання',

    'hero.eyebrow': 'Онлайн-школа · {city}',
    'hero.h': 'Навчіться бачити світло.\nКамера встигне.',
    'hero.p': 'Три курси — від першого кадру в ручному режимі до студійного світла й кольору. '
            + 'Дивитесь у своєму темпі, повертаєтесь до будь-якого уроку, матеріали лишаються назавжди.',
    'hero.cta': 'Обрати курс',
    'hero.cta2': 'Подивитись перший урок',
    'hero.note': 'Перший урок «Основ камери» відкритий для всіх, без картки.',

    'fig.courses': 'курси',
    'fig.lessons': 'уроків',
    'fig.students': 'учнів з 2014 року',

    'how.eyebrow': 'Як це влаштовано',
    'how.h': 'Без розкладу, без групи, без наздоганяння',
    'how.1': 'Платите один раз',
    'how.1.d': 'Жодної підписки. Куплений курс лишається вашим разом з уроками, доданими пізніше.',
    'how.2': 'Дивитесь, коли зручно',
    'how.2.d': 'Уроки короткі — від десяти до тридцяти хвилин. Сторінка памʼятає, де ви зупинились.',
    'how.3': 'Знімаєте, надсилаєте, отримуєте відповідь',
    'how.3.d': 'Кожен модуль завершується завданням. Надсилаєте кадри — отримуєте письмовий розбір, а не лайк.',

    'cat.eyebrow': 'Курси',
    'cat.h': 'Три курси',
    'cat.p': 'Починайте з будь-якого. Більшість бере спершу «Основи камери», далі обирає за темою.',

    'level.start': 'Початок',
    'level.mid': 'Впевнений',
    'level.pro': 'Просунутий',
    'topic.tech': 'Техніка',
    'topic.people': 'Люди',
    'topic.post': 'Обробка',

    'card.lessons': 'уроків: {n}',
    'card.hours': '{t} відео',
    'card.open': 'Відкрити курс',
    'card.free': 'Перший урок безплатно',

    'course.about': 'Про курс',
    'course.program': 'Програма',
    'course.module': 'Модуль {n}',
    'course.total': 'уроків: {lessons} · {time}',
    'course.start': 'Почати навчання',
    'course.continue': 'Продовжити',
    'course.done': 'Курс пройдено',
    'course.progress': '{done} з {total} уроків',
    'course.included': 'Що входить',
    'course.inc.1': 'Безстроковий доступ разом з пізнішими уроками',
    'course.inc.2': 'Матеріали й пресети для завантаження',
    'course.inc.3': 'Письмовий розбір домашньої роботи',
    'course.inc.4': 'Сертифікат після завершення',
    'course.free': 'безплатно',
    'course.other': 'Інші курси',

    'lesson.back': 'До програми',
    'lesson.next': 'Наступний урок',
    'lesson.prev': 'Попередній',
    'lesson.done': 'Позначити пройденим',
    'lesson.undone': 'Пройдено — скасувати',
    'lesson.materials': 'Матеріали до уроку',
    'lesson.m1': 'Конспект уроку, PDF',
    'lesson.m2': 'Raw-файли для вправ',
    'lesson.task': 'Завдання',
    'lesson.task.d': 'Зніміть пʼять кадрів на цю тему й надішліть. Письмову відповідь отримаєте за два робочі дні.',
    'lesson.demo': 'Демо: відео не підключене. Власник школи вписує своє посилання в js/courses.js — YouTube, Vimeo або файл на своєму хостингу.',
    'lesson.free': 'Безплатний урок',

    'rev.h': 'Що кажуть учні',
    'rev.about': 'про курс',

    'teacher.h': 'Хто навчає',
    'teacher.cta': 'Обрати курс',

    'cta.h': 'Почніть із безплатного уроку',
    'cta.p': 'Чотирнадцять хвилин. Якщо манера пояснення вам не підійде, ви нічого не втратили.',

    'foot.rights': 'Усі права захищено.',
    'foot.note': 'Ця сторінка не ставить куки й нічого не вантажить зі сторонніх сайтів.',
    'foot.top': 'Нагору',
    'foot.courses': 'Курси',
    'foot.contact': 'Контакти',

    '404.h': 'Такої сторінки немає',
    '404.p': 'Посилання зламане або сторінка переїхала.',
    '404.cta': 'На головну'
  }
};
