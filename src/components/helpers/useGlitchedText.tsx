import React from "react";

const DURATION_GLITCH_DELAY = 3000;
const DURATION_GLITCH = 500;
const DURATION_TEXT_UPDATE = 100;

const randomizeText = (text: string) =>
  text
    .split("")
    .map((char) =>
      Math.random() > 0.8
        ? String.fromCharCode(Math.floor(Math.random() * 26) + 65)
        : char,
    )
    .join("");

export const useGlitchedText = (text: string) => {
  const [glitchedText, setGlitchedText] = React.useState(text);
  const [isGlitchActive, setIsGlitchActive] = React.useState(false);

  React.useEffect(() => {
    const glitchDelayInterval = setInterval(() => {
      setIsGlitchActive(true);
      setTimeout(() => setIsGlitchActive(false), DURATION_GLITCH);
    }, DURATION_GLITCH_DELAY);

    return () => clearInterval(glitchDelayInterval);
  }, []);

  React.useEffect(() => {
    let textUpdateInterval: NodeJS.Timeout;

    if (isGlitchActive) {
      textUpdateInterval = setInterval(
        () => setGlitchedText(randomizeText(text)),
        DURATION_TEXT_UPDATE,
      );
    }

    return () => clearInterval(textUpdateInterval);
  }, [text, isGlitchActive]);

  return glitchedText;
};
