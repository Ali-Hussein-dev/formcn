export const socialLogsUrls = {
  google: {
    src: "https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776",
    label: "Continue with Google",
  },
  apple: {
    src: "https://cdn.brandfetch.io/idnrCPuv87/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1729268375158",
    label: "Continue with Apple",
  },
  github: {
    src: "https://cdn.brandfetch.io/idZAyF9rlg/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1719469980739",
    label: "Continue with GitHub",
  },
  discord: {
    src: "https://cdn.brandfetch.io/idM8Hlme1a/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1668075051777",
    label: "Continue with Discord",
  },
  telegram: {
    src: "https://cdn.brandfetch.io/id68S6e-Gp/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1740375630999",
    label: "Continue with Telegram",
  },
  x: {
    src: "https://cdn.brandfetch.io/idS5WhqBbM/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1692089092800",
    label: "Continue with X",
  },
  linkedin: {
    src: "https://cdn.brandfetch.io/idJFz6sAsl/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1748592533197",
    label: "Continue with LinkedIn",
  },
  microsoft: {
    src: "https://cdn.brandfetch.io/idchmboHEZ/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1727706673120",
    label: "Continue with Microsoft",
  },
  twitch: {
    src: "https://cdn.brandfetch.io/idIwZCwD2f/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1668070397594",
    label: "Continue with Twitch",
  },
  slack: {
    src: "https://cdn.brandfetch.io/idJ_HhtG0Z/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1745381282564",
    label: "Continue with Slack",
  },
  notion: {
    src: "https://cdn.brandfetch.io/idYnkdM3Ni/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667896752278",
    label: "Continue with Notion",
  },
  figma: {
    src: "https://cdn.brandfetch.io/idZHcZ_i7F/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1729268241679",
    label: "Continue with Figma",
  },
  gitlab: {
    src: "https://cdn.brandfetch.io/idw382nG0m/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1740997511848",
    label: "Continue with Gitlab",
  },
  bitbucket: {
    src: "https://cdn.brandfetch.io/idIvTOScJF/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1760877250950",
    label: "Continue with Bitbucket",
  },
  workos: {
    src: "https://cdn.brandfetch.io/idOegYOz05/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1670573458482",
    label: "Continue with WorkOS",
  },
  spotify: {
    src: "https://cdn.brandfetch.io/id20mQyGeY/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1737597212873",
    label: "Continue with Spotify",
  },
  kakao: {
    src: "https://cdn.brandfetch.io/idCn7RQJLo/w/483/h/483/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1758826138366",
    label: "Continue with Kakao",
  },
  facebook: {
    src: "https://cdn.brandfetch.io/idpKX136kp/w/2084/h/2084/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1758525490502",
    label: "Continue with Facebook",
  },
} as const;

export const socialLogos = Object.values(socialLogsUrls);
export const socialKeys = Object.keys(socialLogsUrls) as (keyof typeof socialLogsUrls)[];
