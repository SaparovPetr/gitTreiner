import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMDcontent = createAsyncThunk(
  'md/fetchMDcontent',
  async (file: string) => {
    try {
      const response = await fetch(file);
      const text = await response.text();
      return text;
    } catch (err) {
      throw new Error();
    }
  }
);
