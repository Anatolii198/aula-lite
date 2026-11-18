# -*- coding: utf-8 -*-
"""Screenshots for the README. Run the aula-lite server (port 8797) first,
then: python docs/_shots.py

⚠️ --lang=en-US matters: Chromium draws date and number controls in the
interface language, and a Russian date would show up in an English frame.
"""
import os
from playwright.sync_api import sync_playwright

OUT = os.path.dirname(os.path.abspath(__file__))
BASE = 'http://localhost:8797/'

SHOTS = [
    ('home',         'index.html',               'light', 'en',   0, 1000),
    ('course-dark',  'course.html?id=portrait',  'dark',  'en', 150, 1000),
]

PREP = """() => {
  document.documentElement.style.scrollBehavior = 'auto';
  const s = document.createElement('style');
  s.textContent = '*{transition:none!important;animation:none!important}';
  document.head.appendChild(s);
}"""

with sync_playwright() as p:
    browser = p.chromium.launch(args=['--lang=en-US'])
    ctx = browser.new_context(viewport={'width': 1600, 'height': 1000},
                              device_scale_factor=2, locale='en-US')
    page = ctx.new_page()
    for name, url, theme, lang, scroll, height in SHOTS:
        page.goto(BASE + url)
        page.evaluate("([t, l]) => { try { localStorage.setItem('aula-theme', t);"
                      " localStorage.setItem('aula-lang', l); } catch(e) {} }", [theme, lang])
        page.reload()
        page.wait_for_load_state('networkidle')
        page.evaluate(PREP)
        page.evaluate('y => scrollTo(0, y)', scroll)
        page.wait_for_timeout(450)
        page.set_viewport_size({'width': 1600, 'height': height})
        page.wait_for_timeout(250)
        dst = os.path.join(OUT, name + '.png')
        page.screenshot(path=dst)
        print('%-12s %6.0f KB' % (name, os.path.getsize(dst) / 1024))
    browser.close()
