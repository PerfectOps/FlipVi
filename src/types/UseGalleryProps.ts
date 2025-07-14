
export interface UseGalleryProps {
  galleryVideos: string[];
  removeFromGallery: (path: string) => Promise<void>;
}