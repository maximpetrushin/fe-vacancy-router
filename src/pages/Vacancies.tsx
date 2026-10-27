import {Container, Divider, Grid, Stack} from "@mantine/core";
import SearchField from "../components/SearchField.tsx";
import SkillList from "../components/SkillList.tsx";
import CityList from "../components/CityList.tsx";
import VacancyList from "../components/VacancyList.tsx";
import {useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import { useSearchParams } from "react-router";
import { fetchVacancy, getFiltersFromUrl, setFilters } from "../store/vacancySlice.ts";






function Vacancies () {

    const [searchParams, setSearchParams] = useSearchParams();
    const isInitial = useRef(false);
    const isFirstFiltersEffect = useRef(true);

    const filters = useAppSelector(state => state.vacancy.filters);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isInitial.current) return;
        const urlFilters = getFiltersFromUrl(searchParams);

        dispatch(setFilters(urlFilters));
        dispatch(fetchVacancy(urlFilters));
        const params = new URLSearchParams();


        params.set('skills', urlFilters.skills.join(','))

        if (urlFilters.search) params.set('search', urlFilters.search);
        if (urlFilters.city) params.set('city', urlFilters.city);
        if (urlFilters.page !== 1) params.set('page', String(urlFilters.page));
        if (params.toString() !== searchParams.toString()) {
            setSearchParams(params, {replace: true});
        }
        isInitial.current = true;
    }, [searchParams, setSearchParams, dispatch]);



    useEffect(() => {
        if (isFirstFiltersEffect.current) {
            isFirstFiltersEffect.current = false;
            return;
        }

        dispatch(fetchVacancy(filters));
    }, [filters, dispatch]);

    return (
        <>
            <Container size={1000}>
                <SearchField />
            </Container>
            <Divider my='xs' opacity='0.7' m={0} mb={24}/>
            <Container size={1000} pb={85}>
                <Grid >
                    <Grid.Col span={4}>
                        <Stack>
                            <SkillList />
                            <CityList />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <VacancyList />
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}

export default Vacancies