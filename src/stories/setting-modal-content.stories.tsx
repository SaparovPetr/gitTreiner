import type { Meta, StoryObj } from '@storybook/react';

import SettingModalContent from '../components/setting-modal-content/setting-modal-content';

const meta = {
  title: 'components/SettingModalContent',
  component: SettingModalContent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof SettingModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSettingModalContent: Story = {};
