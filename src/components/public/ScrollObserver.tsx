import React from "react";
export function ScrollObserver({
  hasMore,
  observerTarget,
  loading,
}: {
  hasMore: boolean;
  observerTarget: React.RefObject<HTMLDivElement>;
  loading: boolean;
}) {
  return (
    <>
      {hasMore && (
        <div
          className="flex h-12 items-center justify-center"
          ref={observerTarget}
        >
          {loading && (
            <p className="text-white-3 font-semibold">Loading items . . .</p>
          )}
        </div>
      )}
    </>
  );
}
