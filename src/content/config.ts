import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        publishDate: z.date(),
        category: z.enum(["Psychology", "Research", "Technology", "Insights"]),
        author: z.string(),
        authorRole: z.string(),
        featuredImage: z.string().optional(),
        featured: z.boolean().default(false),
    }),
});

export const collections = { blog };
