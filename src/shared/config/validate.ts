import * as Joi from 'joi';

export function validateEnv(config: Record<string, unknown>) {
  
  const stringSchema = Joi.string();

  const requiredStringSchema = stringSchema.required();

  const ProductionRequiredStringSchema = stringSchema.when('ENV', {
    is: 'prod',
    then: Joi.required(),
    otherwise: Joi.optional(),
  });

  const schema = Joi.object({

    ENV: Joi.string().valid('dev', 'prod').required(),

    //FIREBASE_AUTH_EMULATOR_HOST: devRequiredStringSchema,

    FIREBASE_ACCOUNT_TYPE: ProductionRequiredStringSchema,
    FIREBASE_PROJECT_ID: ProductionRequiredStringSchema,
    PRIVATE_KEY_ID: ProductionRequiredStringSchema,
    PRIVATE_KEY: ProductionRequiredStringSchema,
    CLIENT_EMAIL: ProductionRequiredStringSchema,
    CLIENT_ID: ProductionRequiredStringSchema,
    AUTH_URI: ProductionRequiredStringSchema,
    TOKEN_URI: ProductionRequiredStringSchema,
    AUTH_PROVIDER_X509_CERT_URL: ProductionRequiredStringSchema,
    CLIENT_X509_CERT_URL: ProductionRequiredStringSchema,

    DB_TYPE: Joi.string().default('postgres').optional(),
    DB_HOST: requiredStringSchema,
    DB_PORT: Joi.number().default(5432).required(),
    DB_USER: requiredStringSchema,
    DB_PASSWORD: requiredStringSchema,
    DB_NAME: requiredStringSchema


  });

  const { error, value } = schema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });


  if (error) {
    throw new Error(`Environment Validation Error: ${error.message}`);
  }

  return value;

}
