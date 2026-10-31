"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Camera } from "lucide-react";

import Modal, { secondaryBtnClass } from "@/app/components/ui/modals/Modal";
import {
  inputClass,
  labelClass,
  primaryBtnClass,
} from "@/app/components/auth/styles";
import { BASE_URL } from "@/lib/constants";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/slices/authSlice";
import {
  useCreateAvatarUploadIntentMutation,
  useGetProfileQuery,
  useUpdatePreferencesMutation,
  useUpdateProfileMutation,
  type Profile,
} from "@/redux/api/profileApi";

const str = (v: unknown) => (typeof v === "string" ? v : "");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

// Preferences may sit at the top level or under `preferences`
function readPref(p: Profile | undefined, key: string): boolean {
  const nested = (p?.preferences ?? {}) as Record<string, unknown>;
  return Boolean(nested[key] ?? p?.[key]);
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-2">
      <span>
        <span className="block text-[15px] font-medium">{label}</span>
        <span className="block text-[13px] text-[var(--ink-soft)]">{hint}</span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 shrink-0 accent-[var(--gold)]"
      />
    </label>
  );
}

function toE164(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (raw.trim().startsWith("+")) return `+${digits}`;
  return digits.length === 10 ? `+91${digits}` : `+${digits}`;
}

/** Edit profile: PATCH /profiles/me, /profiles/me/preferences, avatar upload. */
export default function EditProfileModal({ onClose }: { onClose: () => void }) {
  const { data, isLoading, isError, refetch } = useGetProfileQuery();
  const profile = data?.data;

  return (
    <Modal open onClose={onClose} title="Edit profile" size="md">
      {isLoading ? (
        <div
          aria-busy="true"
          aria-label="Loading profile"
          className="space-y-4"
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[52px] rounded-xl bg-[var(--ink)]/10" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-[var(--line)] p-5 text-center">
          <p className="text-[15px] text-[var(--ink-soft)]">
            We couldn&apos;t load your profile.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 text-[15px] font-semibold text-[var(--gold)] underline-offset-4 hover:underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <EditProfileForm profile={profile} onClose={onClose} />
      )}
    </Modal>
  );
}

function EditProfileForm({
  profile,
  onClose,
}: {
  profile: Profile | undefined;
  onClose: () => void;
}) {
  const [fullName, setFullName] = useState(str(profile?.fullName));
  const [emergencyName, setEmergencyName] = useState(
    str(profile?.emergencyContactName),
  );
  const [emergencyPhone, setEmergencyPhone] = useState(
    str(profile?.emergencyContactPhone),
  );
  const [emailOptIn, setEmailOptIn] = useState(readPref(profile, "emailOptIn"));
  const [smsOptIn, setSmsOptIn] = useState(readPref(profile, "smsOptIn"));
  const [whatsappOptIn, setWhatsappOptIn] = useState(
    readPref(profile, "whatsappOptIn"),
  );

  const [avatarUrl, setAvatarUrl] = useState(str(profile?.avatarUrl));
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const [createIntent] = useCreateAvatarUploadIntentMutation();
  const [updateProfile, { isLoading: savingProfile }] =
    useUpdateProfileMutation();
  const [updatePreferences, { isLoading: savingPrefs }] =
    useUpdatePreferencesMutation();
  const saving = savingProfile || savingPrefs;

  // 1) ask for a signed URL  2) PUT the bytes  3) save the asset URL
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Choose a JPG, PNG or WebP image");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("Image must be 5 MB or smaller");
      return;
    }

    setUploading(true);
    try {
      const res = await createIntent({ mimeType: file.type }).unwrap();
      const intent = res.data;
      if (!intent?.uploadUrl || !intent.storageKey) {
        toast.error("Couldn't start the upload. Please try again.");
        return;
      }
      const put = await fetch(intent.uploadUrl, {
        method: "PUT",
        headers: intent.headers ?? { "Content-Type": file.type },
        body: file,
      });
      if (!put.ok) {
        toast.error("Photo upload failed. Please try again.");
        return;
      }
      const url = `${BASE_URL}/assets/${intent.storageKey}`;
      await updateProfile({ avatarUrl: url }).unwrap();
      dispatch(updateUser({ avatarUrl: url, profileImage: url }));
      setAvatarUrl(url);
      setPreview(URL.createObjectURL(file));
      toast.success("Profile photo updated");
    } catch {
      // API errors are toasted globally; network errors land here too
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const name = fullName.trim();
    if (!name) {
      toast.error("Please enter your name");
      return;
    }
    const ePhone = toE164(emergencyPhone);
    if (emergencyPhone.trim() && ePhone.replace(/\D/g, "").length < 10) {
      toast.error("Enter a valid emergency contact number");
      return;
    }

    try {
      await updateProfile({
        fullName: name,
        emergencyContactName: emergencyName.trim(),
        emergencyContactPhone: ePhone,
      }).unwrap();
      // Update the navbar menu / saved session right away
      dispatch(updateUser({ name }));
      await updatePreferences({ emailOptIn, smsOptIn, whatsappOptIn }).unwrap();
      toast.success("Profile updated");
      onClose();
    } catch {
      // error toast is shown globally in apiSlice
    }
  }

  const photo = preview || avatarUrl;
  const initial = (fullName.trim().charAt(0) || "?").toUpperCase();

  return (
    <form onSubmit={handleSave} className="space-y-5">
      {/* Photo */}
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-[var(--gold)] bg-[var(--gold)]/12">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[30px] font-semibold text-[var(--gold-bright)]">
              {initial}
            </div>
          )}
        </div>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading || saving}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)] px-5 py-2.5 text-[15px] font-semibold text-[var(--gold-bright)] hover:bg-[var(--gold)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Camera size={17} />
            {uploading ? "Uploading..." : photo ? "Change photo" : "Add photo"}
          </button>
          <p className="mt-1.5 text-[13px] text-[var(--ink-soft)]">
            JPG, PNG or WebP, up to 5 MB
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="ep-name" className={labelClass}>
          Full name
        </label>
        <input
          id="ep-name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
          required
          className={inputClass}
        />
      </div>

      <div>
        <p className="mb-2 text-[15px] font-semibold">Emergency contact</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ep-ename" className={labelClass}>
              Name
            </label>
            <input
              id="ep-ename"
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="ep-ephone" className={labelClass}>
              Phone
            </label>
            <input
              id="ep-ephone"
              type="tel"
              inputMode="tel"
              value={emergencyPhone}
              onChange={(e) =>
                setEmergencyPhone(e.target.value.replace(/[^\d+]/g, "").slice(0, 14))
              }
              placeholder="10-digit number"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-1 text-[15px] font-semibold">Notifications</p>
        <div className="divide-y divide-[var(--line)]">
          <Toggle
            label="Email"
            hint="Order updates and offers by email"
            checked={emailOptIn}
            onChange={setEmailOptIn}
          />
          <Toggle
            label="SMS"
            hint="Order updates by text message"
            checked={smsOptIn}
            onChange={setSmsOptIn}
          />
          <Toggle
            label="WhatsApp"
            hint="Order updates on WhatsApp"
            checked={whatsappOptIn}
            onChange={setWhatsappOptIn}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className={secondaryBtnClass}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || uploading}
          className={primaryBtnClass}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
