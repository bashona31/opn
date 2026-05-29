import { Rocket } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-glow animate-pulse">
          <Rocket className="h-8 w-8 text-white" />
        </div>
        <div className="h-2 w-32 animate-pulse rounded-full bg-primary/20" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-primary-100/50 bg-white p-6 shadow-card">
      <div className="space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-primary-100/50" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-primary-100/30" />
        <div className="h-3 w-full animate-pulse rounded-full bg-primary-100/20" />
      </div>
    </div>
  );
}
