import { createSlice } from '@reduxjs/toolkit';
import { ImageInfo } from '../types/types';
import { fetchImageData } from './thunks';

export type DetailState = {
  isLoading: boolean;
  error: string;
  imageInfo: ImageInfo | null;
  imageUrl: string;
};

const initialState: DetailState = {
  isLoading: true,
  error: '',
  imageInfo: null,
  imageUrl: '',
};

export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImageData.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(fetchImageData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.imageInfo = action.payload.imageInfo;
      state.imageUrl = action.payload.imageUrl;
    });
    builder.addCase(fetchImageData.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Error occured';
      state.imageInfo = null;
      state.imageUrl = '';
    });
  },
});

export default detailSlice.reducer;
