import Link from "next/link";

interface NavItemProps {
    text: string;
    href: string;
    active: boolean;
}

const NavItem: React.FunctionComponent<NavItemProps> = ({ text, href, active }) => {
  return (
    <Link href={href} className={`nav__link`}>
        {text}
    </Link>
  );
};

export default NavItem;