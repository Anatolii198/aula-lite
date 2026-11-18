/* ==========================================================================
   Aula Lite — one place to change everything that makes the school yours.

   Edit this file first: name, contacts, currency, the teacher. There is no
   build step and no framework — the page reads these values when it loads.
   ========================================================================== */

const CFG = {
  /* ---- the school -----------------------------------------------------
     `name` is printed in the header, the footer and the browser tab. */
  name: 'Aula',
  tagline: {
    en: 'School of photography',
    pl: 'Szkoła fotografii',
    uk: 'Школа фотографії'
  },

  /* ---- contacts -------------------------------------------------------
     An empty string means the line simply does not appear, instead of
     hanging there as a dead link. */
  email: 'hello@aula.example',
  phone: '',
  city: { en: 'Warsaw', pl: 'Warszawa', uk: 'Варшава' },
  social: {
    instagram: 'https://instagram.com/',
    youtube: '',
    telegram: ''
  },

  /* ---- money ----------------------------------------------------------
     One currency code for the whole site. Prices are plain numbers in
     js/courses.js, and every language writes that number its own way:
     1290 becomes "1290 zł" in Polish and "PLN 1,290" in English. To sell in
     euro, change this one line. */
  currency: 'PLN',

  /* ---- the teacher ---------------------------------------------------- */
  teacher: {
    photo: 'img/teacher.jpg',
    name: 'Marta Lis',
    since: 2014,
    role: {
      en: 'Photographer, teaches since 2014',
      pl: 'Fotografka, uczy od 2014 roku',
      uk: 'Фотографиня, викладає з 2014 року'
    },
    about: {
      en: 'Ten years of weddings, portraits and reportage. I teach the way I wish '
        + 'somebody had taught me: less theory about sensors, more looking at light.',
      pl: 'Dziesięć lat ślubów, portretów i reportażu. Uczę tak, jak sama chciałam '
        + 'być uczona: mniej teorii o matrycach, więcej patrzenia na światło.',
      uk: 'Десять років весіль, портретів і репортажу. Навчаю так, як хотіла б, '
        + 'щоб навчали мене: менше теорії про матриці, більше про світло.'
    }
  },

  /* ---- the three numbers on the first screen --------------------------
     ⚠️ These are your figures and yours to prove. The two counts match the
     programme in js/courses.js; the third is invented demo content and must
     be replaced before you publish. */
  figures: [
    { value: '3',    key: 'fig.courses' },
    { value: '18',   key: 'fig.lessons' },
    { value: '900+', key: 'fig.students' }
  ],

  /* ---- small things ---------------------------------------------------
     `trialLesson` is the id of the lesson that is open without payment. It
     is marked as free in the course programme. */
  trialLesson: 'basics-1-1'
};
