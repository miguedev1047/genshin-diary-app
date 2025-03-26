export function toLink(url: string | null | undefined) {
  if (!url) return url

  const URLS = ['https://homdgcat.wiki/', 'https://gi.yatta.moe/']

  const matchingURL = URLS.find((baseURL) => url.startsWith(baseURL))

  if (matchingURL) {
    const partLink = url.split('/')[5]
    const newURL = `https://enka.network/ui/${partLink}`
    return newURL
  }

  return url
}
