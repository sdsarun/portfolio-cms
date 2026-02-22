export type ProjectLink = {
  id: string | null;
  projectId: string | null;
  name: string | null;
  url: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type ProjectAttachment = {
  id: string | null;
  name: string | null;
  storageType: string | null;
  storageProvider: string | null;
  size: number | null;
  mime: string | null;
  sha: string | null;
  storedPath: string | null;
  streamUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type ProjectExperience = {
  id: string | null;
  profileId: string | null;
  title: string | null;
  isInProgress: boolean | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  tags: string | null;
  displayOrder: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  links: ProjectLink[];
  attachments: ProjectAttachment[];
};

export type GetProfileWorkOutput = {
  projectExperiences: ProjectExperience[];
};
