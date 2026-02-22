import { AuthMainContent } from "@/features/auth/components/layout/auth-main-content";
import { Box } from "@/shared/layout/box";
import { Skeleton } from "@/shared/ui/skeleton";

export type AuthPageLoadingShellProps = React.PropsWithChildren<{
  title: React.ReactNode;
  description?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}>;

export function AuthPageLoadingShell({
  children,
  title,
  description,
  rightContent,
  className = "flex flex-col gap-6"
}: AuthPageLoadingShellProps) {
  return (
    <AuthMainContent
      title={title}
      description={description}
      rightContent={rightContent}
      classNames={{ root: className }}
    >
      {children}
    </AuthMainContent>
  );
}

export function AuthPageHeaderBadgeSkeleton() {
  return (
    <Box className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
      <Skeleton className="h-3 w-3 rounded-full" />
      <Skeleton className="h-4 w-40" />
    </Box>
  );
}
