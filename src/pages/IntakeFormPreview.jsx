import IntakeForm from "../components/IntakeForm";
import { homeIntakeSteps } from "../content/siteContent";
import { usePageSeo } from "../components/ui";

export default function IntakeFormPreviewPage() {
  usePageSeo({
    title: "StarLeo | Intake preview",
    description: "Preview van de gecentreerde en conversion-first intake-sectie voor StarLeo.",
  });

  return (
    <IntakeForm
      id="intake-preview"
      centered
      title={
        <>
          Benieuwd wat AI voor uw bedrijf kan opleveren?
          <em style={{ color: "#0EA5E9", fontStyle: "italic", display: "block" }}>Kom in contact.</em>
        </>
      }
      text=""
      trustPoints={[]}
      steps={homeIntakeSteps}
    />
  );
}
