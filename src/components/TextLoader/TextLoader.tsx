import { FC } from "react";
import "./TextLoader.css";

interface TextLoaderProps {
  loading?: boolean;
  loadingText?: string;
}

const TextLoader: FC<TextLoaderProps> = ({
  loading = true,
  loadingText = "loading",
}) => {
  if (loading)
    return (
      <div className="text-loader">
        <section>
          <div className="loading loading03">
            {loadingText
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
  return <></>;
};

export default TextLoader;
