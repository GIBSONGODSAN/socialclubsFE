import ViewAttendance from '../components/student/ViewAttendance';
import StudentAnnouncements from '../components/student/StudentAnnouncements';
import UpcomingEvents from '../components/student/UpcominEvents';
import Header from '../components/authentication/Header';

const StudentPage = () => {
  return (
    <div className="bg-yellow-100 min-h-full p-4">
      <div><Header /></div>
    <div>
      <ViewAttendance />
    </div>
    <div>
      <StudentAnnouncements />
    </div>
    <div>
      <UpcomingEvents />
    </div>
  </div>
  );
};

export default StudentPage;