export type UpsertProfileResumeActionInput = {
  resumeUrl?: string | null;
  workExperiences?: {
    id?: string | null;
    jobTitle?: string | null;
    companyName?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    isCurrent?: boolean | null;
    description?: string | null;
    displayOrder?: number | null;
  }[];
  skills?: {
    id?: string | null;
    categoryName?: string | null;
    skillNames?: string | null;
    displayOrder?: number | null;
  }[];
  education?: {
    id?: string | null;
    institution?: string | null;
    startDate?: string | null;
    displayOrder?: number | null;
  }[];
  certification?: {
    id?: string | null;
    name?: string | null;
    issuer?: string | null;
    completeDate?: string | null;
    displayOrder?: number | null;
  }[];
};
