/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { getToken, getUser } from "@/lib/auth";
import { MemberCinematicHero } from "@/components/member/MemberBrandImagery";
import { MemberY2KLayout } from "@/components/member/MemberY2KLayout";
import { P2cRequestForm, requestToFormState } from "@/components/member/P2cRequestForm";
import { ConfirmDialog } from "@/components/ConfirmDialog";

const EDITABLE = new Set(["en_attente", "a_completer"]);

export default function ModifierDemandePage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id || "");
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [initialForm, setInitialForm] = useState<ReturnType<typeof requestToFormState> | null>(null);
  const [p2cSlot, setP2cSlot] = useState<1 | 2>(1);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function performCancel() {
    setCancelError(null);
    setCancelling(true);
    try {
      await apiFetch(`/requests/${id}`, { method: "DELETE" }, getToken());
      router.push("/membre/demandes");
    } catch (e: any) {
      setCancelError(e?.message || "Impossible d'annuler la demande.");
      setCancelling(false);
      setConfirmOpen(false);
    }
  }

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "client") {
      router.push("/login");
      return;
    }
    const token = getToken();
    apiFetch<any>(`/requests/${id}`, {}, token)
      .then((r) => {
        if (!EDITABLE.has(r.status)) {
          setForbidden(true);
          return;
        }
        setP2cSlot(r.p2cSlot === 2 ? 2 : 1);
        setInitialForm(requestToFormState(r));
      })
      .catch(() => setForbidden(true))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <MemberY2KLayout>
        <p className="font-mono text-sm text-neutral-500">Chargement…</p>
      </MemberY2KLayout>
    );
  }

  if (forbidden || !initialForm) {
    return (
      <MemberY2KLayout>
        <p className="text-sm text-amber-200">Cette demande ne peut pas être modifiée.</p>
        <Link href="/membre/demandes" className="mt-4 inline-block text-violet-300 hover:underline">
          ← Retour à mes demandes
        </Link>
      </MemberY2KLayout>
    );
  }

  return (
    <MemberY2KLayout>
      <p className="mb-4 text-sm text-neutral-400">
        <Link href="/membre/demandes" className="text-violet-300 underline-offset-4 hover:text-white hover:underline">
          ← Mes demandes
        </Link>
      </p>
      <MemberCinematicHero
        className="mb-8"
        eyebrow="Modification"
        title="Mettre à jour ma demande"
        description="Ajustez vos coordonnées, votre projet ou votre créneau — Pixaura traite votre dossier dès validation."
      />
      <P2cRequestForm
        requestId={id}
        p2cSlot={p2cSlot}
        initialForm={initialForm}
        title={`Modifier le Projet ${p2cSlot}`}
        subtitle="Tous les champs sont modifiables. Le calendrier n’affiche que les dates réellement disponibles."
        onSuccess={() => router.push("/membre/demandes")}
      />

      <div className="mt-4 rounded-2xl border border-red-500/25 bg-red-950/15 p-4 sm:p-5">
        <p className="text-sm font-semibold text-red-100">Annuler ma demande</p>
        <p className="mt-1 text-xs leading-relaxed text-red-200/80">
          Supprime définitivement cette demande et libère votre créneau. Vous pourrez ensuite en créer une nouvelle.
        </p>
        {cancelError ? (
          <p className="mt-2 text-xs font-semibold text-red-300">{cancelError}</p>
        ) : null}
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          disabled={cancelling}
          className="mt-3 box-border h-11 rounded-lg border border-red-400/40 bg-red-500/15 px-5 text-xs font-extrabold uppercase tracking-[0.06em] text-red-100 transition-all hover:border-red-300/60 hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          {cancelling ? "Annulation…" : "Annuler ma demande"}
        </button>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        danger
        title="Annuler cette demande ?"
        message="Cette action est irréversible. Votre demande sera définitivement supprimée et votre créneau libéré. Vous pourrez ensuite en créer une nouvelle."
        confirmLabel="Annuler ma demande"
        cancelLabel="Conserver"
        loading={cancelling}
        onConfirm={performCancel}
        onCancel={() => setConfirmOpen(false)}
      />
    </MemberY2KLayout>
  );
}
