import Link from "next/link";

export const Header = () => (
  <header className="flex items-center justify-between p-4">
    <div className="text-2xl font-bold tracking-wider">アエステティック</div>
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="transition-colors hover:text-pink-200">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/releases"
            className="transition-colors hover:text-pink-200"
          >
            Releases
          </Link>
        </li>
        <li>
          <a href="#" className="transition-colors hover:text-pink-200">
            Playlists
          </a>
        </li>
        <li>
          <a href="#" className="transition-colors hover:text-pink-200">
            About
          </a>
        </li>
      </ul>
    </nav>
  </header>
);
