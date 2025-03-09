import { create } from 'zustand';
import { initDatabase, fetchVideos, insertVideo, deleteVideo, updateById } from './db';
import { VideoType } from '@/constants/types';


type VideoStore = {
    videos: VideoType[];
    loadVideos: () => Promise<void>;
    addVideo: (name: string, description: string, video: string) => Promise<void>;
    updateVideo: (id: string, name: string, description: string, video: string) => Promise<void>;
    removeVideo: (id: number) => Promise<void>;
};

// Initialize database
initDatabase();

export const useVideoStore = create<VideoStore>((set) => ({
    videos: [],

    loadVideos: async () => {
        const data = await fetchVideos() as VideoType[];
        set({ videos: data });
    },

    addVideo: async (name, description, video) => {
        await insertVideo(name, description, video);
        const data = await fetchVideos() as VideoType[];
        set({ videos: data });
    },

    updateVideo: async (id, name, description, video) => {
        await updateById(id, name, description, video);
        const data = await fetchVideos() as VideoType[];
        set({ videos: data });
    },

    removeVideo: async (id) => {
        await deleteVideo(id);
        const data = await fetchVideos() as VideoType[];
        set({ videos: data });
    },
}));
