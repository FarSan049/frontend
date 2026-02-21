import BenefitForm from "@/app/components/admin/BenefitForm";

export default function CreateBenefitPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-zinc-800">Add New Benefit</h3>
        <p className="text-sm text-zinc-500">Create a new benefit highlight for your landing page.</p>
      </div>
      <BenefitForm />
    </div>
  );
}
