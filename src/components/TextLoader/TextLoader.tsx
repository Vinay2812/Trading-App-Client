import { FC } from "react";
import "./TextLoader.css";

interface TextLoaderProps {
  text?: string;
}

const TextLoader: FC<TextLoaderProps> = ({ text = "loading" }) => {
  return (
    <div className="text-loader">
      <section>
        <div className="loading loading03">
          {text
            .toUpperCase()
            .split("")
            .map((letter, index) => {
              return (
                <span
                  key={index}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default TextLoader;
