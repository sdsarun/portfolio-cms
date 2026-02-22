export type UpsertProfileWorkActionInput = {
  projectExperiences: {
    id?: string | null;
    title?: string | null;
    isInProgress?: boolean | null;
    startDate?: string | null;
    endDate?: string | null;
    imageUrl?: string | null;
    description?: string | null;
    tags?: string | null;
    displayOrder?: number | null;
    attachments?: {
      id?: string | null;
      name?: string | null;
      mime?: string | null;
      sha?: string | null;
      content?: string | null;
    }[] | null;
    links?: {
      id?: string | null;
      name?: string | null;
      url?: string | null;
    }[] | null;
  }[];
};
