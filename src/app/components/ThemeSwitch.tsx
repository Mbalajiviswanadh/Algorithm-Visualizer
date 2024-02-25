// app/components/ThemeSwitch.tsx
"use client";
import Image from "next/image";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [backgroundStyle, setBackgroundStyle] = useState(
    "bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
  );

  useEffect(() => setMounted(true), []);

  const handleThemeChange = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
      setBackgroundStyle(
        "bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"
      );
    } else {
      setTheme("dark");
      setBackgroundStyle(
        "bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"
      );
    }
  };

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );

  return (
    <div>
      {resolvedTheme === "dark" ? (
        <FiSun
          className="cursor-pointer text-violet-500"
          size={25}
          onClick={handleThemeChange}
        />
      ) : (
        <FiMoon
          className="cursor-pointer text-violet-800"
          size={25}
          onClick={handleThemeChange}
        />
      )}
      <div
        className={`absolute inset-0 -z-10 h-full w-full ${backgroundStyle}`}
      />
    </div>
  );
}
