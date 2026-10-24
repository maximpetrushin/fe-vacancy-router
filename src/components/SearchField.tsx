import {Flex, Group, Title, Text, Button, Input, Stack} from "@mantine/core";
import {useAppDispatch} from "../store/hooks.ts";
import {useState} from "react";
import {setSearch} from "../store/vacancySlice.ts";
import {MagnifyingGlassIcon} from '@phosphor-icons/react'
import useVacancyQueryParams from "../hooks/useVacancyQueryParams.ts";


function SearchField() {

    const updateQueryParam = useVacancyQueryParams()

    const [fieldState, setFieldState] = useState<string>('');

    const dispatch = useAppDispatch();

    return (
        <Flex justify="space-between" h={115} align='center'>
            <Stack gap={2}>
                <Title order={3}>Список вакансий</Title>
                <Text opacity='0.5'>по профессии Frontend-разработчик</Text>
            </Stack>
            <Group>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(setSearch(fieldState));
                        updateQueryParam('search', fieldState);
                        setFieldState('');
                    }}>
                    <Group>
                        <Input
                            w={400}
                            leftSection={<MagnifyingGlassIcon/>}
                            placeholder='Должность или название компании'
                            opacity='0.7'
                            value={fieldState}
                            onChange={(e) => setFieldState(e.target.value)}
                        />
                        <Button
                            type='submit'
                            radius='sm'
                        >Найти</Button>
                    </Group>
                </form>
            </Group>

        </Flex>
    )
}


export default SearchField;