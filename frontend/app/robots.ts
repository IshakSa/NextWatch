import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/impressum",
        "/privacy-content.html",
        "/privacy",
        "/terms-of-service-content.html",
        "/tos",
      ],
    },
  };
}
