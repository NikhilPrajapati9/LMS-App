import { LogOut, Menu, School } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "../DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const user = true;
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 filxed top-0 left-0 right-0 duration-300 z-10 w-full flex items-center justify-between">
      {/* desktop */}
      <div className="max-w-7xl px-20 mx-auto hidden md:flex justify-between items-center gap-10 w-full h-full">
        <div className="flex items-center gap-2">
          <School size={30} />
          <h1 className="hidden md:block mt-1 text-2xl font-extrabold">
            E-Learning
          </h1>
        </div>
        {/* user  icon and dark mode icon */}
        <div className="flex items-center gap-5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Learning</DropdownMenuItem>
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center justify-between w-full">
                    Logout <LogOut />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Button className="w-40">Dashboard</Button>{" "}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Sign Up</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* mobile device */}
      <div className="flex px-5 md:hidden w-full items-center justify-between">
        <h1 className="mt-1 text-2xl font-extrabold">E-Learning</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const [role, setRole] = React.useState("instructor"); // or "instructor"
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="flex flex-col px-5">
        <SheetHeader className="flex flex-row items-center justify-between mt-5 ">
          <SheetTitle>E-Learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator />
        <nav className="flex flex-col space-y-4">
          <span>My Learning</span>
          <span>Edit Profile</span>
          <p>Log out</p>
          {role === "instructor" && <Button>Dashboard</Button>}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
