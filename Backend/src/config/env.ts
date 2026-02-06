export const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  
  if (!value) {
    throw new Error(`La variable de entorno ${key} no está definida`);
  }
  
  return value;
};