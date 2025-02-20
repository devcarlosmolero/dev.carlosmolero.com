import { BookOpen, Calendar, ChevronRight, Folder, Home, PaintBucket } from "lucide-react";
import { Fragment, ReactNode } from "react";
import { Github } from "react-bootstrap-icons";
import GitHubCalendar from "react-github-calendar";
import { ClientOnly } from "remix-utils/client-only";
import { IComponentWithTranslation } from "~/types/components";
import Button from "../atoms/Button";
import SocialIcons from "../molecules/SocialIcons";
import LanguageSwitcher from "../organisms/LanguageSwitcher";

function getNavLinkData(key: string) {
  switch (key) {
    case "home":
      return {
        icon: <Home className="size-5 duration-500 group-hover:translate-x-3" />,
        pathname: "/"
      }
    case "blog":
      return {
        icon: <BookOpen className="size-5 duration-500 group-hover:translate-x-3" />,
        pathname: "/blog"
      }
    case "resources":
      return {
        icon: <Folder className="size-5 duration-500 group-hover:translate-x-3" />,
        pathname: "/resources"
      }
    case "uxui":
      return {
        icon: <PaintBucket className="size-5 duration-500 group-hover:translate-x-3" />,
        pathname: "https://dribbble.com/devcarlosmolero",
        target: "_blank"
      }
  }
}

function Root({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100vh] items-center justify-center bg-gray-100">
      <div className="min-h-[100vh] w-[1366px] rounded-lg bg-white xl:h-[768px] xl:min-h-[768px] xl:shadow-lg">
        <div className="flex h-full w-full">{children}</div>
      </div>
    </div>
  );
}

function Left({ children, translation }: IComponentWithTranslation & { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col overflow-y-scroll py-6">
      {children}
      <div className="px-5">
        <hr className="my-5 !border-[#E4E4E4]" />
        <div className="flex items-center">
          <div className="flex w-full flex-col items-start gap-5 md:flex-row">
            <div className="w-full flex-col">
              <Github className="mb-2 size-5 text-gray-600" />
              <p className="text-xs text-gray-600">
                {(translation as any).footer.rights}
              </p>
              <div className="group mt-1 flex w-full flex-col items-start gap-x-2 gap-y-2 md:flex-row md:items-center">
                <a
                  target="_blank"
                  className="text-xs text-gray-600 underline underline-offset-4 group-hover:text-black"
                  href={
                    "https://github.com/devcarlosmolero/dev.carlosmolero.com"
                  }
                  rel="noreferrer"
                >
                  {(translation as any).footer.checkTheCode}
                </a>
              </div>
              <div className="mt-5">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Right({ children }: { children: ReactNode }) {
  return (
    <div className="hidden min-h-[100vh] w-[400px] flex-col gap-y-5 border-l border-[#E4E4E4]/50 px-5 py-6 shadow md:flex lg:shadow-none xl:min-h-full">
      {children}
    </div>
  );
}

function BookButton({ translation }: IComponentWithTranslation) {
  return (
    <Button
      url="https://cal.com/devcarlosmolero/hire-me-meeting"
      target="_blank"
      variant="primary"
    >
      <div className="flex w-full items-center gap-x-3 !py-1">
        <div className="rounded-md bg-primary-light p-2">
          <Calendar className="size-5 text-primary" />
        </div>
        <p className="w-full text-start">{translation.bookButton}</p>
        <ChevronRight className="size-6 text-white" />
      </div>
    </Button>
  );
}

function NavLinks({ translation }: IComponentWithTranslation) {
  return (
    <Fragment>
      {" "}
      {(translation.navLinks as unknown as any[]).map((navLink: any) => {
        const data = getNavLinkData(navLink.key)
        return (
          <Button
            className="group !py-0"
            url={data?.pathname}
            variant="ghost"
            target={(data?.target as any) ?? "_self"}
            key={navLink.title}
          >
            {data?.icon}

            <p className="w-full text-start text-sm duration-500 group-hover:translate-x-3">
              {navLink.title}
            </p>
            <ChevronRight className="size-5 duration-500 group-hover:translate-x-3" />
          </Button>
        );
      })}
    </Fragment>
  );
}

function Map() {
  return (
    <div className="aspect-h-9 aspect-w-16">
      <ClientOnly>
        {() => <GitHubCalendar colorScheme="light" username="devcarlosmolero" />}
      </ClientOnly>
    </div>
  );
}

function UserPart({ translation }: IComponentWithTranslation) {
  return (
    <Fragment>
      <div className="flex min-w-[250px] gap-5 rounded-lg p-5 shadow-lg">
        <img
          alt="Carlos Molero"
          className="max-h-[70px] min-h-[70px] min-w-[70px] max-w-[70px]"
          src={"/carlos-molero.png"}
        />
        <div>
          <p className="text-lg">Carlos Molero</p>
          <p className="text-sm">
            {translation.jobTitle}
          </p>
        </div>
      </div>
      <BookButton translation={translation} />
      <NavLinks translation={translation} />
      <hr className="!border-[#E4E4E4]" />
      <Map />
      <SocialIcons />
    </Fragment>
  );
}

const SidebarLayout = {
  Root,
  Left,
  Right,
  NavLinks,
  BookButton,
  Map,
  UserPart,
};

export default SidebarLayout;
