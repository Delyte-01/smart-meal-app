// components/LoadMoreButton.tsx
type LoadMoreButtonProps = {
  onClick: () => void;
  hasMore: boolean;
};

export default function LoadMoreButton({
  onClick,
  hasMore,
}: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-6">
      {hasMore && (
        <button
          onClick={onClick}
          className="mt-4 px-4 py-2 bg-primary text-green-600 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}
// This component can be used to load more items in a list or grid view.