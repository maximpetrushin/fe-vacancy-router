import { useSearchParams } from "react-router";

function useVacancyQueryParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const updateQueryParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value || key === 'skills') {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        setSearchParams(params);
    };

    return updateQueryParam;
}

export default useVacancyQueryParams;