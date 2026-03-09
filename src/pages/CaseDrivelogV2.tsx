import Layout from "@/components/Layout";
const R2 = "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev";
const CaseDrivelogV2 = () => {
  return (
    <Layout fullWidth>
      {/* HERO */}
      <section className="relative min-h-screen w-full">
        <img
          src={`${R2}/drivelog-hero3.webp`}
          alt="Drivelog"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
          <p className="text-sm tracking-[0.02em] text-white/60 mb-4">Drivelog</p>
          <p className="text-sm tracking-[0.02em] text-white/60 mb-6">Product · Brand · Digital</p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.1] mt-2">
            Making the car understandable.
          </h1>
        </div>
      </section>
      {/* VISION */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-5 md:col-start-2 px-6 md:px-0">
            <p className="text-[13px] uppercase tracking-[0.12em] text-white/40 font-heading font-light mb-8">Vision</p>
            <p className="font-heading text-2xl md:text-3xl tracking-tight text-white leading-[1.2] mb-10">
              Cars generate enormous amounts of data. Most drivers never see it.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              Drivelog explored a simple idea: what if your car could talk to you?
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              Not through dashboards and error codes — but through clear insights about driving behaviour, vehicle health and everyday use.
            </p>
            <p className="text-base text-white/60 leading-relaxed">
              The goal was to turn raw vehicle data into something drivers could actually understand.
            </p>
          </div>
        </div>
      </section>
      {/* CONNECTOR REVEAL — full width */}
      <section className="w-full">
        <img
          src={`${R2}/drivelog2.webp`}
          alt="Drivelog connector"
          className="w-full"
        />
      </section>
      {/* CONNECTOR TEXT + PACKAGING */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-4 md:col-start-2 px-6 md:px-0">
            <p className="text-[13px] uppercase tracking-[0.12em] text-white/40 font-heading font-light mb-8">The Connector</p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              The system started with a small OBD connector. Plugged into the vehicle, it unlocked access to the car's internal data and connected it to the mobile platform.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              The object was designed as a physical counterpart to the app icon — a square with rounded corners. Opening the cube revealed the connector inside.
            </p>
            <p className="text-base text-white/60 leading-relaxed">
              Half went into the car. The other half remained as its protective shell. A small gateway between the vehicle and the digital world.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-7 px-6 md:px-0">
            <img
              src={`${R2}/drivelog9.webp`}
              alt="Drivelog packaging"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
      {/* NARRATIVE PUNCH */}
      <section className="py-20 md:py-28 px-6 md:px-8 max-w-4xl mx-auto">
        <p className="font-heading text-3xl md:text-5xl tracking-tight text-white leading-[1.15]">
          The car talking to you.<br />A speech bubble as a design system.<br />Simple by design.
        </p>
      </section>
      {/* CONVERSATION — two images */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-5 md:col-start-2 px-6 md:px-0">
            <p className="text-[13px] uppercase tracking-[0.12em] text-white/40 font-heading font-light mb-8">The Conversation</p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              The entire brand was built around a simple metaphor: the car talking to you.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-10">
              The speech bubble became the central design element across product, interface and communication — translating technical data into a human idea.
            </p>
            <img
              src={`${R2}/drivelog4.webp`}
              alt="Drivelog campaign"
              className="w-full object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-8 px-6 md:px-0 md:mt-32">
            <img
              src={`${R2}/drivelog6.webp`}
              alt="Drivelog brand system"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
      {/* DASHBOARD — full width */}
      <section className="w-full">
        <img
          src={`${R2}/drivelog3.webp`}
          alt="Drivelog app UI"
          className="w-full"
        />
      </section>
      {/* DASHBOARD TEXT */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-5 md:col-start-2 px-6 md:px-0">
            <p className="text-[13px] uppercase tracking-[0.12em] text-white/40 font-heading font-light mb-8">The Dashboard</p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              The mobile app transformed complex vehicle data into clear insights.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              Drivers could see vehicle health and diagnostics, driving behaviour scores, automatic trip history, service reminders, and the last parking location of the vehicle.
            </p>
            <p className="text-base text-white/60 leading-relaxed">
              Instead of hidden technical information — a clear overview of how their car was doing.
            </p>
          </div>
        </div>
      </section>
      {/* ECOSYSTEM TEXT */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-5 md:col-start-2 px-6 md:px-0">
            <p className="text-[13px] uppercase tracking-[0.12em] text-white/40 font-heading font-light mb-8">The Ecosystem</p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              Drivelog launched as a consumer-facing mobility brand inside the technology ecosystem of Bosch and Deutsche Telekom.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              The project combined product design, digital experience and brand communication into one coherent system.
            </p>
            <p className="text-base text-white/60 leading-relaxed">
              It explored what a connected car companion could become — long before conversational vehicle interfaces became common.
            </p>
          </div>
        </div>
      </section>
      {/* ECOSYSTEM IMAGE */}
      <section className="w-full">
        <img
          src={`${R2}/drivelog5.webp`}
          alt="Drivelog ecosystem"
          className="w-full"
        />
      </section>
      {/* CLOSING */}
      <section className="w-full">
        <img
          src={`${R2}/drivelog8.webp`}
          alt="Drivelog closing"
          className="w-full"
        />
      </section>
    </Layout>
  );
};
export default CaseDrivelogV2;
