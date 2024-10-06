import z from 'zod';

export const organizationSchema = z.object({
  organizationId: z.string(),
  subdomain: z.string().min(1, 'Organization name is required'),
  organizationName: z.string().min(1, 'Organization name is required'),
  organizationPanCard: z.string().min(1, 'PAN card is required'),
  organizationMail: z.string().email('Invalid email address'),
  organizationType: z.string().min(1, 'Organization type is required'),
  organizationWebsite: z.string().url('Invalid website URL'),
});
