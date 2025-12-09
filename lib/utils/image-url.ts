/**
 * Constructs a full CDN URL from a file path
 * If the path is already a full URL (http/https/blob), returns it as-is
 * Otherwise, constructs the full CDN URL using SPACES_CDN_URL or SPACES_ENDPOINT
 */
export function constructImageUrl(
  filePath: string | null | undefined
): string {
  if (!filePath) return "";

  if (
    filePath.startsWith("http://") ||
    filePath.startsWith("https://") ||
    filePath.startsWith("blob:")
  ) {
    return filePath;
  }

  const cdnUrl = process.env.SPACES_CDN_URL
    ? `${process.env.SPACES_CDN_URL}/${filePath}`
    : `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${filePath}`;

  return cdnUrl;
}

/**
 * Checks if a URL is already a full URL (doesn't need CDN construction)
 */
export function isFullUrl(url: string): boolean {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:")
  );
}

