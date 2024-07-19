import React from "react";
import type { Preview } from "@storybook/react";
import { MemoryRouter } from "react-router";

import '../src/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;
