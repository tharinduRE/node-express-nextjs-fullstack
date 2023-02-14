/* eslint-disable @next/next/no-img-element */
import { CartBadge } from "@components/shop/CartBadge";
import LoginButton from "@components/ui/LoginButton";
import SearchBar from "@components/ui/SearchBar";
import { styled } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = styled("header")(({ theme }) => [
  {
    position: "fixed",
    width: "100%",
    top: 0,
    transition: theme.transitions.create("top"),
    zIndex: theme.zIndex.appBar,
    backdropFilter: "blur(8px)",
    boxShadow: `inset 0px -1px 1px ${theme.palette.grey[100]}`,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
]);

const navigation = [
  { name: "Shop", href: "/shop" },
  // { name: "Features", href: "#" },
  // { name: "Marketplace", href: "#" },
  { name: "About", href: "#" },
];

export default function AppBarDefault(props: { dark?: boolean }) {
  const router = useRouter();
  return (
    <Header>
      <div className="px-6 lg:px-8">
        <nav
          className="flex items-center justify-between h-16"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center">
            <Link href="/" className="-m-1.5 p-1.5 mr-4">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <SearchBar />
          </div>
          <div className="flex flex-1 justify-end items-center">
            {router.pathname !== "/auth/signin" && <LoginButton />}
            <CartBadge />
            {/* <ThemeSwitch /> */}
          </div>
        </nav>
      </div>
    </Header>
  );
}
