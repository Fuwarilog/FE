import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import BookmarkModal from "../Map/BookmarkModal";

export default function InfoCard({ place, onBookmark }) {
  const [showModal, setShowModal] = useState(false);
  if (!place) return null;

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
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-1"
          >
            <Bookmark size={16} />
            북마크 추가
          </Button>
        </CardContent>
      </Card>

      {/* ⬇ 모달 조건부 렌더링 */}
      {showModal && (
        <BookmarkModal
          place={place}
          onClose={() => setShowModal(false)}
          onBookmark={onBookmark}
        />
      )}
    </div>
  );
}