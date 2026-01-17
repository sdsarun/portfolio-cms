import { Main } from "@/shared/layout/main";

export type AuthMainContentProps = React.PropsWithChildren;

export function AuthMainContent({ children }: AuthMainContentProps) {
  return <Main variant="authPage">{children}</Main>;
}
