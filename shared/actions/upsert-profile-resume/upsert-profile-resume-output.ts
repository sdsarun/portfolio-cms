export type UpsertProfileResumeActionOutput = {
  profile: {
    authId: string | null;
    id: string | null;
    displayName: string | null;
    roleName: string | null;
    bioTitle: string | null;
    bioDescription: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    resumeUrl: string | null;
    siteUrl: string | null;
  } | null;
  workExperiences: {
    id: string | null;
    profileId: string | null;
    jobTitle: string | null;
    companyName: string | null;
    startDate: string | null;
    endDate: string | null;
    isCurrent: boolean | null;
    description: string | null;
    displayOrder: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
  }[];
  skills: {
    id: string | null;
    profileId: string | null;
    categoryName: string | null;
    skillNames: string | null;
    displayOrder: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
  }[];
  education: {
    id: string | null;
    profileId: string | null;
    major: string | null;
    institution: string | null;
    startDate: string | null;
    endDate: string | null;
    displayOrder: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
  }[];
  certification: {
    id: string | null;
    profileId: string | null;
    name: string | null;
    issuer: string | null;
    completeDate: string | null;
    displayOrder: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
  }[];
};
