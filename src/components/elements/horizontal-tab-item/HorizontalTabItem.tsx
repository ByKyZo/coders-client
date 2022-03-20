import Link from '@components/elements/link/Link';
import { useRouter } from 'next/router';

interface HorizontalTabItemProps {
  children: string;
  username?: string;
  href: string;
}

const HorizontalTabItem = ({
  children,
  username,
  href,
}: HorizontalTabItemProps) => {
  const router = useRouter();
  const path = `${href}`;
  const isActive = router.asPath === path;

  return (
    <li className="flex-grow">
      <Link
        className="flex justify-center items-center w-full h-12 transition hover:bg-gray-200 border-b"
        href={path}
      >
        <span
          className={`h-full inline-flex justify-center font-semibold text-sm items-center relative before:left-0 before:absolute before:bottom-0 before:h-1 ${
            isActive ? 'before:bg-primary' : 'before:bg-transparent'
          }  before:w-full`}
        >
          {children}
        </span>
      </Link>
    </li>
  );
};

export default HorizontalTabItem;
