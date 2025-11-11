import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Replace with your API endpoint
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-lg font-bold text-red-600 mb-4">
        {t("contactUsTitle")}
      </h1>
      <p className="mb-6 text-center">{t("contactUsDescription")}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder={t("contactNamePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="email"
          placeholder={t("contactEmailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <textarea
          placeholder={t("contactMessagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          {status === "sending" ? t("contactSending") : t("contactSendButton")}
        </button>

        {status === "success" && (
          <p className="text-green-600">{t("contactSuccess")}</p>
        )}
        {status === "error" && (
          <p className="text-red-600">{t("contactError")}</p>
        )}
      </form>
    </div>
  );
}
