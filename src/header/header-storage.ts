import { z } from 'zod';

import { headerSchema } from './header-schema';

export const HEADER_STORAGE_KEY = 'headers';

export type HeaderData = z.infer<typeof headerSchema>;
