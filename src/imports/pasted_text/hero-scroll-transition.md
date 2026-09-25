Modify my existing portfolio website, specifically the **Hero section and the image scrolling/parallax transition**.

### IMPORTANT — USE THE UPLOADED PORTAVIA VIDEO AS THE REFERENCE

I have uploaded a **screen recording/video of the Portavia website**.

**Before making any changes, carefully watch and analyze that video.**

Do NOT guess how the animation works from my description.

The uploaded video is the **source of truth for the interaction behavior and scrolling choreography**.

I want you to study specifically:

* where the image starts
* its exact position in the Hero
* how it moves when scrolling
* the direction of movement
* how quickly it moves relative to the page
* how its size changes
* how its crop changes
* how it crosses between screens/sections
* where it ends up
* how the surrounding text reacts
* what happens when scrolling backward
* the timing/easing of the transition
* whether the image remains pinned, sticky, or continuously scroll-linked
* how the transition connects the Hero to the next screen

### DO NOT COPY THE PORTAVIA VISUAL DESIGN

Use the video **only as a behavioral/motion reference**.

Keep my existing:

* portfolio identity
* colors
* typography
* content
* name
* project information
* overall visual style

I only want the **interaction choreography** recreated using my own design.

---

# HERO

Change my current Hero composition so it supports the same type of image transition shown in the uploaded Portavia video.

The image should be a major visual anchor of the Hero.

Do not make it a conventional static profile image.

The Hero should be structured so the image has enough space to move and transform during scrolling.

---

# IMAGE SCROLL TRANSITION

Recreate the **specific image movement from the uploaded video**.

I want the image to behave as one continuous visual element.

It should NOT simply:

`fade out → new image appears`

and it should NOT simply:

`translateY(-100px)`

Instead, reproduce the actual choreography visible in the reference video.

If the reference shows the image:

* moving diagonally → reproduce that
* changing scale → reproduce that
* changing position → reproduce that
* changing crop → reproduce that
* becoming larger/smaller → reproduce that
* crossing a section boundary → reproduce that
* becoming part of another section → reproduce that
* remaining sticky for part of the scroll → reproduce that

**Base these decisions on what you observe in the uploaded video.**

---

# SCROLL-LINKED BEHAVIOR

The image transition must be controlled by scroll progress.

For example:

```text
Hero state
    ↓
user scrolls
    ↓
image begins moving
    ↓
image continuously transforms
    ↓
image crosses into next screen
    ↓
image settles into its next position
```

If the user scrolls slowly, they should be able to clearly see the transformation.

If they stop scrolling halfway, the image should remain at that intermediate state.

If they scroll upward, the entire transformation should reverse smoothly.

Do NOT use a one-time IntersectionObserver animation for this.

This needs to be **scroll-linked**.

---

# IMPORTANT: ANALYZE THE VIDEO FIRST

Before implementing, internally determine the animation sequence from the uploaded video.

Think in terms of:

```text
0% scroll → Hero image state
25% scroll → image state
50% scroll → image state
75% scroll → image state
100% scroll → destination state
```

Then implement the transition based on those observed states.

Do not invent a different animation.

---

# IMAGE CONTINUITY

The user should perceive this as the **same image travelling through the website**.

Prefer:

* one image element
* one continuously transformed container
* sticky positioning where appropriate
* scroll-progress interpolation

If the implementation requires separate elements, synchronize them closely enough that there is no visible jump, flicker or replacement.

Avoid obvious crossfades.

---

# TEXT + IMAGE CHOREOGRAPHY

Study the uploaded video and reproduce the relationship between the Hero typography and image.

If the reference shows:

* text moving away while image remains
* text fading while image travels
* text moving at a different speed
* image becoming the focus as the Hero exits

recreate that behavior.

Do not animate every element identically.

The layers should have different movement speeds to create depth.

---

# NEXT SECTION

The section immediately after the Hero should act as the destination for the image transition.

The image should visually connect the two screens.

The transition should feel like:

**Screen 1 → continuous image movement → Screen 2**

rather than two unrelated sections.

---

# DO NOT ADD GENERIC ANIMATIONS

Do NOT add:

* generic fade-up animations
* random floating elements
* unnecessary rotations
* bouncing
* excessive scaling
* decorative motion
* unrelated animations to other sections

The goal is specifically to reproduce the **image scrolling transition from the uploaded Portavia video**.

---

# RESPONSIVE

Desktop should reproduce the reference behavior as closely as possible.

For tablet/mobile:

* preserve the same interaction concept
* reduce movement distance if necessary
* prevent the image from covering important content
* simplify the choreography only when required for usability

Respect `prefers-reduced-motion`.

---

# IMPLEMENTATION PRIORITY

Priority order:

1. **Analyze uploaded Portavia video**
2. Recreate image scroll choreography
3. Make Hero support that choreography
4. Connect Hero image to next section
5. Ensure reverse scrolling works
6. Ensure responsive behavior
7. Optimize performance

Do not spend time redesigning unrelated parts of the portfolio.

### FINAL TEST

After implementation, scroll through the page slowly and compare the result against the uploaded Portavia video.

Ask:

**"Does my image move through the page in the same way the Portavia image moves through the reference?"**

If not, adjust the scroll distance, positioning, scale, timing, easing and section structure until the motion matches the reference behavior.

The uploaded video is the authority for the animation.
