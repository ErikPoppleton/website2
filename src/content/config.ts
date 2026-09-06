import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),

      // Reviews: set postType to "review" and fill in rating + reviewOf.
      postType: z.enum(['post', 'review']).default('post'),
      rating: z.number().min(0).max(5).multipleOf(0.5).optional(),
      reviewOf: z
        .object({
          title: z.string(),
          creator: z.string(),
          kind: z.enum(['book', 'album', 'film', 'game', 'other']).default('other'),
          year: z.number().int().optional(),
        })
        .optional(),
    })
    .refine((data) => data.postType !== 'review' || data.rating !== undefined, {
      message: 'Posts with postType "review" must have a rating.',
      path: ['rating'],
    }),
});

export const collections = { blog };
