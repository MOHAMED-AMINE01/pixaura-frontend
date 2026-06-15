/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Trash2,
  User,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { getToken, getUser } from "@/lib/auth";
import { useParams, useRouter } from "next/navigation";
import { AdminY2KLayout, ChromeCard } from "@/components/admin/Y2KAdminLayout";
import {
  DetailSection,
  InfoRow,
  StatusBadge,
  STATUS_LABEL_FR,
  axisLabelFr,
  clientTypePill,
  formatRequestDateLong,
  slotLabelFromRequest,
  statusBadgeClass,
} from "@/components/admin/demandeUi";
import { cn } from "@/lib/utils";

const STATUSES = ["en_attente", "validee", "refusee", "a_completer"] as const;

export default function DemandeDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [reasonModal, setReasonModal] = useState<"refusee" | "a_completer" | null>(null);
  const [reasonText, setReasonText] = useState("");

  useEffect(() => {
    const user = getUser();
    if (!user || user.role !== "admin") return router.push("/login");
    const token = getToken();
    apiFetch(`/requests/${params.id}`, {}, token).then(setItem);
  }, [params.id, router]);

  // Refusée / À compléter ouvrent un modal pour un motif optionnel.
  function onStatusClick(status: string) {
    if (status === "refusee" || status === "a_completer") {
      setReasonText("");
      setReasonModal(status);
      return;
    }
    void changeStatus(status);
  }

  async function changeStatus(status: string, reason?: string) {
    setStatusError(null);
    setStatusNotice(null);
    setUpdatingStatus(true);
    try {
      const token = getToken();
      const updated = await apiFetch<{ emailStatus?: { sent: boolean; reason?: string } }>(
        `/requests/${params.id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status, ...(reason ? { reason } : {}) }),
        },
        token
      );
      setItem(updated);
      setReasonModal(null);

      const emailFailed = updated.emailStatus && !updated.emailStatus.sent;
      const emailReason = updated.emailStatus?.reason || "erreur inconnue";

      if (status === "validee") {
        setStatusNotice(
          emailFailed
            ? `Demande validée, mais l'e-mail de confirmation n'a pas pu être envoyé : ${emailReason}`
            : "Demande validée. Le créneau est désormais réservé pour ce client."
        );
      } else if (status === "refusee") {
        setStatusNotice(
          emailFailed
            ? `Demande refusée, mais l'e-mail au client n'a pas pu être envoyé : ${emailReason}`
            : "Demande refusée. Le client a été prévenu par email."
        );
      } else if (status === "a_completer") {
        setStatusNotice(
          emailFailed
            ? `Statut mis à jour, mais l'e-mail au client n'a pas pu être envoyé : ${emailReason}`
            : "Demande marquée « à compléter ». Le client a été invité à la compléter par email."
        );
      } else if (status === "en_attente") {
        setStatusNotice(
          emailFailed
            ? `Statut remis en attente, mais l'e-mail au client n'a pas pu être envoyé : ${emailReason}`
            : "Demande remise en attente. Le client a été notifié par email."
        );
      }
    } catch (err: any) {
      setStatusError(err?.message || "Impossible de mettre à jour le statut.");
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const token = getToken();
      await apiFetch(`/requests/${params.id}`, { method: "DELETE" }, token);
      setShowDeleteModal(false);
      router.push("/admin/demandes");
    } catch (err: any) {
      alert("Erreur : " + (err.message || "Erreur inconnue"));
      setDeleting(false);
    }
  }

  const display = (v: string | undefined | null) => (v && String(v).trim() ? v : "—");

  return (
    <AdminY2KLayout>
      <div className="flex-1 space-y-6 overflow-y-auto pb-12">
        <Link
          href="/admin/demandes"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Retour aux demandes
        </Link>

        {!item ? (
          <p className="font-mono text-sm text-neutral-500">Chargement…</p>
        ) : (
          <>
            <header className="flex flex-col gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0 space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-violet-300/80">Fiche demande</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Building2 className="h-8 w-8 shrink-0 text-neutral-600" strokeWidth={1.25} />
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                    {item.client?.companyName || "Client"}
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {clientTypePill(item.client?.clientType)}
                  <span className="font-mono text-[10px] text-neutral-600">· ID {String(item._id).slice(-8)}</span>
                </div>
              </div>
              <StatusBadge status={item.status} className="self-start text-xs" />
            </header>

            <div className="grid gap-5 lg:grid-cols-2">
              <DetailSection icon={User} title="Contact & entreprise">
                <InfoRow label="Raison sociale" value={display(item.client?.companyName)} />
                <InfoRow label="Contact principal" value={display(item.mainContact)} />
                <InfoRow label="Email" value={display(item.email)} mono />
                <InfoRow label="Téléphone" value={display(item.phone)} mono />
              </DetailSection>

              <DetailSection icon={CalendarClock} title="Séance planifiée">
                <InfoRow label="Date" value={formatRequestDateLong(item.requestedDate)} />
                <InfoRow
                  label="Créneau"
                  value={slotLabelFromRequest(item.timeSlotId, item.requestedTime)}
                  mono
                />
                <InfoRow label="Axe communication" value={axisLabelFr(item.communicationAxis)} />
              </DetailSection>

              <DetailSection icon={ClipboardList} title="Projet" className="lg:col-span-2">
                <InfoRow label="Détails" value={<span className="whitespace-pre-wrap">{display(item.projectDetails)}</span>} />
              </DetailSection>

              <DetailSection icon={MapPin} title="Lieu & logistique" className="lg:col-span-2">
                <InfoRow label="Adresse tournage" value={display(item.shootingAddress)} />
                <InfoRow label="Contraintes techniques" value={display(item.technicalConstraints)} />
                <InfoRow label="Nom contact sur place" value={display(item.onsiteContactName || item.onsiteContact)} />
                <InfoRow label="Tél. contact sur place" value={display(item.onsiteContactPhone)} mono />
                <InfoRow label="Commentaire libre" value={display(item.freeComment)} />
              </DetailSection>
            </div>

            <ChromeCard title="Actions administrateur" subtitle="Mettre à jour le statut de la demande" className="border-white/10">
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => {
                  const active = item.status === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={updatingStatus}
                      onClick={() => onStatusClick(s)}
                      className={cn(
                        "rounded-full border px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all disabled:opacity-50",
                        statusBadgeClass(s),
                        active && "ring-2 ring-white/40 ring-offset-2 ring-offset-black"
                      )}
                    >
                      {STATUS_LABEL_FR[s] || s}
                    </button>
                  );
                })}
              </div>

              {statusError ? (
                <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-950/50 px-4 py-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" strokeWidth={2} />
                  <p className="text-sm font-semibold text-red-100">{statusError}</p>
                </div>
              ) : null}

              {statusNotice ? (
                <div className="mt-4 flex items-start gap-3 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" strokeWidth={2} />
                  <p className="text-sm font-semibold text-emerald-100">{statusNotice}</p>
                </div>
              ) : null}

              <p className="mt-4 text-[11px] font-mono text-neutral-500">
                Le statut « Validée » réserve le créneau pour les autres clients. Un créneau complet (capacité atteinte)
                ne peut plus être validé.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-950/40 border border-red-500/25 text-red-100 hover:bg-red-950/60 transition text-xs font-bold uppercase tracking-widest"
                >
                  <Trash2 className="h-4 w-4" strokeWidth={2} />
                  Supprimer cette demande
                </button>
              </div>

            </ChromeCard>

            {showDeleteModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <ChromeCard className="max-w-md border-red-500/25">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">Confirmer la suppression</h3>
                      <p className="text-neutral-400 text-xs mt-3">
                        Êtes-vous certain ? Cette action est irréversible.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowDeleteModal(false)}
                        disabled={deleting}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-white/15 text-white hover:bg-white/10 transition disabled:opacity-50 text-xs font-bold uppercase"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-red-950/60 border border-red-500/25 text-red-100 hover:bg-red-950/80 transition disabled:opacity-50 text-xs font-bold uppercase"
                      >
                        {deleting ? "..." : "Supprimer"}
                      </button>
                    </div>
                  </div>
                </ChromeCard>
              </div>
            )}

            {reasonModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <ChromeCard
                  className={cn(
                    "max-w-lg w-full",
                    reasonModal === "refusee" ? "border-red-500/25" : "border-amber-500/25"
                  )}
                >
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {reasonModal === "refusee" ? "Refuser la demande" : "Demander à compléter"}
                      </h3>
                      <p className="text-neutral-400 text-xs mt-2 leading-relaxed">
                        {reasonModal === "refusee"
                          ? "Le client sera prévenu par email du refus. Vous pouvez ajouter un motif (optionnel) qui apparaîtra dans l'email."
                          : "Le client recevra un email l'invitant à compléter sa demande. Précisez (optionnel) les informations attendues."}
                      </p>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
                        Motif / message{" "}
                        <span className="text-neutral-600 normal-case tracking-normal">(optionnel)</span>
                      </label>
                      <textarea
                        value={reasonText}
                        onChange={(e) => setReasonText(e.target.value)}
                        rows={4}
                        placeholder={
                          reasonModal === "refusee"
                            ? "Ex : créneau finalement indisponible, projet hors périmètre…"
                            : "Ex : merci de préciser l'adresse exacte et le contact sur place…"
                        }
                        className="mt-2 w-full rounded-lg border border-white/15 bg-black/50 px-3 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-violet-400/55 focus:ring-2 focus:ring-violet-500/20 resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setReasonModal(null)}
                        disabled={updatingStatus}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-white/15 text-white hover:bg-white/10 transition disabled:opacity-50 text-xs font-bold uppercase"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        onClick={() => changeStatus(reasonModal, reasonText.trim() || undefined)}
                        disabled={updatingStatus}
                        className={cn(
                          "flex-1 px-4 py-2.5 rounded-lg border transition disabled:opacity-50 text-xs font-bold uppercase",
                          reasonModal === "refusee"
                            ? "bg-red-950/60 border-red-500/25 text-red-100 hover:bg-red-950/80"
                            : "bg-amber-950/60 border-amber-500/25 text-amber-100 hover:bg-amber-950/80"
                        )}
                      >
                        {updatingStatus
                          ? "..."
                          : reasonModal === "refusee"
                            ? "Refuser et prévenir"
                            : "Envoyer la demande"}
                      </button>
                    </div>
                  </div>
                </ChromeCard>
              </div>
            )}
          </>
        )}
      </div>
    </AdminY2KLayout>
  );
}
