import { z } from "zod";

const tagSchemaValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailSchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  description: z.string(),
});
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    price: z.number(),
    tags: z.array(tagSchemaValidation),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: detailSchema,
  }),
});

export const CourseValidationSchema = {
  createCourseValidationSchema,
};
