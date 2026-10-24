import {Link} from 'react-router'
import {Button, Card, Flex, Stack, Title, Text, Image} from "@mantine/core";


function NotFoundPage() {
    return (
        <Flex direction='column' gap={16} mx='auto' m={24} maw={700}>
            <Card p={24}>
                <Stack>
                    <Flex justify='space-between' align='center'>
                        <Stack>
                            <Title fz={34} fw='bold'>Упс! Такой страницы не существует</Title>
                            <Text fz={18}>Давайте перейдём к началу.</Text>
                        </Stack>
                        <Button
                            flex='0 0 auto'
                            radius='sm'
                            component={Link}
                            to='/vacancies'
                        >На главную</Button>
                    </Flex>
                    <Image
                        radius='md'
                        src = "https://media1.tenor.com/m/baBulgRz6XkAAAAd/sad-cat.gif"
                    />
                </Stack>
            </Card>
        </Flex>
    )
}

export default NotFoundPage;