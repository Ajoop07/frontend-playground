import { useEffect, useRef, useState } from "react";

const TEXT_COLORS = [
  "#ff6b6b",
  "#ffd93d",
  "#6bcb77",
  "#4d96ff",
  "#c780fa",
  "#ff9a3c",
  "#00c2cb",
  "#ff5e94",
];

const BACKGROUND_COLORS = [
  "#0f0f1e",
  "#1a0b2e",
  "#0b2545",
  "#1e1e2e",
  "#2d1b3d",
  "#0f2027",
  "#1a1a2e",
  "#2c1810",
];

function App() {
  const screenRef = useRef(null); // the full-screen outer div
  const helloRef = useRef(null); // the "Hello, world" text div

  const [textColor, setTextColor] = useState(TEXT_COLORS[0]);
  const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_COLORS[0]);

  // EFFECT 1: bounce the text around and change its color when it hits a wall
  useEffect(() => {
    const screen = screenRef.current;
    const hello = helloRef.current;
    if (!screen || !hello) return;

    // Current position of the text (top-left corner, in pixels from top-left of screen)
    let positionX = 100;
    let positionY = 100;

    // Speed: how many pixels to move each frame, in each direction
    let speedX = 2.5; // positive = moving right, negative = moving left
    let speedY = 2.5; // positive = moving down,  negative = moving up

    let colorIndex = 0;
    let animationId; // we'll save the loop's ID here so we can cancel it later

    const runOneFrame = () => {
      // Measure the screen and the text fresh each frame
      // (in case the window was resized, or the text changed size)
      const screenWidth = screen.clientWidth;
      const screenHeight = screen.clientHeight;
      const helloWidth = hello.offsetWidth;
      const helloHeight = hello.offsetHeight;

      // Step 1: move the text by its current speed
      positionX = positionX + speedX;
      positionY = positionY + speedY;

      // Step 2: check if the text hit any wall, and bounce if so
      let didBounce = false;

      // Hit the RIGHT wall? (right edge of text passed right edge of screen)
      if (positionX + helloWidth >= screenWidth) {
        positionX = screenWidth - helloWidth; // park it flush against the wall
        speedX = -speedX; // flip horizontal direction
        didBounce = true;
      }
      // Hit the LEFT wall?
      if (positionX <= 0) {
        positionX = 0;
        speedX = -speedX;
        didBounce = true;
      }
      // Hit the BOTTOM wall?
      if (positionY + helloHeight >= screenHeight) {
        positionY = screenHeight - helloHeight;
        speedY = -speedY;
        didBounce = true;
      }
      // Hit the TOP wall?
      if (positionY <= 0) {
        positionY = 0;
        speedY = -speedY;
        didBounce = true;
      }

      // Step 3: if we bounced, switch to the next color
      if (didBounce) {
        colorIndex = (colorIndex + 1) % TEXT_COLORS.length;
        setTextColor(TEXT_COLORS[colorIndex]);
      }

      // Step 4: actually draw the text in its new position
      hello.style.transform = `translate(${positionX}px, ${positionY}px)`;

      // Step 5: ask the browser to call this function again on the next frame
      animationId = requestAnimationFrame(runOneFrame);
    };

    // Kick off the loop
    animationId = requestAnimationFrame(runOneFrame);

    // When the component is removed, stop the loop so it doesn't keep running
    return () => cancelAnimationFrame(animationId);
  }, []);

  // EFFECT 2: change the background color every 3 seconds, on its own timer
  useEffect(() => {
    let bgIndex = 0;
    const timerId = setInterval(() => {
      bgIndex = (bgIndex + 1) % BACKGROUND_COLORS.length;
      setBackgroundColor(BACKGROUND_COLORS[bgIndex]);
    }, 3000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div
      ref={screenRef}
      style={{
        position: "fixed", // pin to the browser window
        inset: 0, // stretch to all four edges (top/right/bottom/left = 0)
        background: backgroundColor,
        overflow: "hidden", // hide anything that goes outside this box
        transition: "background 1.2s ease", // smooth bg color fade
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
      }}
    >
      <div
        ref={helloRef}
        style={{
          position: "absolute", // position me relative to my parent (the screen div)
          top: 0, // my "home" position is the top-left corner
          left: 0, // and we use `transform: translate` to move me from there
          color: textColor,
          fontSize: "clamp(48px, 10vw, 140px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          userSelect: "none",
          transition: "color 0.3s ease", // smooth color fade on bounce
          willChange: "transform", // hint to browser: this element will animate
        }}
      >
        Hello, world 👋
      </div>
    </div>
  );
}

export default App;
