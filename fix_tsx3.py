import re

with open('C:/Users/DELL/Downloads/rshg/work/src/components/IntroFlow.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Replace continuous 3D card opening - use regex with flexible whitespace
pattern1 = re.compile(
    r'(\{\/\*[ ]*══════[ ]*THE CONTINUOUS 3D PERSISTENT CARD \(NEVER FADES!\)[ ]*- Hero: Centered with portrait photo facing forward\.[ ]*- Scroll into Services: Glides right across screen & rotates 3D[ ]*to reveal WORK_IMG on the back face\.[ ]*- Scroll into About Me: Rotates 3D back from WORK_IMG to portraitPhoto\.[ ]*- ZERO opacity fading in between![ ]*══════[ ]*\*\/}\n)[ ]*<div\n[ ]*style=\{\{[ ]*position: isMobile \? \'relative\' : \'absolute\',[ ]*top: isMobile \? \'auto\' : 0,[ ]*left: isMobile \? \'auto\' : 0,[ ]*width: isMobile \? \'100%\' : photoW,[ ]*height: isMobile \? \'auto\' : photoH,[ ]*aspectRatio: isMobile \? \'3 / 4\' : undefined,[ ]*transform: isMobile \? \'none\' : `translate3d\(\$\{currentCardX\}px, \$\{currentCardY\}px, 0`\),[ ]*zIndex: isMobile \? 1 : 30,[ ]*opacity: mounted \? 1 : 0,[ ]*pointerEvents: \'none\',[ ]*willChange: isMobile \? \'auto\' : \'transform\',[ ]*\}\}\n[ ]*>',
    re.DOTALL
)

replacement1 = '''{/* ═══════════════════════════════════════════════════════════════════
            THE CONTINUOUS 3D PERSISTENT CARD (NEVER FADES!) — DESKTOP ONLY
            - Hero: Centered with portrait photo facing forward.
            - Scroll into Services: Glides right across screen & rotates 3D
              to reveal WORK_IMG on the back face.
            - Scroll into About Me: Rotates 3D back from WORK_IMG to portraitPhoto.
            - ZERO opacity fading in between!
        ═════════════════════════════════════════════════════════════════════ */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: photoW,
              height: photoH,
              transform: `translate3d(${currentCardX}px, ${currentCardY}px, 0)`,
              zIndex: 30,
              opacity: mounted ? 1 : 0,
              pointerEvents: 'none',
              willChange: 'transform',
            }}
          >'''

content, count1 = pattern1.subn(replacement1, content)
print(f"Replaced continuous card opening: {count1}")

# Fix 2: Replace the closing and Hi button - use regex
pattern2 = re.compile(
    r'(</div>\n[ ]*</div>\n[ ]*</div>\n\n[ ]*\{\/\*[ ]*──[ ]*HI BUTTON[ ]*\(Accompanying the card in Hero\)[ ]*════════════════════════════════════════════════════════════════[ ]*\*\/}\n[ ]*<a\n[ ]*href="#contact"[ ]*onClick=\{\(e\) => \{\n[ ]*e\.preventDefault\(\)\n[ ]*document\.getElementById\(\'contact\'\)\?\.scrollIntoView\(\{ behavior: \'smooth\' \}\)\n[ ]*\}\}\n[ ]*className="group flex items-center justify-center rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer select-none"\n[ ]*style=\{\{[ ]*position: \'absolute\',[ ]*top: currentCardY \+ photoH - 54,[ ]*left: currentCardX - 38,[ ]*zIndex: 32,[ ]*width: 112,[ ]*height: 112,[ ]*background: accent,[ ]*boxShadow: \'0 12px 34px rgba\(0,0,0,0\.28\)\',[ ]*opacity: hiButtonOpacity,[ ]*pointerEvents: hiButtonOpacity > 0\.3 \? \'auto\' : \'none\',[ ]*\}\}\n[ ]*>\n[ ]*<span className="font-display font-bold text#\[#121116\] text-\[30px\] leading-none" aria-hidden="true">Hi</span>\n[ ]*</a>\n[ ]*</div>\n[ ]*</div>\n[ ]*\)\n[ ]*}',
    re.DOTALL
)

replacement2 = '''            </div>
          </div>
        </div>
        )}

        {/* ── HI BUTTON (Accompanying the card in Hero) — DESKTOP ONLY ────────────────────── */}
        {!isMobile && (
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group flex items-center justify-center rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer select-none"
            style={{
              position: 'absolute',
              top: currentCardY + photoH - 54,
              left: currentCardX - 38,
              zIndex: 32,
              width: 112,
              height: 112,
              background: accent,
              boxShadow: '0 12px 34px rgba(0,0,0,0.28)',
              opacity: hiButtonOpacity,
              pointerEvents: hiButtonOpacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <span className="font-display font-bold text-[#121116] text-[30px] leading-none" aria-hidden="true">Hi</span>
          </a>
        )}
      </div>
    </div>
  )
}'''

content, count2 = pattern2.subn(replacement2, content)
print(f"Replaced closing and Hi button: {count2}")

with open('C:/Users/DELL/Downloads/rshg/work/src/components/IntroFlow.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')