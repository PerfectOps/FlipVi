export interface VideoItem {
    path: string;
    thumbnail: string;
    date: string;
  }
  
export interface VideoLoadError {
    message: string;
    path: string;
}
  
export interface VideoStats {
    ctime: string;
    mtime: string;
    size: number;
}