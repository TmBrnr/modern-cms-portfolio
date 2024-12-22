import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto px-5 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">C — T</h1>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
