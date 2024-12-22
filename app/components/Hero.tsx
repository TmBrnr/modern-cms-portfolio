import HeroText from "./HeroText";

export default function Hero() {
  return (
    <div className="flex flex-col text-center h-screen w-full items-center justify-center relative">
      <div className="relative w-full">
        <HeroText className="w-full z-10" />
      </div>
      <div className="absolute bottom-40 w-full flex justify-center gap-4 mb-8">
        <div className="">Section 1</div>
        <div className="">Section 2</div>
        <div className="">Section 3</div>
      </div>
    </div>
  );
}
