const githubMediaBase =
  "https://media.githubusercontent.com/media/VINITHBUSIPALLI0804/vinith_busipalli_portfolio/main/public";

export function projectVideoUrl(path: string) {
  return `${githubMediaBase}${path.startsWith("/") ? path : `/${path}`}`;
}
