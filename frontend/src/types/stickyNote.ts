export interface StickyNote {
  id: number;
  sender: number;
  receiver: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}