import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCardModel } from '../types/types';

export type FormState = {
  formValues: UserCardModel[];
};

const initialState: FormState = {
  formValues: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserCardModel>) => {
      state.formValues.push(action.payload);
    },
  },
});

export const { addUser } = formSlice.actions;

export default formSlice.reducer;
