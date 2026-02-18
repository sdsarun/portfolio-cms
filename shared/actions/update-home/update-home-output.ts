export type UpdateHomeActionOutput = {
  profile: {
    authId: string | null;
    id: string | null;
    displayName: string | null;
    roleName: string | null;
    bioTitle: string | null;
    bioDescription: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    resumeUrl: string | null;
    siteUrl: string | null;
  };
};
