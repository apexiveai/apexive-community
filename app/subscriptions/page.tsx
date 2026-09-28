"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {

  cancelSubscription,

  getMySubscriptions,

  type Subscription,

} from "@/lib/subscriptions";

export default function SubscriptionsPage() {

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const [loading, setLoading] = useState(true);

  const [cancelling, setCancelling] = useState<number | null>(null);

  const [error, setError] = useState("");

  async function loadSubscriptions() {

    try {

      setError("");

      const data = await getMySubscriptions();

      setSubscriptions(data);

    } catch (err) {

      setError(

        err instanceof Error

          ? err.message

          : "Unable to load subscriptions.",

      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadSubscriptions();

  }, []);

  async function handleCancel(subscriptionId: number) {

    const confirmed = window.confirm(

      "Are you sure you want to cancel this subscription?",

    );

    if (!confirmed) {

      return;

    }

    setCancelling(subscriptionId);

    setError("");

    try {

      await cancelSubscription(subscriptionId);

      await loadSubscriptions();

    } catch (err) {

      setError(

        err instanceof Error

          ? err.message

          : "Unable to cancel subscription.",

      );

    } finally {

      setCancelling(null);

    }

  }

  function formatDate(value: string | null) {

    if (!value) {

      return "—";

    }

    return new Date(value).toLocaleDateString("en-US", {

      year: "numeric",

      month: "short",

      day: "numeric",

    });

  }

  if (loading) {

    return (

      <main className="min-h-screen bg-slate-50">

        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6">

          <div className="text-center">

            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

            <p className="text-sm text-slate-500">

              Loading your subscriptions...

            </p>

          </div>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-slate-50">

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-5xl px-6 py-12">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">

                APEXIVE AI

              </div>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#172033]">

                My Subscriptions

              </h1>

              <p className="mt-3 text-slate-500">

                Manage the Apexive AI products connected to your workspace.

              </p>

            </div>

            <Link

              href="/pricing"

              className="inline-flex items-center justify-center rounded-xl bg-[#172033] px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"

            >

              Browse Products

            </Link>

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">

        {error && (

          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">

            {error}

          </div>

        )}

        {subscriptions.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">

              $

            </div>

            <h2 className="text-xl font-bold text-[#172033]">

              No active subscriptions

            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Choose an Apexive AI product to start using your enterprise

              workspace.

            </p>

            <Link

              href="/pricing"

              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"

            >

              View Pricing

            </Link>

          </div>

        ) : (

          <div className="space-y-5">

            {subscriptions.map((subscription) => {

              const active = ["active", "trialing"].includes(

                subscription.status,

              );

              return (

                <article

                  key={subscription.id}

                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"

                >

                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-xl font-bold text-[#172033]">

                          {subscription.plan.name}

                        </h2>

                        <span

                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${

                            active

                              ? "bg-emerald-50 text-emerald-700"

                              : "bg-slate-100 text-slate-600"

                          }`}

                        >

                          {subscription.status}

                        </span>

                      </div>

                      <p className="mt-2 text-sm text-slate-500">

                        {subscription.plan.description}

                      </p>

                      <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">

                        <div>

                          <div className="text-xs uppercase tracking-wide text-slate-400">

                            Price

                          </div>

                          <div className="mt-1 font-bold text-[#172033]">

                            ${Number(subscription.price).toLocaleString()} /{" "}

                            {subscription.billing_cycle}

                          </div>

                        </div>

                        <div>

                          <div className="text-xs uppercase tracking-wide text-slate-400">

                            Started

                          </div>

                          <div className="mt-1 font-semibold text-slate-700">

                            {formatDate(subscription.start_date)}

                          </div>

                        </div>

                        <div>

                          <div className="text-xs uppercase tracking-wide text-slate-400">

                            Renews

                          </div>

                          <div className="mt-1 font-semibold text-slate-700">

                            {formatDate(

                              subscription.current_period_end,

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="flex flex-col gap-2 md:w-52">

                      <Link

                        href={`/${subscription.plan.product_key}`}

                        className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"

                      >

                        Open Product

                      </Link>

                      {active && (

                        <button

                          type="button"

                          disabled={cancelling === subscription.id}

                          onClick={() =>

                            handleCancel(subscription.id)

                          }
                          className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"

                        >

                          {cancelling === subscription.id

                            ? "Cancelling..."

                            : "Cancel Subscription"}

                        </button>

                      )}

                    </div>

                  </div>

                </article>

              );

            })}

          </div>

        )}

      </section>

    </main>

  );

}