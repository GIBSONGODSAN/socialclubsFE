import ClubsList from "../components/admin/ClubsList";
import AdminAnnouncements from "../components/admin/AdminAnnouncements";
import CreateData from "../components/admin/CreateData";
import UploadFile from "../components/admin/UploadFile";

const AdminHome = () => {
    return (
        <div className="bg-yellow-100 min-h-full p-4">
            <div className="mb-4">
                <ClubsList />
            </div>
            <div className="flex mb-4">
                <div className="flex-1 p-4 mr-4">
                    <CreateData />
                </div>
                <div className="flex-1 p-4 ml-4">
                    <UploadFile />
                </div>
            </div>
            <div className="mb-4">
                <AdminAnnouncements />
            </div>
        </div>
    );
    
};

export default AdminHome;