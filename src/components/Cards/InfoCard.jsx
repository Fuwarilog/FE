import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Button } from "../ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import BookmarkModal from "../Map/BookmarkModal";
import BookmarkDeleteModal from "../Map/BookmarkDeleteModal";

export default function InfoCard({ place, diaryListId, tags = [], onBookmark }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isBookmarked = useMemo(() => {
    if (!place) return false;

    return tags.some((tag) => {
      const isSameName = tag.place_name === place.name;
      const isSameCoords =
        Math.abs(tag.latitude - place.location?.lat) < 0.0001 &&
        Math.abs(tag.longitude - place.location?.lng) < 0.0001;
      return isSameName && isSameCoords;
    });
  }, [tags, place]);

  return (
    <div className="absolute bottom-6 left-6 z-50 w-[320px]">
      <Card className="shadow-lg border border-border bg-background rounded-xl font-gangwon">
        <CardHeader className="pt-6 pb-2">
          <CardTitle className="text-[24px]">{place.name}</CardTitle>
          <CardDescription className="text-[15px] text-muted-foreground">
            {place.address}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 pb-4 px-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (isBookmarked) {
                setShowDeleteModal(true);
              } else {
                setShowAddModal(true);
              }
            }}
            className="w-full flex items-center justify-center gap-1"
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck size={16} /> 북마크 취소
              </>
            ) : (
              <>
                <Bookmark size={16} /> 북마크 추가
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* 북마크 추가 모달 */}
      {showAddModal && (
        <BookmarkModal
          place={place}
          onClose={() => setShowAddModal(false)}
          onBookmark={() => {
            onBookmark?.();
            setShowAddModal(false);
          }}
        />
      )}

      {/* 북마크 취소 모달 */}
      {showDeleteModal && (
        <BookmarkDeleteModal
          place={place}
          diaryListId={diaryListId}
          open={true}
          onClose={() => setShowDeleteModal(false)}
          onDeleted={() => {
            onBookmark?.();
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}
