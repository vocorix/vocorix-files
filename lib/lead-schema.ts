import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).optional(),
  interest: z.enum(["voice-ai", "workflow-automation", "system-integration", "other"]),
  message: z.string().trim().min(20).max(3000),
  website: z.string().max(200).optional()
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
