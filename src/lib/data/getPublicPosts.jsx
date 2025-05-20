// src/lib/data/getPublicPosts.js
import { mockDiaryContents, mockUser } from "../../data/sample";

export function getPublicPosts() {
  return Object.entries(mockDiaryContents)
    .filter(([_, d]) => d.isPublic)
    .map(([date, d], index) => ({
      id: index + 1,
      title: d.content.slice(0, 20) + "...",
      userName: mockUser.name,
      date: date.replace(/-/g, "."),
      views: Math.floor(Math.random() * 100),
      likes: Math.floor(Math.random() * 30),
    }));
}
