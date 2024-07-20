import {configFromProcessEnv, FieldType} from 'core';

const env = configFromProcessEnv({
  RZD_API_URL: FieldType.String,
}, {});

export const RZD_API_URL = env.RZD_API_URL;