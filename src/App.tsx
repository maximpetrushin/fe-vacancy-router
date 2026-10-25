import {useEffect, useState} from "react";
import {Routes, Route, useSearchParams} from "react-router";
import {fetchVacancy, setFilters, initialState} from "./store/vacancySlice.ts";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import AppLayout from "./layouts/AppLayout.tsx";
import Vacancies from "./pages/Vacancies.tsx";
import VacancyDetails from "./pages/VacancyDetails.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";


type Filters = {
    skills: string[];
    search: string;
    city: string;
    page: number;
};

function getFiltersFromUrl(
    searchParams: URLSearchParams,
    defaults: Filters,
): Filters {
    const skillsParam = searchParams.get("skills");

    return {
        skills: skillsParam === null
            ? defaults.skills
            : skillsParam.split(",").filter(Boolean),
        search: searchParams.get("search") ?? defaults.search,
        city: searchParams.get("city") ?? defaults.city,
        page: Number(searchParams.get("page")) || defaults.page,
    };
}

function App() {
    const [searchParams] = useSearchParams();

    const [initialParams] = useState(
        () => new URLSearchParams(searchParams),
    );
    const [isInitialized, setIsInitialized] = useState(false);

    const filters = useAppSelector(state => state.vacancy.filters);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            setFilters(
                getFiltersFromUrl(initialParams, initialState.filters),
            ),
        );
        setIsInitialized(true);
    }, [dispatch, initialParams]);


    useEffect(() => {
        if (!isInitialized) return;

        dispatch(fetchVacancy(filters));
    }, [filters, dispatch, isInitialized]);

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