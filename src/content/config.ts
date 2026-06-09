import { defineCollection, z } from 'astro:content';

const SECTIONS = [
  'politica-economia',
  'sociedad',
  'local',
  'ciencia-tecnologia',
  'cultura',
  'deporte',
  'opinion',
  'medios-redes',
] as const;

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    section: z.enum(SECTIONS),
    author: z.string().default('Redaccion Meridiano 104'),
    publishedAt: z.string(),
    sources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().optional(),
        })
      )
      .optional()
      .default([]),
    angle: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { notes };
