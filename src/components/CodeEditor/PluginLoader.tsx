import { Suspense, lazy, useMemo } from "react";

export const PluginLoader = ({ pluginId }: { pluginId: string }) => {
  const PluginComponent = useMemo(
    () => lazy(() => import(`../../plugins/${pluginId}/Plugin.tsx`)),
    []
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PluginComponent />
    </Suspense>
  );
};
