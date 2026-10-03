import re

with open('C:/Users/DELL/Downloads/rshg/work/src/components/IntroFlow.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Replace the continuous 3D card - change the style block and wrap with {!isMobile && ...}
pattern1 = r'''(\{\/\* ═══════════════════════════════════════════════════════════════════\n            THE CONTINUOUS 3D PERSISTENT CARD \(NEVER FADES!\)\n            - Hero: Centered with portrait photo facing forward\.\n            - Scroll into Services: Glides right across screen & rotates 3D\n              to reveal WORK_IMG on the back face\.\n            - Scroll into About Me: Rotates 3D back from WORK_IMG to portraitPhoto\.\n            - ZERO opacity fading in between!\n        ═════════════════════════════════════════════════════════════════════ \*\/\}\n        <div\n          style=\{\{\n            position: isMobile \? 'relative' : 'absolute',\n            top: isMobile \? 'auto' : 0,\n            left: isMobile \? 'auto' : 0,\n            width: isMobile \? '100%' : photoW,\n            height: isMobile \? 'auto' : photoH,\n            aspectRatio: isMobile \? '3 / 4' : undefined,\n            transform: isMobile \? 'none' : `translate3d\(\$\{currentCardX\}px, \$\{currentCardY\}px, 0`\),\n            zIndex: isMobile \? 1 : 30,\n            opacity: mounted \? 1 : 0,\n            pointerEvents: 'none',\n            willChange: isMobile \? 'auto' : 'transform',\n          \}\}\n        >)'''

replacement1 = '''{/* ═══════════════════════════════════════════════════════════════════
            THE CONTINUOUS 3D PERSISTENT CARD (NEVER FADES!) — DESKTOP ONLY
            - Hero: Centered with portrait photo facing forward.
            - Scroll into Services: Glides right across screen & rotates 3D
              to reveal WORK_IMG on the back face.
            - Scroll into About Me: Rotates 3D back from WORK_IMG to portraitPhoto.
            - ZERO opacity fading in between!
        ════════════════════════════════════════════════════════════════════ */}
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

content = re.sub(pattern1, replacement1, content, flags=re.DOTALL)

# Fix 2: Replace the closing of the continuous card and Hi button
pattern2 = r'''(            </div>\n          </div>\n        </div>\n\n        \{\/\* ── HI BUTTON \(Accompanying the card in Hero\) \n════════════════════════════════════════════════════════════════ \*\/\}\n        <a\n          href="#contact"\n          onClick=\{\(e\) => \{\n            e\.preventDefault\(\)\n            document\.getElementById\('contact'\)\?\.scrollIntoView\(\{ behavior: 'smooth' \}\)\n          \}\}\n          className="group flex items-center justify-center rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer select-none"\n          style=\{\{\n            position: 'absolute',\n            top: currentCardY \+ photoH - 54,\n            left: currentCardX - 38,\n            zIndex: 32,\n            width: 112,\n            height: 112,\n            background: accent,\n            boxShadow: '0 12px 34px rgba\(0,0,0,0\.28'\),\n            opacity: hiButtonOpacity,\n            pointerEvents: hiButtonOpacity > 0\.3 \? 'auto' : 'none',\n          \}\}\n        >\n          <span className="font-display font-bold text#\[#121116\] text-\[30px\] leading-none" aria-hidden="true">Hi</span>\n        </a>\n      </div>\n    </div>\n  \)\n\})'''

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

content = re.sub(pattern2, replacement2, content, flags=re.DOTALL)

with open('C:/Users/DELL/Downloads/rshg/work/src/components/IntroFlow.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done - replacements made')