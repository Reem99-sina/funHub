import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
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
    <div className="max-w-2xl mx-auto px-6 py-10 text-black  leading-relaxed">
      <h1 className="text-3xl font-semibold text-main-color mb-6 text-center tracking-wide">
        {t("contactUsTitle")}
      </h1>

      <p className="mb-8 text-center text-black text-lg font-medium">
        {t("contactUsDescription")}
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-white shadow-md rounded-2xl p-6 border border-gray-300"
      >
        <input
          type="text"
          placeholder={t("contactNamePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-black rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
        />

        <input
          type="email"
          placeholder={t("contactEmailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-black rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
        />

        <textarea
          placeholder={t("contactMessagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="border border-black rounded-lg px-4 py-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-main-color text-white font-medium text-lg py-3 rounded-lg shadow hover:bg-main-color transition disabled:opacity-50"
        >
          {status === "sending" ? t("contactSending") : t("contactSendButton")}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center font-medium">
            {t("contactSuccess")}
          </p>
        )}
        {status === "error" && (
          <p className="text-main-color text-center font-medium">
            {t("contactError")}
          </p>
        )}
      </form>
    </div>
  );
}
