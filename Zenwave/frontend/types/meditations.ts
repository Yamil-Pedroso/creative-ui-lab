export interface Meditation {
  _id: string;
  title: string;
  category: string;
  duration: number;
  level: string;
  description: string;

  image: string;
  fullImageUrl: string;

  video?: string;
  fullVideoUrl?: string;

  audioUrl: string;
  likes: number;
}

export interface CreateMeditationDTO {
  title: string;
  category: string;
  duration: number;
  level: string;
  description: string;
  audioUrl: string;
  image: string;
  video?: string;
}

export interface UpdateMeditationDTO {
  title?: string;
  category?: string;
  duration?: number;
  level?: string;
  description?: string;
  audioUrl?: string;
  image?: string;
  video?: string;
}
