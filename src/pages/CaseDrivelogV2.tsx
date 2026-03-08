import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
const R2 = "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev";
const CaseDrivelogV2 = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* HERO */}
      <section className="w-full">
        <img
          src={`${R2}/drivelog-hero3.webp`}
          alt="Drivelog — Bring your car to life"
          className="w-full h-screen object-cover"
        />
      </section>
      {/* TITLE */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Drivelog</p>
        <h1 className="text-4xl md:text-5xl font-light leading-tight text-gray-900">
          Making the car understandable.
        </h1>
      </section>
      {/* SECTION 1 — Vision */}
      <section className="max-w-3xl mx-auto px-6 pb-32">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
{`Cars generate enormous amounts of data.
But most drivers never see it.
Drivelog explored a simple idea:
What if your car could talk to you?
Not through dashboards and error codes,
but through clear insights about driving behaviour,
vehicle health and everyday use.
The goal was to turn raw vehicle data
into something drivers could actually understand.`}
        </p>
      </section>
      {/* SECTION 2 — The Connector: full width */}
      <section className="w-full mb-4">
        <img
          src={`${R2}/drivelog2.webp`}
          alt="Drivelog connector"
          className="w-full object-cover"
        />
      </section>
      {/* SECTION 2 — The Connector: text + packaging */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">The Connector</p>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
{`The system started with a small OBD connector.
Plugged into the vehicle, it unlocked access to the car's internal data and connected it to the mobile platform.
The object itself was designed as a physical counterpart to the app icon — a square with rounded corners.
Opening the cube revealed the connector inside: half of the object went into the car, the other half remained as its protective shell.
A small gateway between the vehicle and the digital world.`}
            </p>
          </div>
          <div>
            <img
              src={`${R2}/drivelog9.webp`}
              alt="Drivelog packaging"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
      {/* SECTION 3 — The Conversation */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">The Conversation</p>
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
{`To make the system understandable, the entire brand was built around a simple metaphor:
the car talking to you.
The speech bubble became the central design element across product, interface and communication.
It translated technical vehicle data into a simple idea:
your car communicating with its driver.`}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={`${R2}/drivelog4.webp`}
            alt="Drivelog campaign"
            className="w-full object-cover"
          />
          <img
            src={`${R2}/drivelog6.webp`}
            alt="Drivelog brand system"
            className="w-full object-cover"
          />
        </div>
      </section>
      {/* SECTION 4 — The Dashboard: full width */}
      <section className="w-full mb-4">
        <img
          src={`${R2}/drivelog3.webp`}
          alt="Drivelog app UI overview"
          className="w-full object-cover"
        />
      </section>
      {/* SECTION 4 — The Dashboard: text */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">The Dashboard</p>
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
{`The mobile app transformed complex vehicle data into clear insights.
Drivers could understand:
- vehicle health and diagnostics
- driving behaviour and efficiency scores
- trip history through an automatic digital logbook
- service reminders and maintenance alerts
- the last parking location of the vehicle
Instead of hidden technical information, drivers received a clear overview of how their car was doing.`}
        </p>
      </section>
      {/* SECTION 5 — The Ecosystem: full width */}
      <section className="w-full mb-4">
        <img
          src={`${R2}/drivelog5.webp`}
          alt="Drivelog ecosystem"
          className="w-full object-cover"
        />
      </section>
      {/* SECTION 5 — The Ecosystem: text */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">The Ecosystem</p>
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
{`Drivelog launched as a consumer-facing mobility brand inside the technology ecosystem of Bosch and Deutsche Telekom.
The project combined product design, digital experience and brand communication into one coherent system.
It explored what a connected car companion could become — long before conversational vehicle interfaces became common.`}
        </p>
      </section>
      {/* CLOSING — full width */}
      <section className="w-full">
        <img
          src={`${R2}/drivelog8.webp`}
          alt="Drivelog closing"
          className="w-full object-cover"
        />
      </section>
      <Footer />
    </div>
  );
};
export default CaseDrivelogV2;
