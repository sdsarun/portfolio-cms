// components
import { Main } from "@/shared/layout/main";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { FileQuestion } from "lucide-react";
import { Typography } from "@/shared/ui/typography";
import { Box } from "@/shared/layout/box";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Main className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <Box className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-2">
            <FileQuestion className="h-8 w-8 text-gray-600" />
          </Box>
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
            Page Not Found
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            The page you are looking for does not exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-2">
          <Typography as="p" className="text-sm text-gray-500">
            Please check the URL or go back to the previous page.
          </Typography>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-6">
          <Link href="/">
            <Button>Go to home</Button>
          </Link>
        </CardFooter>
      </Card>
    </Main>
  );
}
