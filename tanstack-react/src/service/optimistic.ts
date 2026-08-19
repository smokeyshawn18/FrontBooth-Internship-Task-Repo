// service/optimistic.ts
import { QueryClient, type QueryKey } from "@tanstack/react-query";

type Snapshot = [QueryKey, unknown];

export const snapshotAndCancel = async (
  queryClient: QueryClient,
  keys: QueryKey[],
) => {
  await Promise.all(
    keys.map((key) => queryClient.cancelQueries({ queryKey: key })),
  );

  const snapshots: Snapshot[] = keys.map((key) => [
    key,
    queryClient.getQueryData(key),
  ]);

  const rollback = () => {
    snapshots.forEach(([key, data]) => queryClient.setQueryData(key, data));
  };

  return { rollback };
};
