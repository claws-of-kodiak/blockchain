import DisplaySections from "../features/admin/DisplaySections";
import Header from "../shared/components/Header";

export default function AdminPage() {
  return (
    <>
      <Header />
      <div id="admin-wrapper">
        <h2>Create and Manage Course Here</h2>
        {/* NEED TO CREATE POP UP HOOK */}
        <DisplaySections />
      </div>
    </>
  );
}
