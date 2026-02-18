// components
import { MessageAlert, type MessageAlertProps } from "@/shared/ui/alert";

export type UnableToFetchDataAlertProps = Pick<MessageAlertProps, "description">;

export function UnableToFetchDataAlert({ description }: UnableToFetchDataAlertProps) {
  return <MessageAlert title={"Unable to fetch data"} description={description} />;
}
