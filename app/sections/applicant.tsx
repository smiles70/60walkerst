"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import {
  townTitle,
  townSubtitle,
  townInfos,
  watchtowerFacilities,
  kingdomHalls,
  assemblyHalls,
  assemblyHallNote,
  pricingInfo,
  testimonials,
  galleryPhotos,
  townGalleryPhotos,
  watchtowerGalleryPhotos,
  waldenMapEmbed,
  scheduleTour,
  type TownInfo,
  type WatchtowerFacility,
  type KingdomHall,
} from "../data/applicant";

function TownCard({ info }: { info: TownInfo }) {
  return (
    <div className="rounded-xl border-2 border-navy-200 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-green">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-navy">
          <Icon name={info.icon} className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-navy">{info.title}</h3>
      </div>
      <p className="text-sm text-slate-600 mb-3">{info.description}</p>
      <ul className="space-y-1.5">
        {info.details.map((detail, i) => (
          <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
            <span className="text-green mt-1 shrink-0">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FacilityCard({ facility }: { facility: WatchtowerFacility }) {
  return (
    <div className="rounded-xl border-2 border-navy-200 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-green">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-navy">
          <Icon name="Building" className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy">{facility.name}</h3>
          <span className="text-xs font-medium text-green uppercase tracking-wide">
            {facility.type}
          </span>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-3">{facility.description}</p>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-start gap-2">
          <Icon name="MapPin" className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <span className="text-slate-700">{facility.address}</span>
        </div>
        <div className="flex items-start gap-2">
          <Icon name="Phone" className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <span className="text-slate-700">{facility.phone}</span>
        </div>
        <div className="flex items-start gap-2">
          <Icon name="Zap" className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <span className="text-slate-700">
            {facility.distance} — {facility.driveTime}
          </span>
        </div>
      </div>
    </div>
  );
}

function KingdomHallCard({ hall }: { hall: KingdomHall }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border-2 border-navy-200 bg-white px-4 py-3 transition-all duration-200 hover:border-green">
      <div className="p-1.5 rounded-md bg-green-50 shrink-0">
        <Icon name="Building" className="w-4 h-4 text-green" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-bold text-navy truncate">{hall.name}</h4>
        <p className="text-xs text-slate-500">{hall.address}</p>
      </div>
      <span className="text-xs font-medium text-green whitespace-nowrap shrink-0">
        {hall.distance}
      </span>
    </div>
  );
}

type TabKey = "town" | "watchtower" | "halls";
type ViewKey = "cards" | "home" | "area";

function BackToCards({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-navy bg-white border-2 border-navy-200
                 hover:bg-navy-50 active:bg-navy-100 transition-colors
                 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
      aria-label="Back to categories"
    >
      <Icon name="ArrowLeft" className="w-4 h-4" />
      Back
    </button>
  );
}

function LightboxModal({
  photo,
  onClose,
}: {
  photo: { src: string; alt: string; label: string } | null;
  onClose: () => void;
}) {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (photo) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.label}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 p-2 text-white hover:text-green transition-colors focus-visible:ring-2 focus-visible:ring-green rounded-lg"
          aria-label="Close lightbox"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
        />
        <p className="mt-3 text-center text-white text-sm font-medium">{photo.label}</p>
      </div>
    </div>
  );
}

function GalleryCard() {
  const [activePhoto, setActivePhoto] = useState<{ src: string; alt: string; label: string } | null>(null);

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-navy">
          <Icon name="Camera" className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-navy">Photo &amp; Video Gallery</h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {galleryPhotos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-navy-200
                       focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2
                       transition-all duration-200 hover:shadow-lg hover:border-green"
            aria-label={`View ${photo.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
              <span className="text-white text-xs font-semibold">{photo.label}</span>
            </div>
          </button>
        ))}
      </div>
      <LightboxModal photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </div>
  );
}

function TownGallery() {
  const [activePhoto, setActivePhoto] = useState<{ src: string; alt: string; label: string } | null>(null);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-navy">
          <Icon name="Camera" className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-navy">Photo Gallery</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {townGalleryPhotos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-navy-200
                       focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2
                       transition-all duration-200 hover:shadow-lg hover:border-green"
            aria-label={`View ${photo.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
              <span className="text-white text-xs font-semibold">{photo.label}</span>
            </div>
          </button>
        ))}
      </div>
      <LightboxModal photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </div>
  );
}

