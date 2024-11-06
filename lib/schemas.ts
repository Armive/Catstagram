import { z } from "zod";

export const User = z.object({
	name: z.string(),
	email: z.string().email().min(5).max(60),
	password: z.string().min(6).max(30),
	day: z.number().lt(31).gt(1),
	month: z.number().lt(12).gt(1),
	year: z.number().gt(1950).lt(2014),
	gender: z.enum(["male", "female", "none"]).nullish(),
	handle: z.string().min(5).max(30),
});

export const LoginUser = z.object({
	email: z.string().email().min(5).max(60),
	password: z.string().min(6).max(30),
});

export type SignUpType = z.infer<typeof User>;
export type LoginType = z.infer<typeof LoginUser>;
