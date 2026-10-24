import {fetchVacancy} from "./store/vacancySlice.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import AppLayout from "./layouts/AppLayout.tsx";
import {Routes, Route} from "react-router";
import Vacancies from "./pages/Vacancies.tsx";
import VacancyDetails from "./pages/VacancyDetails.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";



function App() {

    const filters = useAppSelector(state => state.vacancy.filters);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchVacancy(filters))
    }, [filters, dispatch]);


  return (
      <Routes>
          <Route element={<AppLayout />}>
              <Route
                  path='vacancies'
                  element={<Vacancies />}
              />
              <Route
                  path='vacancies/:id'
                  element={<VacancyDetails />}
              />
              <Route
                  path='*'
                  element={<NotFoundPage />}
              />
          </Route>
      </Routes>
  )
}

export default App
