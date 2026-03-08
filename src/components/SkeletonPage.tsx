import { Skeleton } from "@/components/ui/skeleton";

const SkeletonPage = () => (
  <div className="min-h-screen bg-background">
    {/* Navbar skeleton */}
    <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border h-20 flex items-center px-6 md:px-12 justify-between max-w-7xl mx-auto">
      <Skeleton className="h-10 w-32 rounded-md" />
      <div className="hidden md:flex gap-8">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-4 w-16 rounded" />
        ))}
      </div>
    </div>

    <div className="pt-20">
      {/* Hero skeleton */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-6">
        <Skeleton className="h-6 w-48 rounded" />
        <Skeleton className="h-16 w-[70%] max-w-2xl rounded-lg" />
        <Skeleton className="h-16 w-[50%] max-w-xl rounded-lg" />
        <Skeleton className="h-5 w-[60%] max-w-lg rounded mt-4" />
        <Skeleton className="h-12 w-40 rounded-full mt-6" />
      </div>

      {/* Client logos skeleton */}
      <div className="py-12 flex items-center justify-center gap-8 flex-wrap px-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-12 w-24 rounded" />
        ))}
      </div>

      {/* About skeleton */}
      <div className="py-20 px-6 max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-[85%] rounded" />
        <Skeleton className="h-4 w-[70%] rounded" />
        <Skeleton className="h-64 w-full rounded-xl mt-8" />
      </div>

      {/* Services skeleton */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <Skeleton className="h-8 w-40 rounded mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 p-6">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-[80%] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonPage;
