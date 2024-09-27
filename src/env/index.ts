import config from 'dotenv';
import z from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    HOST: z.string().default('0.0.0.0'),
    NODE_ENV: z.enum(['dev','test','prod'])
});

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    throw new Error(`Invalid environment variables: ${_env.error.format()}`)
}

export const env = _env.data