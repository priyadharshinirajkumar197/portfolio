import re

with open('C:/Users/DELL/Downloads/rshg/work/src/components/IntroFlow.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line numbers for the continuous 3D card and Hi button
# We'll search for specific patterns
card_start = None
card_end = None
hi_button_start = None
hi_button_end = None

for i, line in enumerate(lines):
    # Continuous 3D card comment
    if 'THE CONTINUOUS 3D PERSISTENT CARD (NEVER FADES!)' in line and 'DESKTOP ONLY' not in line:
        card_start = i
    # The closing of the continuous card (look for the pattern after the card content)
    if card_start and card_end is None and line.strip() == '</div>' and i > card_start + 100:
        # Check if next few lines have HI BUTTON
        if i + 2 < len(lines) and 'HI BUTTON' in lines[i + 2]:
            card_end = i
    # Hi button
    if 'HI BUTTON (Accompanying the card in Hero)' in line and 'DESKTOP ONLY' not in line:
        hi_button_start = i

print(f"card_start: {card_start}, card_end: {card_end}, hi_button_start: {hi_button_start}")

# Let's try a different approach - find by line numbers from the read output
# Based on the read output, the continuous card starts around line 732 (0-indexed: 731)
# and the div starts at line 740 (0-indexed: 739)

# Let's just rewrite the specific sections by finding unique markers
content = ''.join(lines)

# Replace the continuous 3D card opening
old1 = '''{/* ═══════════════════════════════════════════════════════════════════
            THE CONTINUOUS 3D PERSISTENT CARD (NEVER FADES!)
            - Hero: Centered with portrait photo facing forward.
            - Scroll into Services: Glides right across screen & rotates 3D
              to reveal WORK_IMG on the back face.
            - Scroll into About Me: Rotates 3D back from WORK_IMG to portraitPhoto.
            - ZERO opacity fading in between!
        ═════════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? 'auto' : 0,
            left: isMobile ? 'auto' : 0,
            width: isMobile ? '100%' : photoW,
            height: isMobile ? 'auto' : photoH,
            aspectRatio: isMobile ? '3 / 4' : undefined,
            transform: isMobile ? 'none' : `translate3d(${currentCardX}px, ${currentCardY}px, 0)`,
            zIndex: isMobile ? 1 : 30,
            opacity: mounted ? 1 : 0,
            pointerEvents: 'none',
            willChange: isMobile ? 'auto' : 'transform',
          }}
        >'''

new1 = '''{/* ═══════════════════════════════════════════════════════════════════
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

if old1 in content:
    content = content.replace(old1, new1)
    print("Replaced continuous card opening")
else:
    print("Could not find continuous card opening pattern")
    # Try with slight variations
    import re
    if re.search(r'THE CONTINUOUS 3D PERSISTENT CARD \(NEVER FADES!\)', content):
        print("Found the comment text")
    else:
        print("Comment text not found either")

# Replace the closing and Hi button
old2 = '''            </div>
          </div>
        </div>

        {/* ── HI BUTTON (Accompanying the card in Hero) 
════════════════════════════════════════════════════════════════ */}
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
      </div
    </div>
  )
}'''

new2 = '''            </div>
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

if old2 in content:
    content = content.replace(old2, new2)
    print("Replaced closing and Hi button")
else:
    print("Could not find closing pattern")

with open('C:/Users/DELL/Downloads/rshg/work/src/components/IntroFlow.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')