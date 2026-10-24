import { useAppDispatch } from "../store/hooks.ts";
import {setCity}  from '../store/vacancySlice.ts'
import {Paper, Select} from "@mantine/core";
import {MapPinIcon} from '@phosphor-icons/react'
import useVacancyQueryParams from "../hooks/useVacancyQueryParams.ts";

function CityList() {

    const updateQueryParam = useVacancyQueryParams()

    const dispatch = useAppDispatch();

    return (
        <Paper p={24}>
            <Select
                leftSection={<MapPinIcon/>}
                opacity='0.5'
                defaultValue={'all'}
                data={[
                    {value: 'all', label: 'Все города'},
                    {value: 'Москва', label: 'Москва'},
                    {value: 'Санкт-Петербург', label: 'Санкт-Петербург'}
                ]}
                onChange={(value) =>{
                    const city = value === 'all' || value === null ? '' : value;
                    dispatch(setCity(city));

                    updateQueryParam('city', city);
                }
                }
            />
        </Paper>
    )
}

export default CityList;