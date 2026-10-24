import {Container, Divider, Grid, Stack} from "@mantine/core";
import SearchField from "../components/SearchField.tsx";
import SkillList from "../components/SkillList.tsx";
import CityList from "../components/CityList.tsx";
import VacancyList from "../components/VacancyList.tsx";


function Vacancies () {


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