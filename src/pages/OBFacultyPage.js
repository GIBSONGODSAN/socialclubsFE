import PostEvent from "../components/facultynob/PostEvent";
import PostAnnouncement from "../components/facultynob/PostAnnouncement";
import MarkAttendance from "../components/facultynob/MarkAttendance";

import '../App.css';

const OBFacultyPage = () => {
    return (
        <div>
            <div className="flex mb-4 bg-yellow-50">
                <div className="flex-1 p-4 mr-4">
                    <PostAnnouncement />
                </div>
                <div className="flex-1 p-4 ml-4">
                    <PostEvent />
                </div>
            </div>
            <div className="mb-4 mr-4 ml-4 bg-yellow-50">
                <MarkAttendance />
            </div>  
        </div>
    );
};

export default OBFacultyPage;