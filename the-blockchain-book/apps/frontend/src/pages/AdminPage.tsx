import DisplaySections from "../features/admin/DisplaySections";
import NewSectionForm from "../features/admin/NewSectionForm";
import Header from "../shared/components/Header";

export default function AdminPage() {
  return (
    <>
      <Header />
      <div id="admin-wrapper">
        <h2>Create and Manage Course Here</h2>
        <NewSectionForm />
        <DisplaySections />
      </div>
    </>
  );
}
