import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllPlaylists, getPlaylistById, removeProblemToPlaylist, updatePlaylist } from '../controllers/playlist.controller.js';

const playlistRoute = Router();

playlistRoute.get('/', authMiddleware, getAllPlaylists );
playlistRoute.post('/create-playlist', authMiddleware, createPlaylist);
playlistRoute.get('/get-playlist-by-id/:playlistId', authMiddleware, getPlaylistById);
playlistRoute.put('/update-playlist/:playlistId', authMiddleware, updatePlaylist);
playlistRoute.delete('/delete-playlist/:playlistId', authMiddleware, deletePlaylist); 

playlistRoute.post(':playlistId/add-problem', authMiddleware, addProblemToPlaylist);
playlistRoute.post(':playlistId/remove-problem', authMiddleware, removeProblemToPlaylist);


export default playlistRoute;