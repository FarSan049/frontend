import TestimonialForm from "@/app/components/admin/TestimonialForm";

export default function CreateTestimonialPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-zinc-800">Add New Testimonial</h3>
        <p className="text-sm text-zinc-500">Add a new client review to display on the landing page.</p>
      </div>
      <TestimonialForm />
    </div>
  );
}
