"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { getProductAccess } from "@/lib/subscriptions";

type RequireSubscriptionProps = {

  productKey: string;

  children: React.ReactNode;

};

export default function RequireSubscription({

  productKey,

  children,

}: RequireSubscriptionProps) {

  const [loading, setLoading] = useState(true);

  const [hasAccess, setHasAccess] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {

    async function checkAccess() {

      try {

        const result = await getProductAccess(productKey);

        setHasAccess(result.has_access);

      } catch (err) {

        setError(

          err instanceof Error

            ? err.message

            : "Unable to verify subscription.",

        );

      } finally {

        setLoading(false);

      }

    }

    checkAccess();

  }, [productKey]);

  if (loading) {

    return (

      <main className="min-h-screen bg-slate-50">

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

            <p className="text-sm text-slate-500">

              Verifying product access...

            </p>

          </div>

        </div>

      </main>

    );

  }

  if (error) {

    return (

      <main className="min-h-screen bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center">

          <h1 className="text-xl font-bold text-red-700">

            Access Verification Failed

          </h1>

          <p className="mt-3 text-sm text-slate-500">

            {error}

          </p>

          <Link

            href="/subscriptions"

            className="mt-6 inline-flex rounded-xl bg-[#172033] px-5 py-3 text-sm font-bold text-white"

          >

            My Subscriptions

          </Link>

        </div>

      </main>

    );

  }

  if (!hasAccess) {

    return (

      <main className="min-h-screen bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">

            🔒

          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#172033]">

            Subscription Required

          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">

            Your Apexive Community account does not currently have

            an active subscription for this product.

          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <Link

              href="/pricing"

              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"

            >

              View Plans

            </Link>

            <Link

              href="/subscriptions"

              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"

            >

              My Subscriptions

            </Link>

          </div>

        </div>

      </main>

    );

  }

  return <>{children}</>;

}