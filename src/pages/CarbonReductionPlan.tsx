import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CarbonReductionPlan = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-12 text-4xl font-bold text-foreground md:text-5xl">
            Carbon Reduction Plan
          </h1>

          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <div>
              <p className="font-semibold text-foreground">Supplier name: FLEXZO AI LIMITED</p>
              <p className="font-semibold text-foreground">Publication date: November 2024</p>
            </div>

            {/* Commitment */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-foreground">Commitment to achieving Net Zero</h2>
              <p>FLEXZO AI LIMITED is committed to achieving Net Zero emissions by <strong>2040.</strong></p>
            </section>

            {/* Baseline Emissions */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-foreground">Baseline Emissions Footprint</h2>
              <p className="mb-4">
                Baseline emissions are a record of the greenhouse gases that have been produced in the past and were produced prior to the introduction of any strategies to reduce emissions. Baseline emissions are the reference point against which emissions reduction can be measured.
              </p>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th colSpan={2} className="px-4 py-3 text-left font-bold">Baseline Year: 2024</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td colSpan={2} className="px-4 py-3">
                        <p className="font-semibold mb-2">Additional Details relating to the Baseline Emissions calculations.</p>
                        <p className="mb-2">FLEXZO AI LIMITED is dedicated to acknowledging and addressing the key environmental concerns it influences. Our commitment lies in consistently enhancing our performance in these areas:</p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>Encompassing energy reduction</li>
                          <li>Minimised fuel consumption</li>
                          <li>Minimal waste generation</li>
                          <li>Maximal waste recycling</li>
                          <li>Curbing pollution</li>
                        </ul>
                        <p className="mt-2">Carbon emissions have been calculated in accordance with UK Government Environment Reporting Guidelines including Streamlined Energy and Carbon Reporting (SECR) guidance.</p>
                      </td>
                    </tr>
                    <tr className="border-t border-border bg-muted">
                      <th colSpan={2} className="px-4 py-3 text-left font-bold">Baseline year emissions: 2024</th>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 font-semibold">EMISSIONS</td>
                      <td className="px-4 py-3 font-semibold">TOTAL (tCO₂e)</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 font-semibold">Scope 1</td>
                      <td className="px-4 py-3">571</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 font-semibold">Scope 2</td>
                      <td className="px-4 py-3">357</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 font-semibold">Scope 3 (Included Sources)</td>
                      <td className="px-4 py-3">We are currently working on finalising our employee commuting emissions. As a workforce technology solutions company, we believe these to be our only scope 3 emissions.</td>
                    </tr>
                    <tr className="border-t border-border bg-muted">
                      <td className="px-4 py-3 font-bold">Total Emissions</td>
                      <td className="px-4 py-3 font-bold">928*</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-sm">* Scope 1 and 2 only</p>
            </section>

            {/* Current Emissions */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-foreground">Current Emissions Reporting</h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th colSpan={2} className="px-4 py-3 text-left font-bold">Reporting Year: 2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3 font-semibold">EMISSIONS</td>
                      <td className="px-4 py-3 font-semibold">TOTAL (tCO₂e)</td>
                    </tr>
                    {["Scope 1", "Scope 2", "Scope 3 (Included Sources)", "Total Emissions"].map((scope) => (
                      <tr key={scope} className="border-t border-border">
                        <td className="px-4 py-3 font-semibold">{scope}</td>
                        <td className="px-4 py-3">TBC. 2024 was our baseline year following formation in 2023.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Reduction Targets */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-foreground">Emissions reduction targets by 2030</h2>
              <p className="mb-3">To continue our progress to achieving Net Zero, we have set the following carbon reduction targets for 2030.</p>
              <ul className="list-disc ml-5 space-y-1 mb-4">
                <li>Carbon emissions to decrease to below 450 tCO₂e</li>
                <li>This is a reduction of 48% against the 2020 baseline</li>
                <li>Target to be reviewed each year as the impact of initiatives is realised</li>
              </ul>
              <p className="mb-3">
                When developing our Carbon Reduction Plan we look to implement and adhere to best practice policies that embed and support Carbon Reduction Planning in support of Green Initiatives such as NHS Net Zero, as detailed within the Procurement Policy Note 06/21.
              </p>
              <p className="mb-3">
                We have adopted UK Government and/or NHS targets for sustainable development where appropriate, in full consideration of the environmental impacts of any significant policy decisions. Sustainable development will include, but is not limited to:
              </p>
              <ul className="list-disc ml-5 space-y-1 mb-4">
                <li>Energy management</li>
                <li>Water, to include system infrastructure maintenance and wastewater management</li>
                <li>Waste prevention and management including waste hierarchy and segregation</li>
                <li>Reducing single use plastics in accordance with the Environmental Protection Regulations 2020</li>
                <li>Minimising transport use</li>
              </ul>
              <p>
                We are not required to publicly report UK energy use and carbon emissions within the Supplier's Director Report as we do not meet any two of the following three thresholds:
              </p>
              <ul className="list-disc ml-5 space-y-1 mt-2">
                <li>A turnover of £36m or greater</li>
                <li>A balance sheet of £18m or greater</li>
                <li>A company size of 250 employees or greater</li>
              </ul>
            </section>

            {/* Completed Initiatives */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-foreground">Completed Carbon Reduction Initiatives</h2>
              <p className="mb-3">
                As a relatively new organisation we are on the initial stages of our journey to Net Zero. We have developed a multi-year action plan which outlines the initiatives we will be undertaking to take us to our Net Zero position by no later than 2040. Our action plan contains a wide range of environmental management measures and projects including, but not limited to:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Training for our team</li>
                <li>Engaging with our local community and supply chain</li>
                <li>Biodiversity</li>
                <li>Energy conservation measures</li>
                <li>Green data storage</li>
              </ul>
            </section>

            {/* Net Zero Action Plan Summary */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-foreground">Net Zero Action Plan</h2>
              <p className="mb-4">We include a summary of our net zero action plan below:</p>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-4 py-3 text-left font-bold">Area</th>
                      <th className="px-4 py-3 text-left font-bold">Objective</th>
                      <th className="px-4 py-3 text-left font-bold">Target Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { area: "Carbon Literacy Training", objective: "100% of employees trained biannually", target: "Ongoing to 2033" },
                      { area: "ISO-14001 Awareness", objective: "100% of employees trained annually", target: "Ongoing to 2033" },
                      { area: "Energy Management", objective: "100% renewable energy by 2028", target: "2028" },
                      { area: "Water Management", objective: "Water usage audit and efficiency improvements", target: "2026–2033" },
                      { area: "Waste Prevention", objective: "Annual 'Waste Wise' workshops", target: "Ongoing to 2033" },
                      { area: "Reducing Single Use Plastics", objective: "100% elimination by 2028", target: "2028" },
                      { area: "Public Transport", objective: "40% increase in public transport journeys by 2033", target: "2033" },
                      { area: "Energy Efficiency", objective: "20% reduction in energy consumption by 2030", target: "2030" },
                      { area: "Sustainable Transport", objective: "30% decrease in business travel emissions within 5 years", target: "2030" },
                      { area: "Sustainable Procurement", objective: "Implement sustainable sourcing and procurement practices", target: "2029" },
                      { area: "ISO 14001 Compliance", objective: "Maintain accreditation and compliance", target: "Ongoing to 2033" },
                      { area: "Carbon Offsetting", objective: "Offset at least 100% of remaining emissions by 2040", target: "2040" },
                      { area: "Flexible Working", objective: "100% of employees supported to work flexibly", target: "Ongoing" },
                      { area: "Supply Chain Engagement", objective: "Collaborative sustainability initiatives with supply chain", target: "2026–2033" },
                      { area: "Biodiversity", objective: "Habitat creation and pollinator initiatives", target: "2028–2033" },
                      { area: "Community Reconnection", objective: "Environmental awareness workshops and community engagement", target: "2026–2033" },
                      { area: "Volunteering", objective: "1–2 days volunteering per staff member annually", target: "Ongoing" },
                      { area: "Green Data Storage", objective: "Engage AWS & Google Cloud on sustainability innovations", target: "Ongoing" },
                      { area: "Net Zero", objective: "Achieve Net Zero by no later than 2040", target: "2040" },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="px-4 py-3 font-medium">{row.area}</td>
                        <td className="px-4 py-3">{row.objective}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{row.target}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Declaration */}
            <section>
              <h2 className="mb-3 text-2xl font-bold text-foreground">Declaration and Sign Off</h2>
              <p className="mb-3">
                This Carbon Reduction Plan has been completed in accordance with PPN 06/21 and associated guidance and reporting standard for Carbon Reduction Plans.
              </p>
              <p className="mb-3">
                Emissions have been reported and recorded in accordance with the published reporting standard for Carbon Reduction Plans and the GHG Reporting Protocol corporate standard and uses the appropriate Government emission conversion factors for greenhouse gas company reporting.
              </p>
              <p className="mb-3">
                Scope 1 and Scope 2 emissions have been reported in accordance with SECR requirements, and the required subset of Scope 3 emissions have been reported in accordance with the published reporting standard for Carbon Reduction Plans and the Corporate Value Chain (Scope 3) Standard.
              </p>
              <p className="mb-6">
                This Carbon Reduction Plan has been reviewed and signed off by the board of directors (or equivalent management body).
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">Signed on behalf of the Supplier:</p>
                <p className="mt-2">HEALSGOOD AI LIMITED</p>
                <p className="font-semibold text-foreground">JACK HENDERSON</p>
                <p>Date: November 2024</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarbonReductionPlan;
