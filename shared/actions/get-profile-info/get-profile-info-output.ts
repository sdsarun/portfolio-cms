export type Profile = {
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
};

export interface GetProfileInfoOutput {
  profile: Profile;
}
