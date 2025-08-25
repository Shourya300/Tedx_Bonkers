import React from "react";
import Image from "next/image";

interface ThemeImageProps {
  theme: string;
  imageSrc: string;
}

export const ThemeImage: React.FC<ThemeImageProps> = ({ theme, imageSrc }) => {
  return (
    <div className="relative h-[40vh] mb-8 overflow-hidden rounded-xl">
      <Image
        src={imageSrc}
        alt={`${theme} theme`}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
        <h2 className="text-4xl font-bold text-white">{theme}</h2>
      </div>
    </div>
  );
};
