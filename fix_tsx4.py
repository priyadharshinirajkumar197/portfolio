with open('C:/Users/DELL/Downloads/rshg/work/src/components/IntroFlow.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Simply replace the isMobile conditional in the continuous card style
# Find and replace the style block
old_style = """position: isMobile ? 'relative' : 'absolute',
            top: isMobile ? 'auto' : 0,
            left: isMobile ? 'auto' : 0,
            width: isMobile ? '100%' : photoW,
            height: isMobile ? 'auto' : photoH,
            aspectRatio: isMobile ? '3 / 4' : undefined,
            transform: isMobile ? 'none' : `translate3d(${currentCardX}px, ${currentCardY}px, 0)`,
            zIndex: isMobile ? 1 : 30,
            opacity: mounted ? 1 : 0,
            pointerEvents: 'none',
            willChange: isMobile ? 'auto' : 'transform',"""

new_style = """position: 'absolute',
            top: 0,
            left: 0,
            width: photoW,
            height: photoH,
            transform: `translate3d(${currentCardX}px, ${currentCardY}px, 0)`,
            zIndex: 30,
            opacity: mounted ? 1 : 0,
            pointerEvents: 'none',
            willChange: 'transform',"""

if old_style in content:
    content = content.replace(old_style, new_style)
    print("Replaced style block")
else:
    print("Could not find old_style")

# Also wrap the continuous card div with {!isMobile && ...}
# Find the comment and the <div style=
old_card = """{/* ═══════════════════════════════════════════════════════════════════
            THE CONTINUOUS 3D PERSISTENT CARD (NEVER FADES!)
            - Hero: Centered with portrait photo facing forward.
            - Scroll into Services: Glides right across screen & rotates 3D
              to reveal WORK_IMG on the back face.
            - Scroll into About Me: Rotates 3D back from WORK_IMG to portraitPhoto.
            - ZERO opacity fading in between!
        ════════════════════════════════════════════════════════════════════ */}
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
        >"""

new_card = """{/* ═══════════════════════════════════════════════════════════════════
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
          >"""

if old_card in content:
    content = content.replace(old_card, new_card)
    print("Replaced card opening")
else:
    print("Could not find old_card")

# Fix the closing - find the pattern after the card content
old_close = """            </div>
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
    </div
  )
}"""

new_close = """            </div>
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
    </div
  )
}"""

if old_close in content:
    content = content.replace(old_close, new_close)
    print("Replaced closing")
else:
    print("Could not find old_close")

with open('C:/Users/DELL/Downloads/rshg/work/src/components/IntroFlow.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')