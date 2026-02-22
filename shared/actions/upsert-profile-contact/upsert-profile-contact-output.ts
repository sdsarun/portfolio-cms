import type { ContactItem } from "@/shared/actions/get-profile-contact/get-profile-contact-output";

export type UpsertProfileContactActionOutput = {
  contacts: ContactItem[];
};
