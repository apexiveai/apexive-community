import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://www.apexiveai.com";

  return [

    {

      url: baseUrl,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 1,

    },

    {

      url: `${baseUrl}/forums`,

      lastModified: new Date(),

      changeFrequency: "daily",

      priority: 0.9,

    },

    {

      url: `${baseUrl}/articles`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.8,

    },

    {

      url: `${baseUrl}/projects`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.8,

    },

    {

      url: `${baseUrl}/resources`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.8,

    },

    {

      url: `${baseUrl}/pricing`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.8,

    },

    {

      url: `${baseUrl}/search`,

      lastModified: new Date(),

      changeFrequency: "monthly",

      priority: 0.5,

    },

    {

      url: `${baseUrl}/trademark-intelligence`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.8,

    },

    {

      url: `${baseUrl}/workforce`,

      lastModified: new Date(),

      changeFrequency: "weekly",

      priority: 0.8,

    },

  ];

}