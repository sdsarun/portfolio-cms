"use client";

// core
import { use, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";

// components
import { Key, Plus, Trash2 } from "lucide-react";
import { Box } from "@/shared/layout/box";
import { ManagePageConfig } from "@/features/manage/constants/page-config";
import { useAction } from "@/shared/hooks/use-action";
import { useModalState } from "@/shared/hooks/use-modal-state";
import { Messages } from "@/shared/constants/messages";
import { UnableToFetchDataAlert } from "@/shared/ui/alert/alert-fetch-failed";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ConfirmDialog } from "@/shared/ui/dialogs/confirm-dialog";
import { DataTable } from "@/shared/ui/data-table/data-table";
import { toast } from "@/shared/ui/sonner";
import { CreateApiKeyDialog } from "@/features/manage/components/manage-api-keys/create-api-key-dialog";

// utils
import { DateFormatter } from "@/shared/utils/formatter/date-formatter";

// actions
import { revokeApiKeysAction } from "@/shared/actions/revoke-api-keys/revoke-api-keys-action";
import { deleteApiKeyByIdAction } from "@/shared/actions/delete-api-key-by-id/delete-api-key-by-id-action";
import { getApiKeysAction } from "@/shared/actions/get-api-keys/get-api-keys-action";
import type { ActionOutput } from "@/shared/utils/action/create-action";
import type { GetApiKeysActionOutput } from "@/shared/actions/get-api-keys/get-api-keys-output";

type ManageApiKeysProps = {
  initialApiKeysPromise: Promise<ActionOutput<GetApiKeysActionOutput>>;
  initialPage: number;
  initialPageSize: number;
};

type ApiKeyRow = GetApiKeysActionOutput["data"][number];

type ConfirmDeletePayload = {
  id: string | null;
  keyRef: string;
};

type ConfirmRevokePayload = {
  id: string | null;
  keyRef: string;
};

type CreateModalPayload = {
  seed: null;
};

const DEFAULT_PAGE_SIZE = ManagePageConfig.apiKeys.pagination.defaultPageSize;

