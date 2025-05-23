import { mockDiaryContents, mockUser } from "../data/sample";

export function getPublicPosts() {
  return Object.entries(mockDiaryContents)
    .filter(([_, d]) => d.isPublic)
    .map(([date, d], index) => {
      const id = index + 1;
      const storedViews = parseInt(localStorage.getItem(`views_${id}`)) || 0;
      return {
        id,
        title: d.content.slice(0, 20) + "...",
        userName: mockUser.name,
        date: date.replace(/-/g, "."),
        views: storedViews,
        likes: Math.floor(Math.random() * 30),
      };
    });
}
