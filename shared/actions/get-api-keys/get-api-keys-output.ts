export type GetApiKeysActionOutput = {
  data: {
    id: string;
    name: string;
    keyRef: string;
    createdAt: string;
    status: "active" | "revoked";
  }[];
  meta: {
    pagination: {
      offset: number;
      limit: number;
      total: number;
    };
  };
};
