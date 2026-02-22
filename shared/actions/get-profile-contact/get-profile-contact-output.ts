export type ContactType = "email" | "link" | "other" | string;

export type ContactItem = {
  id: string | null;
  profileId: string | null;
  type: ContactType | null;
  value: string | null;
  label: string | null;
  displayValue: string | null;
  displayOrder: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type GetProfileContactOutput = {
  contacts: ContactItem[];
};
