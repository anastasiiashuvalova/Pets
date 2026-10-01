import { Link, useLocation } from "react-router-dom";

const itemClass =
  "text-sm text-neutral-600 transition hover:text-neutral-900";
const activeItemClass = "text-sm font-medium text-neutral-900";

function AuthActions() {
  return (
    <>
      <button
        type="button"
        className="text-sm text-neutral-700 transition hover:text-neutral-900"
      >
        Войти
      </button>
      <button
        type="button"
        className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
      >
        Зарегистрироваться
      </button>
    </>
  );
}

function NavItems({ findingPet }) {
  return (
    <>
      <Link
        to="/"
        className={findingPet ? activeItemClass : itemClass}
        aria-current={findingPet ? "page" : undefined}
      >
        Найти питомца
      </Link>
      <button type="button" className={itemClass}>
        Пристроить животное
      </button>
      <button type="button" className={itemClass}>
        Помочь
      </button>
    </>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const findingPet = pathname === "/" || pathname.startsWith("/animals/");

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-[#f3f3f1]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:gap-8">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            лапки
          </Link>
          <div className="ml-auto flex items-center gap-3 md:hidden">
            <AuthActions />
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <NavItems findingPet={findingPet} />
        </nav>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <AuthActions />
        </div>
      </div>
    </header>
  );
}
