import {Stack, Button, Group, Input, Paper, Pill, Flex} from "@mantine/core";
import {useAppSelector, useAppDispatch} from "../store/hooks.ts";
import {setSkill, removeSkill} from "../store/vacancySlice.ts";
import {useState, type SyntheticEvent} from "react";
import {PlusIcon} from "@phosphor-icons/react";
import useVacancyQueryParams from "../hooks/useVacancyQueryParams.ts";




function SkillList() {

    const [skillItem, setSkillItem] = useState('')

    const updateQueryParam = useVacancyQueryParams()

    const skills = useAppSelector(state => state.vacancy.filters.skills);
    const dispatch = useAppDispatch();


    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newSkill = skillItem.trim()

        if (!newSkill || skills.includes(newSkill)) {
            return;
        }

        dispatch(setSkill(newSkill));
        updateQueryParam('skills', [...skills, newSkill].join(','))
        setSkillItem('')
    }


    return (
        <Paper p={24}>
            <Stack>
                <Input.Wrapper
                    label={'Ключевые навыки'}
                >
                    <form
                        onSubmit ={handleSubmit}
                    >
                        <Group gap='xs' wrap='nowrap' w='100%'>
                            <Input
                                placeholder='Введите навык'
                                opacity='0.7'
                                value={skillItem}
                                flex={1}
                                onChange={(e) => setSkillItem(e.target.value)}
                            />
                            <Button
                                opacity='0.5'
                                type='submit'
                                variant='filled'
                                fz='xl'
                            ><PlusIcon color='white'/></Button>
                        </Group>
                    </form>
                </Input.Wrapper>
                <Flex wrap='wrap' gap={4}>
                    {skills.length > 0 &&
                        skills.map((skill) =>
                            (<Pill key={skill} bg='background.0' withRemoveButton onRemove={() => {
                                const updatedSkills = skills.filter(item => item !== skill)
                                dispatch(removeSkill(skill))
                                updateQueryParam('skills', updatedSkills.join(','))
                            }}>{skill}</Pill>))}

                </Flex>
            </Stack>
        </Paper>
    )
}

export default SkillList;