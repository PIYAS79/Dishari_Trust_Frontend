export default function Admission() {
  return (
    <section id="admission" className="bg-mist py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: admission information */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-widest text-dish">Admission</p>
            <h2 className="mt-3 font-serif text-3xl text-forest sm:text-4xl">Admission to Dishari Trust</h2>

            <p className="mt-4 text-base text-dim text-justify">
              DISHARI Trust welcomes applications from eligible Bangladesh Army families. Please review the admission criteria, prepare the required documents, and contact the Trust office to begin the application process.
            </p>

            <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-dim text-justify ">
              Priority is given to serving personnel and eligible retired personnel according to the rules set by the Trustee Board.
            </p>

            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block rounded bg-dish px-6 py-3 font-medium text-ivory transition-colors hover:bg-forest"
              >
                Apply for Admission
              </a>
            </div>
          </div>

          {/* Right: process image */}
          <div className="flex justify-center">
            <img
              src="/assets/admission/process.png"
              alt="Admission process workflow"
              className="h-auto w-full max-w-3xl rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
