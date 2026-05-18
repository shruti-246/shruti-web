import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  async function fetchRecommendations() {
    const { data, error } = await supabase
      .from("recommendations")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (!error) {
      setRecommendations(data);
    } else {
      console.error(error);
    }
  }

  const getInitials = (name) => {
    if (!name) return "?";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const normalizeUrl = (url) => {
    if (!url) return "";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `https://${url}`;
  };

  return (
    <section
      id="recommendations"
      className="relative overflow-hidden px-6 pt-24 pb-20 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <p className="ui-section-label">
          / recommendations
          <span className="type-cursor">|</span>
        </p>

        <div className="ui-section-line"></div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {recommendations.map((item) => {
            const recommenderInfo = [
              item.title,
              item.organization,
              item.relationship,
            ]
              .filter(Boolean)
              .join(" • ");

            return (
              <div
                key={item.id}
                className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-soft)]"
              >
                <div className="mb-6 flex items-start gap-4">
                  {item.profile_image_url ? (
                    <img
                      src={item.profile_image_url}
                      alt={item.name}
                      className="h-14 w-14 rounded-full border border-[var(--border)] object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-transparent font-mono text-[14px] text-[var(--accent)]">
                      {getInitials(item.name)}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[15px] text-[var(--text-main)]">
                      {item.name}
                    </p>

                    {recommenderInfo && (
                      <p className="mt-1 text-[13px] leading-5 text-[var(--text-muted)]">
                        {recommenderInfo}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap gap-3">
                        {item.linkedin && (
                            <a
                            href={normalizeUrl(item.linkedin)}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[12px] text-[var(--accent)] hover:underline"
                            >
                            view profile ↗
                            </a>
                        )}

                        {item.email && (
                            <a
                            href={`mailto:${item.email}`}
                            className="font-mono text-[12px] text-[var(--accent)] hover:underline"
                            >
                            email
                            </a>
                        )}
                    </div>
                  </div>

                  {item.organization_logo_url && (
                    <img
                      src={item.organization_logo_url}
                      alt={`${item.organization || "organization"} logo`}
                      className="h-11 w-11 rounded-xl border border-[var(--border)] object-contain p-1"
                    />
                  )}
                </div>

                <p className="ui-body leading-7">“{item.message}”</p>
              </div>
            );
          })}
        </div>

        {recommendations.length === 0 && (
          <p className="mt-8 ui-body">No recommendations published yet.</p>
        )}
      </div>
    </section>
  );
}