import DisplaySections from "../features/admin/DisplaySections";
import NewSectionForm from "../features/admin/NewSectionForm";
import Header from "../shared/components/Header";
import PopUp from "../shared/components/PopUp";

export default function AdminPage() {
  return (
    <>
      <Header />
      <div id="admin-wrapper">
        <h2 style={{ margin: 0 }}>Create and Manage Course Here</h2>
        <PopUp label="+ Add New Section" component={NewSectionForm} />
        <DisplaySections />
      </div>
    </>
  );
}
