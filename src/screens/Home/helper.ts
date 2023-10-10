export const ensureHttpsForImageUri = (
  uri: string | undefined,
): string | undefined => {
  if (uri && uri.startsWith('http://')) {
    return uri.replace(/^http:\/\//i, 'https://');
  }
  return uri;
};
