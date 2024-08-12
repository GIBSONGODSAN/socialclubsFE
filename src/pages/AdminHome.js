import ClubsList from "../components/admin/ClubsList";
import CreateData from "../components/admin/CreateData";
import UploadFile from "../components/admin/UploadFile";
import Header from "../components/authentication/Header";

const AdminHome = () => {
    return (
        <div>
            <div><Header /></div>
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
        </div>
        </div> 
    );
    
};

export default AdminHome;