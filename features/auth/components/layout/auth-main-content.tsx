// components
import { Box } from "@/shared/layout/box";
import { Main } from "@/shared/layout/main";
import { Typography } from "@/shared/ui/typography";

export type AuthMainContentProps = React.PropsWithChildren<{
  title?: React.ReactNode;
  description?: React.ReactNode;
  rightContent?: React.ReactNode;
  classNames?: {
    root?: string;
  };
}>;

export function AuthMainContent({
  title,
  description,
  rightContent,
  children,
  classNames
}: AuthMainContentProps) {
  const showHeader = !!title || !!description || !!rightContent;
  return (
    <Main variant="authPage" className={classNames?.root}>
      {showHeader && (
        <Box className="flex items-center justify-between mb-6">
          <Box className="flex flex-col gap-1">
            {title && (
              <Typography
                as="h1"
                className="text-3xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
              >
                {title}
              </Typography>
            )}
            {description && <Typography className="text-muted-foreground">{description}</Typography>}
          </Box>
          {rightContent}
        </Box>
      )}
      {children}
    </Main>
  );
}
