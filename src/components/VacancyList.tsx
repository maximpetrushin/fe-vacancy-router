import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {setPage} from "../store/vacancySlice.ts";
import {Link} from 'react-router'
import {Card, Group, Loader, Stack, Title, Text, Badge, Button, Flex, Container, Pagination} from "@mantine/core";



function VacancyList() {

    const vacancies = useAppSelector(state => state.vacancy.vacancies)

    const status = useAppSelector(state => state.vacancy.status)

    const pagination = useAppSelector(state => state.vacancy.pagination)

    const currentPage = useAppSelector(state => state.vacancy.filters.page)

    const dispatch = useAppDispatch();

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


    if (status === 'error') {
        return 'Не удалось загрузить вакансии';
    }

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

    return (
            <Stack>
                {vacancies.map(item =>
                <Card key={item.id} p={24}>
                    <Stack>
                        <Stack align='flex-start' gap='xs'>
                            <Title order={3} c='primary'>{item.name}</Title>
                            <Group>
                                <Text>{item.salary} ₽ </Text>
                                <Text opacity={0.5}>Опыт {item.experience}</Text>
                            </Group>
                        </Stack>
                        <Stack gap='xs'>
                            <Text opacity={0.5
                            }>{item.company_name}</Text>
                            <Badge
                                radius='xs'
                                size='xs'
                                color={spaceConfig[item.space].color}
                            >
                                {spaceConfig[item.space].label}</Badge>
                            <Text>{item.city}</Text>
                        </Stack>
                        <Button
                            component={Link}
                            to={`/vacancies/${item.id}`}
                            color='black'
                            w={180}
                            radius='sm'
                        >Смотреть вакансию</Button>
                    </Stack>
                </Card>
                )}
                {pagination.totalPages > 1 && (
                    <Pagination total={pagination.totalPages} value={currentPage} onChange={page => dispatch(setPage(page))} />
                )}
            </Stack>
    )
}

export default VacancyList