/* ==========================================================================
   Aula — learning progress.

   Everything is kept in the visitor's own browser, in localStorage. This is
   real progress, not a drawing of one: tick a lesson, close the tab, come
   back a week later — the tick is still there.

   What it does NOT do, and the learning area says so to the student: progress
   does not travel to another device and the school owner cannot see it. That
   needs a server with a database and a password — a different story and a
   different bill.

   The shape of a record:
     { "basics": { done: ["basics-1-1", ...], last: "basics-1-2", started: "2026-11-18" } }

   A private window forbids writing, so every access is wrapped in try/catch:
   the page keeps working, it just forgets.
   ========================================================================== */

const Progress = (() => {
  const KEY = 'aula-progress';

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function write(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) { /* private window: carry on without memory */ }
  }

  function course(id) {
    const all = read();
    return all[id] || { done: [], last: null, started: null };
  }

  return {
    /* is the lesson done */
    isDone(courseId, lessonId) {
      return course(courseId).done.indexOf(lessonId) !== -1;
    },

    /* tick and untick; returns the new state */
    toggle(courseId, lessonId) {
      const all = read();
      const c = all[courseId] || { done: [], last: null, started: null };
      const i = c.done.indexOf(lessonId);
      if (i === -1) {
        c.done.push(lessonId);
      } else {
        c.done.splice(i, 1);
      }
      if (!c.started) c.started = new Date().toISOString().slice(0, 10);
      all[courseId] = c;
      write(all);
      return i === -1;
    },

    /* remember where the student stopped */
    touch(courseId, lessonId) {
      const all = read();
      const c = all[courseId] || { done: [], last: null, started: null };
      c.last = lessonId;
      if (!c.started) c.started = new Date().toISOString().slice(0, 10);
      all[courseId] = c;
      write(all);
    },

    last(courseId) {
      return course(courseId).last;
    },

    started(courseId) {
      return course(courseId).started;
    },

    /* how much is done; total comes from the course programme, not from
       storage, so an added lesson changes the percentage at once */
    stats(courseId, total) {
      const done = course(courseId).done.length;
      return { done, total, pct: total ? Math.round(done / total * 100) : 0 };
    },

    /* courses the student has started */
    touched() {
      const all = read();
      return Object.keys(all).filter(id => all[id].done.length || all[id].last);
    },

    reset(courseId) {
      const all = read();
      delete all[courseId];
      write(all);
    }
  };
})();
