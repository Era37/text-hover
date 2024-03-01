import { useEffect, useState } from "react";
import randomstring from "randomstring";
import "./TextHover.css";
import { MouseEvent } from "react";

type TextHoverProps = {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  children?: React.ReactNode;
};

const hexRegex = /#([a-fA-F0-9]{3,6})/;

export default function TextHover({
  primaryColor,
  secondaryColor,
  tertiaryColor,
  children,
}: TextHoverProps) {
  const [randomString, setRandomString] = useState("");
  const colorConfig = {
    "--primary": primaryColor,
    "--secondary": secondaryColor,
    "--tertiary": tertiaryColor,
  };
  for (const value of Object.values(colorConfig)) {
    if (!hexRegex.test(value)) {
      throw new Error("Invalid hex code");
    }
  }
  function setText() {
    const text = randomstring.generate({
      length: 4000,
      charset: "alphabetic",
    });
    setRandomString(text);
  }

  function applyConfig(config: { [key: string]: string }) {
    for (const key of Object.keys(config)) {
      document.documentElement.style.setProperty(key, config[key]);
    }
  }

  function updateCursorPosition(e: MouseEvent) {
    applyConfig({ "--x": `${e.clientX}px`, "--y": `${e.clientY}px` });
    setText();
  }

  useEffect(() => {
    setText();
    applyConfig(colorConfig);
  }, []);
  return (
    <div className="main-div">
      <div className="container" onMouseMove={(e) => updateCursorPosition(e)}>
        <div className="child">{children}</div>
        <p className="fire-code text">{randomString}</p>
      </div>
    </div>
  );
}
