"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // Calculate rotation based on scroll position (0 to 360 degrees)
      const scrollPercentage =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      const newRotation = scrollPercentage * 180;
      setRotation(newRotation);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return <div className="w-[24px] h-[24px]" />;
  }

  return (
    <button
      className="rounded-lg p-2 hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div
        className={`p-1 rounded ${
          theme === "dark" ? "bg-dark-primary" : "bg-light-primary"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="358 43 724 724"
          className={`transition-colors ${
            theme === "dark" ? "fill-dark-background" : "fill-light-background"
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <g clipPath="url(#3ca3b9b29f)">
            <path d="M 719.996094 43.207031 C 684.734375 341.148438 656.148438 369.734375 358.207031 404.996094 C 358.828125 405.070312 359.4375 405.140625 360.054688 405.214844 L 360.058594 405.21875 L 360.066406 405.214844 C 656.257812 440.375 684.808594 469.464844 719.996094 766.78125 C 755.253906 468.839844 783.839844 440.253906 1081.78125 404.996094 C 783.839844 369.734375 755.253906 341.148438 719.996094 43.207031 Z" />
          </g>
          <defs>
            <clipPath id="3ca3b9b29f">
              <path d="M 358.207031 43.207031 L 1081.957031 43.207031 L 1081.957031 766.957031 L 358.207031 766.957031 Z M 358.207031 43.207031" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </button>
  );
}
