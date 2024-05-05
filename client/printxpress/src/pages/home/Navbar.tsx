import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar position="static">
      <NavbarBrand className="justify-start">
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <h1>
            Prods
          </h1>
        </NavbarItem>

        <NavbarItem>
          <h1>Home</h1>
        </NavbarItem>

        <NavbarItem>
          <Link color="danger" href="#">
            Integrations
          </Link>
        </NavbarItem>

      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
