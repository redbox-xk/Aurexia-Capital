"use client"

import { useI18n } from "@/lib/i18n"
import { useRouter } from "next/navigation"

export default function Home() {
  const { t } = useI18n()
  const router = useRouter()

  return (
    <main>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center bg-[#0B1C2D]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <span className="inline-block bg-[#122B45] text-[#C6A55C] px-4 py-1.5 rounded text-sm font-medium mb-6">
            {t.home.tagline}
          </span>

          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            {t.home.title}
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mb-10">
            {t.home.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => router.push("/contact")}
              className="bg-[#C6A55C] text-black px-6 py-3 font-medium hover:opacity-90 transition"
            >
              {t.home.schedule}
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("why")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border border-[#C6A55C] px-6 py-3 font-medium hover:bg-[#C6A55C] hover:text-black transition"
            >
              {t.home.learn}
            </button>
          </div>
        </div>
      </section>

      {/* WHY AUREXIA */}
      <section id="why" className="bg-[#122B45] py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#C6A55C]">
              Institutional Expertise
            </h3>
            <p className="text-gray-300">
              20+ years managing substantial portfolios with
              disciplined capital allocation and macro awareness.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#C6A55C]">
              Secure & Compliant
            </h3>
            <p className="text-gray-300">
              GDPR compliant with bank-grade security standards
              protecting client assets and data.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#C6A55C]">
              Proprietary Research
            </h3>
            <p className="text-gray-300">
              Quarterly macroeconomic research and market outlook
              reports guiding strategic investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-[#0B1C2D] py-24 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-12">
            Comprehensive Advisory Services
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-left">
            <div>
              <h4 className="text-[#C6A55C] font-semibold mb-2">
                Portfolio Management
              </h4>
              <p className="text-gray-400">
                Tailored investment strategies aligned with client objectives.
              </p>
            </div>

            <div>
              <h4 className="text-[#C6A55C] font-semibold mb-2">
                Risk Advisory
              </h4>
              <p className="text-gray-400">
                Comprehensive risk assessment and mitigation frameworks.
              </p>
            </div>

            <div>
              <h4 className="text-[#C6A55C] font-semibold mb-2">
                Tax Strategy
              </h4>
              <p className="text-gray-400">
                Optimized tax planning across jurisdictions.
              </p>
            </div>

            <div>
              <h4 className="text-[#C6A55C] font-semibold mb-2">
                Succession Planning
              </h4>
              <p className="text-gray-400">
                Multi-generational wealth transfer structures.
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/services")}
            className="mt-12 border border-[#C6A55C] px-6 py-3 font-medium hover:bg-[#C6A55C] hover:text-black transition"
          >
            View All Services
          </button>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#122B45] py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-3xl font-serif font-bold mb-6">
            Ready to Elevate Your Wealth Strategy?
          </h3>

          <p className="text-gray-300 mb-8">
            Schedule a consultation with our advisory team to discuss your
            financial objectives and discover how Aurexia Capital can help
            preserve and grow your wealth.
          </p>

          <button
            onClick={() => router.push("/contact")}
            className="bg-[#C6A55C] text-black px-8 py-3 font-medium hover:opacity-90 transition"
          >
            Schedule Consultation
          </button>
        </div>
      </section>

    </main>
  )
}
