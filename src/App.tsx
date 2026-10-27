import {Routes, Route} from "react-router";
import AppLayout from "./layouts/AppLayout.tsx";
import Vacancies from "./pages/Vacancies.tsx";
import VacancyDetails from "./pages/VacancyDetails.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";


function App() {



    return (
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path='vacancies' element={<Vacancies/>}/>
                <Route path='vacancies/:id' element={<VacancyDetails/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}

export default App;