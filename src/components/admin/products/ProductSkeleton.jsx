import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">

      <div className="border-b p-4">

        <Skeleton className="h-8 w-56" />

      </div>

      <div className="divide-y">

        {Array.from({ length: 8 }).map((_, index) => (

          <div
            key={index}
            className="flex items-center gap-6 p-4"
          >

            <Skeleton className="h-14 w-14 rounded-lg" />

            <Skeleton className="h-5 w-40" />

            <Skeleton className="h-5 w-28" />

            <Skeleton className="h-5 w-20" />

            <Skeleton className="h-5 w-20" />

            <Skeleton className="h-5 w-16" />

            <Skeleton className="h-8 w-20 rounded-full" />

            <Skeleton className="h-8 w-24 rounded-full" />

            <Skeleton className="h-8 w-20 rounded-full" />

            <Skeleton className="h-5 w-28" />

            <div className="ml-auto flex gap-2">

              <Skeleton className="h-9 w-9 rounded-md" />

              <Skeleton className="h-9 w-9 rounded-md" />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}