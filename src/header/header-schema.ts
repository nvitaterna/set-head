import { z } from 'zod';

export const headerSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, {
      message: 'Header cannot be applied without a name',
    })
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      'Name must be alphanumeric with dashes or underscores',
    ),
  value: z.string(),
  active: z.boolean().default(true),
  outgoing: z.boolean().default(true),
});
