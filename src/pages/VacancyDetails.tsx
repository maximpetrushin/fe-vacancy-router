import { useParams } from "react-router";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import { fetchVacancyById} from "../store/vacancySlice.ts";
import {Badge, Card, Container, Flex, Group, Loader, Paper, Stack, Text, Title} from "@mantine/core";
import NotFoundPage from "./NotFoundPage.tsx";



function VacancyDetails() {

    const spaceConfig = {
        hybrid: {
            label: 'гибрид',
            color: 'black',
        },
        office: {
            label: 'офис',
            color: 'lightGray.0',

        },
        remote: {
            label: 'Можно удалённо',
            color: 'primary',
        }
    } as const;

    const {id} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchVacancyById(id))
        }
    }, [id, dispatch]);

    const vacancy = useAppSelector(state => state.vacancy.currentVacancy);
    const status = useAppSelector(state => state.vacancy.detailStatus);



    if (status === 'loading') {
        return (
            <Container
                fluid
            >
                <Flex
                    justify="center"
                    align="center"
                    h='100vh'
                >
                    <Loader
                        size="xl"
                        type="dots"
                    />
                </Flex>
            </Container>
        );
    }

    if (!vacancy) {
        return <NotFoundPage />
    }

    return (
        <Flex direction='column' gap={16} mx='auto' m={24} maw={700}>
            <Card p={24}>
                <Stack>
                    <Stack align='flex-start' gap='xs'>
                        <Title order={3} c='primary'>{vacancy.name}</Title>
                        <Group>
                            <Text>{vacancy.salary} ₽ </Text>
                            <Text opacity={0.5}>Опыт {vacancy.experience}</Text>
                        </Group>
                    </Stack>
                    <Stack gap='xs'>
                        <Text opacity={0.5
                        }>{vacancy.company_name}</Text>
                        <Badge
                            radius='xs'
                            size='xs'
                            color={spaceConfig[vacancy.space].color}
                        >
                            {spaceConfig[vacancy.space].label}</Badge>
                        <Text>{vacancy.city}</Text>
                    </Stack>
                </Stack>
            </Card>
            <Paper p={24}>
                <Stack>
                    <Title order={3}>
                        Компания
                    </Title>
                    <Text>
                        {vacancy.about_company}
                    </Text>
                    <Title order={4}>
                        О вакансии:
                    </Title>
                    <Text>
                        {vacancy.description}
                    </Text>
                </Stack>
            </Paper>
        </Flex>
    )
}

export default VacancyDetails;