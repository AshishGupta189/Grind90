import { Routes, Route } from "react-router-dom";
import TeachersPage from "../pages/TeachersPage";
import ClassesPage from "../pages/ClassesPage";
import StudentsPage from "../pages/StudentsPage";
const Mainroutes = () => {
    return (<Routes>
        <Route path="/" element={<StudentsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/students" element={<StudentsPage />} />
    </Routes>)
}

export default Mainroutes
