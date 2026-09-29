import Link from "next/link";
import Image from "next/image";

import SiteHeader from "@/components/SiteHeader";

import {

  getFeaturedArticles,

  getFeaturedProjects,

  getFeaturedResources,

  type Article,

  type Project,

  type Resource,

} from "@/lib/api";

type Thread = {

  id: number;

  title: string;

  slug: string;

  content: string;

  category_id: number;

  author_id: number;

  views: number;

  created_at: string;

  updated_at: string;

};
import API_URL from "@/lib/api";

async function getLatestThreads(): Promise<Thread[]> {

  try {

    const response = await fetch(`${API_URL}/api/threads`, {

      cache: "no-store",

    });

    if (!response.ok) {

      return [];

    }

    return response.json();

  } catch {

    return [];

  }

}

function formatDate(value: string) {

  return new Date(value).toLocaleDateString("en-US", {

    month: "short",

    day: "numeric",

    year: "numeric",

  });

}

export default async function HomePage() {

  const [articles, projects, resources, threads] =
    await Promise.all([
      getFeaturedArticles().catch(() => []),
      getFeaturedProjects().catch(() => []),
      getFeaturedResources().catch(() => []),
      getLatestThreads(),
    ]);

  const featuredArticles = articles.slice(0, 3);

  const featuredProjects = projects.slice(0, 3);

  const latestResources = resources.slice(0, 4);

  const latestThreads = threads.slice(0, 5);

  return (

    <div className="min-h-screen bg-white text-slate-900">

      <SiteHeader />

      {/* Hero */}

      <section className="border-b border-slate-200 bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">

              Apexive Community

            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">

              Build. Share. Learn.

              <span className="block text-blue-600">

                Grow with the community.

              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">

              A technical community for developers, engineers, builders,

              researchers, and technology professionals to discuss ideas,

              publish knowledge, build projects, and share useful resources.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link

                href="/forums"

                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"

              >

                Explore Forums

              </Link>

              <Link

                href="/articles"

                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"

              >

                Read Articles

              </Link>

              <Link

                href="/projects"

                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"

              >

                Explore Projects

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 sm:grid-cols-4">

          <div className="px-6 py-8 text-center">

            <div className="text-3xl font-bold text-slate-950">

              {latestThreads.length}

            </div>

            <div className="mt-1 text-sm text-slate-500">

              Latest Discussions

            </div>

          </div>

          <div className="px-6 py-8 text-center">

            <div className="text-3xl font-bold text-slate-950">

              {articles.length}

            </div>
            <div className="mt-1 text-sm text-slate-500">

              Featured Articles

            </div>

          </div>

          <div className="px-6 py-8 text-center">

            <div className="text-3xl font-bold text-slate-950">

              {projects.length}

            </div>

            <div className="mt-1 text-sm text-slate-500">

              Featured Projects

            </div>

          </div>

          <div className="px-6 py-8 text-center">

            <div className="text-3xl font-bold text-slate-950">

              {resources.length}

            </div>

            <div className="mt-1 text-sm text-slate-500">

              Featured Resources

            </div>

          </div>

        </div>

      </section>
      {/* Phase 1 */}

      <section className="border-b border-slate-200 bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="flex items-end justify-between gap-4">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

                Enterprise Platform

              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-950">

                Phase 1

              </h2>

              <p className="mt-2 max-w-2xl text-slate-600">

                Governed enterprise capabilities for legal operations,

                document workflows, knowledge retrieval, approvals,

                integrations, and auditability.

              </p>

            </div>

            <Link

              href="/phase-1"

              className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block"

            >

              View More →

            </Link>

          </div>

          <div className="mt-8">

            <Link

              href="/phase-1"

              className="group block rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"

            >

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div className="flex items-start gap-5">

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl">

                    ◈

                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-xl font-black text-[#172033]">

                        Enterprise Legal Operations

                      </h3>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">

                        Phase 1

                      </span>

                    </div>

                    <p className="mt-2 text-sm font-semibold text-slate-500">

                      Governed AI capabilities

                    </p>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">

                      Legal knowledge, RFP analysis, RFI generation,

                      contract drafting, precedent retrieval, document

                      comparison, SharePoint and Teams integration,

                      human approval workflows, audit logs, and access

                      control.

                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                      {[

                        "Legal Knowledge",

                        "RFP Analysis",

                        "RFI",

                        "Contract Drafting",

                        "SharePoint",

                        "Microsoft Teams",

                        "Human Approval",

                        "Audit Log",

                      ].map((item) => (

                        <span

                          key={item}

                          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600"

                        >

                          {item}

                        </span>

                      ))}

                    </div>

                  </div>

                </div>

                <div className="flex shrink-0 items-center gap-2 text-sm font-black text-blue-600 transition-transform group-hover:translate-x-1">

                  View More

                  <span className="text-lg">→</span>

                </div>

              </div>

            </Link>

          </div>

        </div>

      </section>
      {/* Discussions */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="flex items-end justify-between gap-4">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

              Community

            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">

              Popular Discussions

            </h2>

            <p className="mt-2 text-slate-600">

              Join conversations happening across the community.

            </p>

          </div>

          <Link

            href="/forums"

            className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block"

          >

            View all →

          </Link>

        </div>

        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">

          {latestThreads.length === 0 ? (

            <div className="p-8 text-center text-slate-500">

              No discussions available yet.

            </div>

          ) : (

            latestThreads.map((thread) => (

              <Link

                key={thread.id}

                href={`/forums/${thread.slug}`}

                className="block p-6 transition hover:bg-slate-50"

              >

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div className="min-w-0">

                    <h3 className="truncate text-lg font-semibold text-slate-900">

                      {thread.title}

                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">

                      {thread.content}

                    </p>

                  </div>

                  <div className="shrink-0 text-sm text-slate-400">

                    {thread.views} views

                  </div>

                </div>

              </Link>

            ))

          )}

        </div>

      </section>

      {/* Articles */}

      <section className="border-y border-slate-200 bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="flex items-end justify-between gap-4">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

                Knowledge

              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-950">

                Featured Articles

              </h2>

              <p className="mt-2 text-slate-600">

                Technical knowledge from builders in the community.

              </p>

            </div>

            <Link

              href="/articles"

              className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block"

            >

              View all →

            </Link>

          </div>

          {featuredArticles.length === 0 ? (

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">

              No featured articles available yet.

            </div>

          ) : (

            <div className="mt-8 grid gap-6 md:grid-cols-3">

              {featuredArticles.map((article: Article) => (

                <Link
                  key={article.id}

                  href={`/articles/${article.slug}`}

                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"

                >

                  <div className="flex items-center justify-between gap-3">

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">

                      {article.category}

                    </span>

                    <span className="text-xs text-slate-400">

                      {article.read_time_minutes} min

                    </span>

                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-blue-600">

                    {article.title}

                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">

                    {article.excerpt}

                  </p>

                  <div className="mt-6 flex items-center justify-between text-xs text-slate-400">

                    <span>{formatDate(article.created_at)}</span>

                    <span>{article.views} views</span>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </div>

      </section>

      {/* Projects */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="flex items-end justify-between gap-4">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

              Building

            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-950">

              Featured Projects

            </h2>

            <p className="mt-2 text-slate-600">

              Discover projects being built by the community.

            </p>

          </div>

          <Link

            href="/projects"

            className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block"

          >

            View all →

          </Link>

        </div>

        {featuredProjects.length === 0 ? (

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">

            No featured projects available yet.

          </div>

        ) : (

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            {featuredProjects.map((project: Project) => (

              <Link

                key={project.id}

                href={`/projects/${project.slug}`}

                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"

              >

                <div className="flex items-center justify-between">

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">

                    {project.category}

                  </span>

                  <span className="text-xs font-medium text-emerald-600">

                    {project.status}

                  </span>

                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-blue-600">

                  {project.name}

                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">

                  {project.description}

                </p>

                <div className="mt-6 flex items-center justify-between text-xs text-slate-400">

                  <span>★ {project.stars}</span>

                  <span>{project.views} views</span>

                </div>

              </Link>

            ))}

          </div>

        )}

      </section>

      {/* Resources */}

      <section className="border-y border-slate-200 bg-slate-50">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

                Library

              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-950">

                Latest Resources

              </h2>

              <p className="mt-2 text-slate-600">

                Guides, documents, tools, and useful technical material.

              </p>

            </div>

            <Link

              href="/resources"

              className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block"

            >

              View all →

            </Link>

          </div>

          {latestResources.length === 0 ? (

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">

              No resources available yet.

            </div>

          ) : (

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {latestResources.map((resource: Resource) => (

                <Link

                  key={resource.id}

                  href={`/resources/${resource.slug}`}

                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"

                >

                  <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">

                    {resource.resource_type}

                  </div>

                  <h3 className="mt-3 line-clamp-2 font-bold text-slate-950 group-hover:text-blue-600">

                    {resource.title}

                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">

                    {resource.description}

                  </p>

                  <div className="mt-5 flex items-center justify-between text-xs text-slate-400">

                    <span>{resource.category}</span>

                    <span>{resource.downloads} downloads</span>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </div>

      </section>

      {/* CTA */}

      <section className="bg-slate-950">

        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">

            Build something worth sharing.

          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">

            Start a discussion, publish an article, share a project, or

            contribute a useful resource to the Apexive Community.

          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link

              href="/forums/new"

              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"

            >

              Start a Discussion

            </Link>

            <Link

              href="/projects/new"

              className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"

            >

              Submit a Project

            </Link>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="border-t border-slate-800 bg-slate-950">

        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 text-sm text-slate-400 lg:px-8">

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">

            <Image
              src="/copyright-seal.png"
              alt="Copyright - Bhone Htet Naing"
              width={280}
              height={280}
              className="h-auto w-full max-w-[280px] rounded-xl border border-amber-500/20 object-contain"
            />

            <div>

              © {new Date().getFullYear()} Apexive Community

            </div>

            <div className="flex gap-6">

              <Link

                href="/forums"

                className="hover:text-white"

              >

                Forums

              </Link>

              <Link

                href="/articles"

                className="hover:text-white"

              >

                Articles

              </Link>

              <Link

                href="/projects"

                className="hover:text-white"

              >
                Projects

              </Link>

              <Link

                href="/resources"

                className="hover:text-white"

              >

                Resources

              </Link>

            </div>
          </div>

        </div>

      </footer>

    </div>

  );

}