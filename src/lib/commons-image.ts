/** Build stable image URLs from Wikimedia Commons file-page links (works outside Lovable hosting). */
export function commonsFileUrl(filePageUrl: string): string {
  try {
    const parsed = new URL(filePageUrl);
    const marker = "/wiki/File:";
    const index = parsed.pathname.indexOf(marker);
    if (index < 0) return filePageUrl;
    const fileName = decodeURIComponent(parsed.pathname.slice(index + marker.length));
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName).replace(/%2F/g, "/")}`;
  } catch {
    return filePageUrl;
  }
}

export function photoFromCommons(alt: string, author: string, license: string, url: string) {
  return { src: commonsFileUrl(url), alt, credit: { author, license, url } };
}
