import Link from '@components/elements/link/Link';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Header = () => {
  const nav = [
    { label: 'Explore', href: '/explore' },
    { label: 'Explore', href: '/explore' },
    { label: 'Explore', href: '/explore' },
    { label: 'Explore', href: '/explore' },
    { label: 'Explore', href: '/explore' },
  ];

  return (
    <header className="flex flex-growS justify-end bg-red-300">
      <div className="w-56 flex flex-col ">
        <div className="">
          {/* prettier-ignore */}
          <svg className="h-14 w-14" viewBox="0 0 80 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.8372 0L79.6743 69H0L39.8372 0Z" fill="#BD00FF"/>
            <path d="M40 20L63 60H17L40 20Z" fill="white" fillOpacity="0.7"/>
            <path d="M40 26L58 57H22L40 26Z" fill="white"/>
          </svg>
        </div>
        <nav>
          <ul>
            {nav.map(({ label, href }) => (
              <li key={uuidv4()}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
