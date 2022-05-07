import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { flickr } from '../common/flickr';
import { ImageInfo, SearchInfoParams, ImageSize } from '../types/types';

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

export const fetchImageData = createAsyncThunk(
  'detail/fetchImageData',
  async (currentImageId: string, { rejectWithValue }) => {
    const params: SearchInfoParams = {
      photo_id: currentImageId,
    };

    try {
      const fetchedImageInfo = await flickr('photos.getInfo', params);
      const imageInfo = fetchedImageInfo.photo;
      const fetchedImageSizes = await flickr('photos.getSizes', params);
      const sizes = fetchedImageSizes.sizes.size;
      const imageUrl = sizes
        .reverse()
        .filter((s: ImageSize) => s.label === 'Small' || s.label === 'Large')[0].source;

      return { imageInfo, imageUrl };
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

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