export function ManageApiKeys({
  initialApiKeysPromise,
  initialPage,
  initialPageSize
}: ManageApiKeysProps) {
  const initialResponse = use(initialApiKeysPromise);
  console.log("[LOG] - manage-api-keys.tsx:63 - ManageApiKeys - initialResponse:", initialResponse);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, startTransition] = useTransition();

  const { execute: fetchApiKeys, isLoading: isFetching } = useAction(getApiKeysAction);
  const { execute: revokeApiKeys, isLoading: isRevoking } = useAction(revokeApiKeysAction);
  const { execute: deleteApiKey, isLoading: isDeleting } = useAction(deleteApiKeyByIdAction);

  const [responseState, setResponseState] = useState(initialResponse);

  const createModal = useModalState<CreateModalPayload>({
    payload: { seed: null }
  });

  const deleteModal = useModalState<ConfirmDeletePayload>({
    payload: {
      id: null,
      keyRef: ""
    }
  });

  const revokeModal = useModalState<ConfirmRevokePayload>({
    payload: {
      id: null,
      keyRef: ""
    }
  });

  const pagination = useMemo(
    () =>
      responseState.success ?
        responseState.data.meta.pagination
      : {
          offset: 0,
          limit: DEFAULT_PAGE_SIZE,
          total: 0
        },
    [responseState]
  );

  const items = responseState.success ? responseState.data.data : [];

  const columns = useMemo<ColumnDef<ApiKeyRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <span className="font-medium">{row.original.name || "-"}</span>,
        meta: {
          classNames: {
            head: "w-[20%]",
            cell: "w-[20%]"
          }
        }
      },
      {
        accessorKey: "keyRef",
        header: "Key Reference",
        cell: ({ row }) => (
          <Box className="flex items-center gap-2">
            <Key className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-xs">{row.original.keyRef}</span>
          </Box>
        ),
        meta: {
          classNames: {
            head: "w-[30%]",
            cell: "w-[30%]"
          }
        }
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {DateFormatter.format(row.original.createdAt, {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric"
            })}
          </span>
        ),
        meta: {
          classNames: {
            head: "hidden md:table-cell w-[20%]",
            cell: "hidden md:table-cell w-[20%]"
          }
        }
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <span
            className={
              row.original.status === "active" ?
                "inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
              : "inline-flex rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700"
            }
          >
            {row.original.status}
          </span>
        ),
        meta: {
          classNames: {
            head: "w-[10%]",
            cell: "w-[10%]"
          }
        }
      },
      {
        id: "actions",
        header: () => <Box className="text-right">Actions</Box>,
        cell: ({ row }) => (
          <Box className="flex justify-end gap-2">
            {row.original.status === "active" && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isRevoking}
                onClick={() =>
                  revokeModal.open({
                    id: row.original.id,
                    keyRef: row.original.keyRef
                  })
                }
              >
                Revoke
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() =>
                deleteModal.open({
                  id: row.original.id,
                  keyRef: row.original.keyRef
                })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </Box>
        ),
        meta: {
          classNames: {
            head: "w-[20%]",
            cell: "w-[20%]"
          }
        }
      }
    ],
    [deleteModal, isRevoking, revokeModal]
  );

  const updateQuery = (nextPage: number, nextPageSize: number) => {
    if (nextPage === initialPage && nextPageSize === initialPageSize) {
      return;
    }

    const nextQuery = new URLSearchParams(searchParams.toString());
    nextQuery.set("page", String(nextPage));
    nextQuery.set("pageSize", String(nextPageSize));

    startTransition(() => {
      router.replace(`${pathname}?${nextQuery.toString()}`, { scroll: false });
    });
  };

  const refresh = async (nextPage = initialPage, nextPageSize = initialPageSize) => {
    const nextOffset = Math.max(0, (nextPage - 1) * nextPageSize);
    const result = await fetchApiKeys({
      offset: nextOffset,
      limit: nextPageSize
    });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setResponseState(result);
    updateQuery(nextPage, nextPageSize);
  };

  const handleRevoke = async () => {
    const id = revokeModal.state.payload.id;
    if (!id) {
      return;
    }

    const result = await revokeApiKeys({ ids: [id] });
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    if (result.data.failed.length > 0) {
      toast.error(Messages.apiKeys.toast.revokeFailed);
      return;
    }

    toast.success(Messages.apiKeys.toast.revoked);
    revokeModal.close({ id: null, keyRef: "" });
    await refresh(initialPage, initialPageSize);
  };

  const handleDelete = async () => {
    const id = deleteModal.state.payload.id;
    if (!id) {
      return;
    }

    const result = await deleteApiKey({ id });
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(Messages.apiKeys.toast.deleted);
    deleteModal.close({ id: null, keyRef: "" });

    const totalAfterDelete = Math.max(0, pagination.total - 1);
    const lastAvailablePage = Math.max(1, Math.ceil(totalAfterDelete / initialPageSize));
    const nextPage = Math.min(initialPage, lastAvailablePage);
    await refresh(nextPage, initialPageSize);
    updateQuery(nextPage, initialPageSize);
  };

  if (!responseState.success) {
    return <UnableToFetchDataAlert description={responseState.message} />;
  }

  return (
    <Box className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <Box>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Create and revoke API keys used by external clients.</CardDescription>
          </Box>

          <Button type="button" size="sm" onClick={() => createModal.open()}>
            <Plus className="h-4 w-4" /> Create Key
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <Box className="rounded-md border">
            <DataTable
              columns={columns}
              data={items}
              emptyMessage="No API keys found."
              pagination={{
                page: initialPage,
                pageSize: initialPageSize,
                total: pagination.total,
                isLoading: isFetching || isNavigating,
                onPageChange: async (page) => {
                  updateQuery(page, initialPageSize);
                },
                onPageSizeChange: async (nextPageSize) => {
                  updateQuery(1, nextPageSize);
                }
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <CreateApiKeyDialog
        open={createModal.state.isOpen}
        onOpenChange={(open) => {
          if (open) {
            createModal.open();
            return;
          }

          createModal.close();
        }}
        onCreated={async () => {
          await refresh(1, initialPageSize);
          updateQuery(1, initialPageSize);
        }}
      />

      <ConfirmDialog
        open={deleteModal.state.isOpen}
        title={Messages.apiKeys.dialog.deleteTitle}
        confirmLabel={Messages.common.dialog.confirmDelete}
        cancelLabel={Messages.common.dialog.cancel}
        isConfirmLoading={isDeleting}
        onOpenChange={(open) => {
          if (!open) {
            deleteModal.close();
          }
        }}
        onConfirm={handleDelete}
      />

      <ConfirmDialog
        open={revokeModal.state.isOpen}
        title={Messages.apiKeys.dialog.revokeTitle}
        confirmLabel={Messages.apiKeys.dialog.revokeConfirm}
        cancelLabel={Messages.common.dialog.cancel}
        isConfirmLoading={isRevoking}
        description={
          <>
            Are you sure you want to revoke <strong>{revokeModal.state.payload.keyRef}</strong>? This
            action cannot be undone and clients using this key will lose access immediately.
          </>
        }
        onOpenChange={(open) => {
          if (!open) {
            revokeModal.close();
          }
        }}
        onConfirm={handleRevoke}
      />
    </Box>
  );
}
