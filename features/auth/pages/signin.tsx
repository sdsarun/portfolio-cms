// components
import { Main } from "@/shared/layout/main";
import { SignInForm } from "@/features/auth/components/signin-form/signin-form";

export default async function SignInPage() {
  return (
    <Main>
      <SignInForm />
    </Main>
  );
}
