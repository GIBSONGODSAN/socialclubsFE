import PostEvent from "../components/facultynob/PostEvent";
import PostAnnouncement from "../components/facultynob/PostAnnouncement";
import MarkAttendance from "../components/facultynob/MarkAttendance";
import BloodGroup from "../components/facultynob/BloodGroup";
import Header from "../components/authentication/Header";
import EventStudentsList from "../components/facultynob/EventStudentsList";
import SignUpForm from "../components/facultynob/SignUpForm";
import QuotaForm from "../components/facultynob/QuotaForm";
import '../App.css';

const OBFacultyPage = () => {
    return (
        <div>
            <div><Header /></div>
            <div className="flex mb-4 bg-yellow-50">
                <div className="flex-1 p-4 mr-4">
                    <PostEvent />
                </div>
                <div className="flex-1 p-4 ml-4">
                    <PostAnnouncement />
                </div>
            </div>
            <div className="mb-4 mr-4 ml-4 bg-yellow-50">
                <MarkAttendance />
            </div>  
            <div className="flex mb-4 mr-4 ml-4 bg-yellow-50">
            <div className="flex-1 p-4 mr-4">
                    <BloodGroup />
                </div>
                <div className="flex-1 p-4 ml-4">
                    <EventStudentsList />
                </div>
            </div>
            <div className="mb-4 mr-4 ml-4 bg-yellow-50">
                <SignUpForm />
            </div>
            <div className="mb-4 mr-4 ml-4 bg-yellow-50">
                <QuotaForm />
            </div>
        </div>
    );
};

export default OBFacultyPage;