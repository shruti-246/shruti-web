import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const IMAGE_BUCKET = "recommendation-images";
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export default function RecommendationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    organization: "",
    relationship: "",
    linkedin: "",
    message: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [organizationLogo, setOrganizationLogo] = useState(null);

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateImage = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPG, PNG, and WEBP images are allowed.");
    }

    if (file.size > MAX_IMAGE_SIZE) {
      throw new Error("Image size must be less than 2MB.");
    }
  };

  const uploadImage = async (file, folderName) => {
    if (!file) return null;

    validateImage(file);

    const fileExt = file.name.split(".").pop().toLowerCase();
    const fileName = `${folderName}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(IMAGE_BUCKET)
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget; // save the form before async/await

    setStatus("");

    if (!form.name.trim() || !form.message.trim()) {
        setStatus("Please add your name and recommendation message.");
        return;
    }

    setIsSubmitting(true);

    try {
        const profileImageUrl = await uploadImage(profileImage, "profiles");
        const organizationLogoUrl = await uploadImage(organizationLogo, "logos");

        const { error } = await supabase.from("recommendations").insert([
        {
            name: form.name.trim(),
            email: form.email.trim(),
            title: form.title.trim(),
            organization: form.organization.trim(),
            relationship: form.relationship.trim(),
            linkedin: form.linkedin.trim(),
            message: form.message.trim(),
            profile_image_url: profileImageUrl,
            organization_logo_url: organizationLogoUrl,
            approved: false,
        },
        ]);

        if (error) {
        throw error;
        }

        setForm({
        name: "",
        email: "",
        title: "",
        organization: "",
        relationship: "",
        linkedin: "",
        message: "",
        });

        setProfileImage(null);
        setOrganizationLogo(null);

        formElement.reset(); // fixed line

        setStatus("Thank you. Your recommendation was submitted for review.");
    } catch (error) {
        console.error(error);
        setStatus(error.message || "Something went wrong. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
    };

  return (
    <section className="relative min-h-screen px-6 py-24 md:px-10 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="ui-section-label">/ recommendation_request</p>
        <div className="ui-section-line"></div>

        <p className="ui-body max-w-2xl">
          Thank you for taking the time to write a recommendation. Submitted
          recommendations are reviewed before they appear publicly on my
          portfolio.
        </p>

        <form onSubmit={handleSubmit} className="ui-card mt-10 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="ui-meta">name *</span>
              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[14px] text-[var(--text-main)] outline-none transition focus:border-[var(--accent)]"
                placeholder="Your name"
              />
            </label>
            <label className="block">
                <span className="ui-meta">email</span>
                <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[14px] text-[var(--text-main)] outline-none transition focus:border-[var(--accent)]"
                    placeholder="Your email"
                />
            </label>
            <label className="block">
              <span className="ui-meta">title</span>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[14px] text-[var(--text-main)] outline-none transition focus:border-[var(--accent)]"
                placeholder="Professor, Supervisor, etc."
              />
            </label>

            <label className="block">
              <span className="ui-meta">organization</span>
              <input
                value={form.organization}
                onChange={(e) => updateField("organization", e.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[14px] text-[var(--text-main)] outline-none transition focus:border-[var(--accent)]"
                placeholder="University / company"
              />
            </label>

            <label className="block">
              <span className="ui-meta">relationship</span>
              <input
                value={form.relationship}
                onChange={(e) => updateField("relationship", e.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[14px] text-[var(--text-main)] outline-none transition focus:border-[var(--accent)]"
                placeholder="Professor, supervisor, mentor"
              />
            </label>

            <label className="block">
              <span className="ui-meta">profile picture</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[14px] text-[var(--text-main)] outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--accent)] file:px-3 file:py-2 file:text-[13px] file:text-black"
              />
            </label>

            <label className="block">
              <span className="ui-meta">organization logo</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setOrganizationLogo(e.target.files[0])}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[14px] text-[var(--text-main)] outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--accent)] file:px-3 file:py-2 file:text-[13px] file:text-black"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="ui-meta">linkedin / website</span>
              <input
                value={form.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[14px] text-[var(--text-main)] outline-none transition focus:border-[var(--accent)]"
                placeholder="Optional"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="ui-meta">recommendation *</span>
              <textarea
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={7}
                className="mt-2 w-full resize-none rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-[14px] leading-6 text-[var(--text-main)] outline-none transition focus:border-[var(--accent)]"
                placeholder="Write your recommendation here..."
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="ui-terminal-button mt-8 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>[</span>
            <span>
              {isSubmitting ? "submitting..." : "submit recommendation"}
            </span>
            <span>]</span>
          </button>

          {status && <p className="ui-body mt-5">{status}</p>}
        </form>
      </div>
    </section>
  );
}