function WatchtowerGallery() {
  const [activePhoto, setActivePhoto] = useState<{ src: string; alt: string; label: string } | null>(null);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-navy">
          <Icon name="Camera" className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-navy">Photo Gallery</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {watchtowerGalleryPhotos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-navy-200
                       focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2
                       transition-all duration-200 hover:shadow-lg hover:border-green"
            aria-label={`View ${photo.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
              <span className="text-white text-xs font-semibold">{photo.label}</span>
            </div>
          </button>
        ))}
      </div>
      <LightboxModal photo={activePhoto} onClose={() => setActivePhoto(null)} />
    </div>
  );
}

function WaldenMap() {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-navy">
          <Icon name="Globe" className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-navy">Walden &amp; Surrounding Area</h3>
      </div>
      <div className="rounded-xl border-2 border-navy-200 overflow-hidden bg-white">
        <iframe
          src={waldenMapEmbed}
          title="Walden, NY and surrounding areas"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="block"
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Map showing Walden, NY and nearby interstates including I-84 and I-87.
      </p>
    </div>
  );
}

export default function ApplicantSection(): React.ReactElement {
  const [view, setView] = useState<ViewKey>("cards");
  const [activeTab, setActiveTab] = useState<TabKey>("town");

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: "town", label: "Town Info", icon: "MapPin" },
    { key: "watchtower", label: "Watchtower Facilities", icon: "Building" },
    { key: "halls", label: "Kingdom Halls", icon: "Users" },
  ];

  return (
    <section className="py-12 px-4" aria-labelledby="applicant-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 id="applicant-heading" className="text-3xl font-bold text-navy mb-2">
            {townTitle}
          </h2>
          <p className="text-slate-600">{townSubtitle}</p>
        </div>

        {/* VIEW: Two category cards */}
        {view === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button
                onClick={() => setView("home")}
                className="group rounded-2xl border-2 border-navy-200 bg-white p-10 text-left
                           transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-green
                           focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
                aria-label="View details about this home"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-navy group-hover:bg-green transition-colors">
                    <Icon name="Home" className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-navy">About This Home</h3>
                </div>
                <p className="text-slate-600 text-lg mb-6">
                  Pricing, room details, what&apos;s included, testimonials from previous roommates, and how to schedule a tour.
                </p>
                <span className="inline-flex items-center gap-1 text-base font-bold text-green group-hover:text-navy transition-colors">
                  Explore <Icon name="ArrowLeft" className="w-5 h-5 rotate-180" />
                </span>
              </button>

              <button
                onClick={() => setView("area")}
                className="group rounded-2xl border-2 border-navy-200 bg-white p-10 text-left
                           transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-green
                           focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
                aria-label="View details about the area"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-navy group-hover:bg-green transition-colors">
                    <Icon name="MapPin" className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-navy">About The Area</h3>
                </div>
                <p className="text-slate-600 text-lg mb-6">
                  Walden town info, nearby attractions, Watchtower facilities, Kingdom Halls, and Assembly Halls within driving distance.
                </p>
                <span className="inline-flex items-center gap-1 text-base font-bold text-green group-hover:text-navy transition-colors">
                  Explore <Icon name="ArrowLeft" className="w-5 h-5 rotate-180" />
                </span>
              </button>
            </div>
        )}

        {/* VIEW: About This Home */}
        {view === "home" && (
          <>
            <div className="mb-6">
              <BackToCards onClick={() => setView("cards")} />
            </div>

            {/* Pricing */}
            <div className="rounded-2xl border-2 border-navy-200 bg-white p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green">
                  <Icon name="DollarSign" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy">Pricing &amp; What&apos;s Included</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-green mb-1">{pricingInfo.monthlyRent}</p>
                  {pricingInfo.deposit && (
                    <p className="text-sm text-slate-500 mb-4">{pricingInfo.deposit}</p>
                  )}
                  <h4 className="text-sm font-bold text-navy mb-2">Utilities Included:</h4>
                  <ul className="space-y-1">
                    {pricingInfo.utilitiesIncluded.map((item, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                        <Icon name="CheckCircle" className="w-4 h-4 text-green shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy mb-2">Additional Details:</h4>
                  <ul className="space-y-2">
                    {pricingInfo.additionalNotes.map((note, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-green mt-0.5 shrink-0">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <GalleryCard />

            {/* Testimonials */}
            <div className="mt-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-navy mb-2">What Previous Roommates Say</h3>
                <p className="text-slate-600">Real experiences from people who called 60 Walker home</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-xl border-2 border-navy-200 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-green"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" className="w-4 h-4 text-amber" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 italic">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Tour */}
            <div className="mt-12 rounded-2xl border-2 border-green bg-green-50 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green">
                  <Icon name="Calendar" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy">{scheduleTour.headline}</h3>
              </div>
              <p className="text-sm text-slate-700 mb-4">{scheduleTour.description}</p>
              <a
                href={`mailto:${scheduleTour.contactEmail}`}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-navy text-white font-bold
                           hover:bg-navy-600 active:bg-navy-700 transition-colors
                           focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
                aria-label="Contact to schedule a tour via email"
              >
                <Icon name="MessageCircle" className="w-4 h-4" />
                Contact to Schedule a Tour
              </a>
            </div>
          </>
        )}

        {/* VIEW: About The Area */}
        {view === "area" && (
          <>
            <div className="mb-6">
              <BackToCards onClick={() => setView("cards")} />
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Applicant information categories">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    role="tab"
                    aria-selected={isActive}
                    className={`flex items-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-colors
                      ${
                        isActive
                          ? "bg-navy text-white"
                          : "bg-white text-navy border-2 border-navy-200 hover:bg-navy-50"
                      } focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2`}
                  >
                    <Icon name={tab.icon} className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" aria-label={tabs.find((t) => t.key === activeTab)?.label}>
              {activeTab === "town" && (
                <div>
                  <WaldenMap />
                  <TownGallery />
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {townInfos.map((info) => (
                      <TownCard key={info.id} info={info} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "watchtower" && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {watchtowerFacilities.map((facility) => (
                      <FacilityCard key={facility.id} facility={facility} />
                    ))}
                  </div>
                  <WatchtowerGallery />
                </div>
              )}

              {activeTab === "halls" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-navy mb-3 flex items-center gap-2">
                      <Icon name="Building" className="w-5 h-5" />
                      Kingdom Halls within 100 miles
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {kingdomHalls.map((hall) => (
                        <KingdomHallCard key={hall.id} hall={hall} />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border-2 border-navy-200 bg-navy-50 p-5">
                    <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                      <Icon name="Users" className="w-5 h-5" />
                      Assembly Halls
                    </h3>
                    {assemblyHalls.length === 0 ? (
                      <p className="text-sm text-slate-600">{assemblyHallNote}</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {assemblyHalls.map((hall) => (
                          <div
                            key={hall.id}
                            className="flex items-center gap-3 rounded-lg border-2 border-navy-200 bg-white px-4 py-3"
                          >
                            <div className="p-1.5 rounded-md bg-amber-50 shrink-0">
                              <Icon name="Users" className="w-4 h-4 text-amber" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm font-bold text-navy truncate">
                                {hall.name}
                              </h4>
                              <p className="text-xs text-slate-500">{hall.address}</p>
                            </div>
                            <span className="text-xs font-medium text-amber whitespace-nowrap shrink-0">
                              {hall.distance}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
